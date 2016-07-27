/* ----- Global variables ----- */
var client = algoliasearch(CONST.ALGOLIA_APP_ID, CONST.ALGOLIA_SEARCH_API_KEY);
var index = client.initIndex(CONST.ALGOLIA_INDEX_PRODUCTS);
/* ---------- */

/* ----- Functions ----- */
function getParameterByName(name, url) {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function addLogoToProductCards(product) {
    // TODO: Divne predavani produktu
    product.getProductLogoURL(product, function(prod, url) {
      // Format of logoPath:
      // -> logoPath = 'path/product-name.png'

      // Add logo to static card
      var logoStaticHTML = '<img src=\"' + url + '\" alt=\"Product Logo\"/>'
      $('#' + prod.id + '> .' + CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER).prepend(logoStaticHTML);

      // Add logo to modal card
      var logoModalHTML = '<img src=\"' + url + '\" alt=\"Product Logo\"/>'
      $('#' + prod.id + '-modal' + '> .' + CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER).prepend(logoModalHTML);
    });
}
function addProductCards(product, cardNumber) {

  productStaticCard = $(product.getStaticCardFromProduct(cardNumber));
  productModalCard = $(product.getModalCardFromProduct(cardNumber));

  // Assign product to HTML cards
  productStaticCard.data('product', product);
  productModalCard.data('product', product);

  $('div.card-columns').last().append(productStaticCard);
  $('div.content').last().append(productModalCard);

  addLogoToProductCards(product);

  /* ----- Cards events ----- */
  // Click on footer button
  $('div.' + CONST.DIV_CLASS_BOTTOM_BUTTON_WRAPPER).last().on('click', function() {
    var productID = product.id;

    var buttonCardID = product.name.toLocaleLowerCase().replace(/ /g, '-');
    var buttonCard = $('#' + buttonCardID);
    var cardProduct = buttonCard.data('product');


    var productURL = CONST.PAGE_BASE_URL + 'product?id=' + productID;
    //alert(productURL);
    window.history.pushState('', '', productURL);
  });

  // When is modal closed
  $('div.modal').last().on('hidden.bs.modal', function() {
    window.history.back()
  });
  /* ---------- */

}
/* ---------- */

/* ----- Functions for search ----- */
function displaySearchHitCount(hitCount) {
  $('#' + CONST.SEARCH_RESULTS_ID).empty();
  $('#' + CONST.ANNOUNCEMENT_ID).empty();
  var resultsText = '';
  if (hitCount == 0) {
    resultsText = '';
    $('#' + CONST.ANNOUNCEMENT_ID).append(CONST.NOTHING_FOUND_TEXT);
  }
  else if (hitCount == 1) {
    resultsText = CONST.SEARCH_RESULT_TEXT_SINGULAR;
  }
  else {
    resultsText = CONST.SEARCH_RESULT_TEXT_PLURAL.replace(CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE, hitCount);
  }
  $('#' + CONST.SEARCH_RESULTS_ID).append(resultsText);
}
function presentProductsFromSearch(algoliaProducts) {
  displaySearchHitCount(algoliaProducts.length);

  $('div.card-columns').empty();
  $('.modal').remove(); // Remove all modal cards

  for (var i = 0; i < algoliaProducts.length; i++) {
    var product = new Product(algoliaProducts[i], {});
    addProductCards(product, i);
  }
}
function searchInDatabaseAndPresentHits(searchQuery) {
  index.search(searchQuery, function searchDone(err, content) {
    if (err) {
      // TODO: Error handling
      console.log(err.message);
      console.log(err.debugData);
      return;
    }
    else {
      presentProductsFromSearch(content.hits);
    }
  });
}
/* ---------- */

$(document).ready(function() {

  // Resize tags according to the actual screen size
  resizeGlobalTags();
  var fTools = new FirebaseTools(CONST.CONFIG);
  // TODO: Constants?
  var askedProductID = getParameterByName('id', window.location.href);
  var searchQuery = getParameterByName('query', window.location.href);

  if (searchQuery !== null) {
    searchInDatabaseAndPresentHits(searchQuery);
  }
  else if (askedProductID !== null) {
    // Display single product
    var queryID = new Query(askedProductID, {}, {});
    fTools.getProductsByQuery(queryID, function(products) {
      addProductCards(products[0], 1);
    });
  }
  else {
    // Display all products
    fTools.database.ref(CONST.FIREBASE_PRODUCTS_PATH).once('value').then(function(snapshot) {
      var fProducts = snapshot.val();

      var productsTotal = Object.keys(fProducts).length;
      $('#' + CONST.SEARCH_RESULTS_ID).append( CONST.SEARCH_RESULT_TEXT_PLURAL.replace(CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE, productsTotal) );

      var cardNumber = 0;
      // Loop through all of firebase products
      for (var property in fProducts) {
        cardNumber++;
        var product = new Product(fProducts[property], {});

        addProductCards(product, cardNumber);
      }
    }); // ftools.database END
  }

  // Enable tags
  var tagsStatic = document.getElementsByClassName(CONST.DIV_CLASS_TAG_STATIC);
  enableTagSearch(tagsStatic);
  var tagsModal = document.getElementsByClassName(CONST.DIV_CLASS_TAG_MODAL);
  enableTagSearch(tagsModal);


  /* ----- Search Events ----- */
  // Register autocomplete event for searchbox
  autocomplete('#' + CONST.SEARCHBOX_ID, { hint: false }, [
    {
      source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
      displayKey: 'name', // In what property should autocomplete search
      templates: {
        suggestion: function(suggestion) {
          return suggestion._highlightResult.name.value; // What property should autocomplete display to user
        }
      }
    }
  ]
  ).on('autocomplete:selected', function(event, suggestion, dataset) {
    presentProductsFromSearch([suggestion]);

    var searchURL = CONST.PAGE_BASE_URL + 'product?id=' + suggestion[CONST.FIREBASE_PRODUCT_ID]; // Change URL to ID URL so user can use it to present specific object
    window.history.pushState('', '', searchURL);
  });

  // User pressed enter while typing search query
  $('#' + CONST.SEARCH_FORM_ID).submit(function(event) {
    var searchQuery = document.getElementById(CONST.SEARCHBOX_ID).value;
    searchInDatabaseAndPresentHits(searchQuery);

    var searchURL = CONST.PAGE_BASE_URL + 'search?query=' + searchQuery;
    window.history.pushState('', '', searchURL);

    event.preventDefault();
  });
  /* ---------- */

  /* ----- Global Events ---- */
  $(window).bind('resize', function() {
    //resizeGlobalTags();
  });
  $(window).bind('popstate', function() {
    window.location.href = document.location;
  });
  /* ---------- */

}); // page loaded END
