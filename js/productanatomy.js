/* ----- Global variables ----- */
var client = algoliasearch(CONST.ALGOLIA_APP_ID, CONST.ALGOLIA_SEARCH_API_KEY);
var index = client.initIndex(CONST.ALGOLIA_INDEX_PRODUCTS);
var modalClosed = false;
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
    if ( $('#' + prod.id + '> .' + CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER + '> img').length === 0 ) {
      var logoStaticHTML = '<img src=\"' + url + '\" alt=\"Product Logo\"/>'
      $('#' + prod.id + '> .' + CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER).prepend(logoStaticHTML);
    }

    // Add logo to modal card
    if ( $('#' + prod.id + '-modal' + '> .' + CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER + '> img').length === 0 ) {
      var logoModalHTML = '<img src=\"' + url + '\" alt=\"Product Logo\"/>'
      $('#' + prod.id + '-modal' + '> .' + CONST.DIV_CLASS_PRODUCT_LOGO_WRAPPER).prepend(logoModalHTML);
    }
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

  // Enable tags
  var staticModalTags = document.getElementsByClassName(CONST.DIV_CLASS_TAG_NEW); // Get only newly added tags
  enableTagSearch(staticModalTags);
  $('div.' + CONST.DIV_CLASS_TAG_NEW).removeClass(CONST.DIV_CLASS_TAG_NEW); // Remove pseudo class of newly added tags

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
    modalClosed = true;
    window.history.back();
  });
  /* ---------- */

}
function addGlobalPlatformTags(platformNames) {
  var globalTagsHTML = '<div class=\"row\">' +
                        '<div class=\"col-lg-8 col-lg-offset-2\">' +
                          '<div class=\"' + CONST.DIV_CLASS_TAG_ROW + '\">';
  platformNames.sort(function(a, b) {
    return a.toLowerCase() > b.toLowerCase();
  });

  for (var i = 0; i < platformNames.length; i++) {
    var tagName = platformNames[i];

    var tagColor = '';

    if (isInArray(tagName.toLocaleLowerCase(), CONST.PLATFORMS))
      tagColor = CONST.PLATFORM_TAG_COLORS[tagName.toLocaleLowerCase()];
    else
      tagColor = randomColorFromString(tag_name, CONST.TAG_COLORS);

    globalTagsHTML += '<span class=\"' + CONST.DIV_CLASS_TAG + ' ' + CONST.DIV_CLASS_TAG_GLOBAL + '\" style=\"background-color:' + tagColor + '\">' +
                        tagName +
                      '</span>';
  }

  globalTagsHTML += '</div></div></div>'; // Close row, column and DIV_CLASS_TAG_ROW

  $('div.' + CONST.DIV_CLASS_TAG_WRAPPER).append(globalTagsHTML);
  // Add search functionality for global tags
  var tagsGlobal = document.getElementsByClassName(CONST.DIV_CLASS_TAG_GLOBAL);
  enableTagSearch(tagsGlobal);
}
/* ---------- */

$(document).ready(function() {

  // Add global tags under searchbar
  addGlobalPlatformTags(CONST.GLOBAL_TAGS);
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

      var cardNumber = 0;
      // Loop through all of firebase products
      for (var property in fProducts) {
        cardNumber++;
        var product = new Product(fProducts[property], {});

        addProductCards(product, cardNumber);
      }
    }); // ftools.database END
  }



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
  $(window).bind('popstate', function() {
    if (!modalClosed)
      window.location.href = document.location;
    modalClosed = false;
  });
  /* ---------- */

}); // page loaded END
