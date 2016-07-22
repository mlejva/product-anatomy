
/* Global variables */
var productsTotal = 0;
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
function addLogoToProduct(product) {
  try {
    // TODO: Divne predavani produktu
    product.getProductLogoURL(product, function(prod, url) {
      // Format of logoPath -> logoPath = 'path/product-name.png'
      //var productName = product.logoPath.split('/')[1].split('.')[0];

      // Add logo to static card
      var logoStaticHTML = '<img class=\"card-img-top\" src=\"' + url + '\" alt=\"Product Logo\">';
      //$('#' + productName).last().prepend(logoStaticHTML);
      $('#' + prod.id).last().prepend(logoStaticHTML);

      // Add logo to modal card
      var logoModalHTML = '<span class=\"media-left\">' +
                            '<img class=\"img-responsive\" src=\"' + url + '\" alt=\"Product Logo\"/>' +
                          '</span>';
      //$('div.' + productName + '-modal').last().prepend(logoModalHTML);
      $('div.' + prod.id + '-modal').last().prepend(logoModalHTML);
    });

  }
  catch (e) {
    // TODO: Error handling
    alert(e);
  }
}
function displayProduct(product, cardNumber) {
  productStaticCard = $(product.getStaticCardFromProduct(cardNumber));
  productModalCard = $(product.getModalCardFromProduct(cardNumber));

  // Assign product to HTML cards
  productStaticCard.data('product', product);
  productModalCard.data('product', product);

  $('div.card-columns').last().append(productStaticCard);
  $('div.content').last().append(productModalCard);

  addLogoToProduct(product);

  /* ----- Cards events ----- */
  $('div.' + CONST.DIV_CLASS_BOTTOM_BUTTON_WRAPPER).last().on('click', function() {
    var productID = product.id;

    var buttonCardID = product.name.toLocaleLowerCase().replace(/ /g, '-');
    var buttonCard = $('#' + buttonCardID);
    var cardProduct = buttonCard.data('product');


    var productURL = 'https://product-anatomy.firebaseapp.com/product?id=' + productID;
    //alert(productURL);
    window.history.pushState('', '', productURL);
  });
  /* ---------- */
}
/* ---------- */

$(document).ready(function() {

  // Resize tags according to the actual screen size
  resizeGlobalTags();

  var fTools = new FirebaseTools(CONST.CONFIG);

  var askedProductID = getParameterByName('id', window.location.href);
  console.log(askedProductID);
  if (askedProductID != null) {
    console.log('Displaying specific product');

    // Display single product
    var queryID = new Query(askedProductID, {}, {});
    fTools.getProductsByQuery(queryID, function(products) {
      displayProduct(products[0], 1);
    });
  }
  else {
    console.log('Displaying all products');

    fTools.database.ref(CONST.FIREBASE_PRODUCTS_PATH).once('value').then(function(snapshot) {
      var fProducts = snapshot.val();

      productsTotal = Object.keys(fProducts).length;
      $('div.' + CONST.DIV_CLASS_SEARCH_RESULTS).append( CONST.SEARCH_RESULT_TEXT_PLURAL.replace(CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE, productsTotal) );

      var cardNumber = 0;
      // Loop through all of firebase products
      for (var property in fProducts) {
        cardNumber++;
        var product = new Product(fProducts[property], {});

        displayProduct(product, cardNumber);
      }

      var tagsStatic = document.getElementsByClassName(CONST.DIV_CLASS_TAG_STATIC);
      enableTagSearch(tagsStatic);
      var tagsModal = document.getElementsByClassName(CONST.DIV_CLASS_TAG_MODAL);
      enableTagSearch(tagsModal);

    }); // ftools.database END
  }


  /* ----- Global Events ---- */
  // TODO: Constant
  $("#searchbox").keydown(function(event) {
    if (event.keyCode == CONST.ENTER_KEY_CODE) { // Enter was pressed
        search();
    }
  });

  // We want searchbox to search everytime input is changed
  document.getElementById(CONST.SEARCHBOX_ID).addEventListener('input', search);

  $(window).bind('resize', function() {
    resizeGlobalTags();
  });
  /* ---------- */
}); // page loaded END
