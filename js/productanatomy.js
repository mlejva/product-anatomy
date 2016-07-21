
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
/* ---------- */

/* ----- Firebase functions ----- */
var getDatabaseReference = function() {
  return firebase.database();
}
var getStorageReference = function() {
  return firebase.storage();
}

var getProductByID = function(id) {

}
/* ---------- */

$(document).ready(function() {

  askedProductID = getParameterByName('id', window.location.href);
  if (askedProductID != null) {
    console.log('Displaying specific product');

    // Display single product

  }
  else {
    console.log('Displaying all products');
  }

  // Resize tags according to the actual screen size
  resizeGlobalTags();


  let fTools = new FirebaseTools(CONST.CONFIG);

  fTools.database.ref(CONST.FIREBASE_PRODUCTS_PATH).once('value').then(function(snapshot) {
    let fProducts = snapshot.val();
    productsTotal = Object.keys(fProducts).length;
    $('div.' + CONST.DIV_CLASS_SEARCH_RESULTS).append( CONST.SEARCH_RESULT_TEXT_PLURAL.replace(CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE, productsTotal) );
    let cardNumber = 0;
    // Loop through all of firebase products
    for (let property in fProducts) {
      cardNumber++;
      let product = new Product(fProducts[property], {});

      productStaticCard = $(product.getStaticCardFromProduct(cardNumber));
      productModalCard = $(product.getModalCardFromProduct(cardNumber));

      // Assign product to HTML cards
      productStaticCard.data('product', product);
      productModalCard.data('product', product);

      $('div.card-columns').last().append(productStaticCard);
      $('div.content').last().append(productModalCard);
    }

    var tagsStatic = document.getElementsByClassName(CONST.DIV_CLASS_TAG_STATIC);
    enableTagSearch(tagsStatic);
    var tagsModal = document.getElementsByClassName(CONST.DIV_CLASS_TAG_MODAL);
    enableTagSearch(tagsModal);

    for (let property in fProducts) {
      let product = new Product(fProducts[property], {});

      try {
        // TODO: Divne predavani produktu
        product.getProductLogoURL(product, function(prod, url) {
          // Format of logoPath -> logoPath = 'path/product-name.png'
          let productName = product.logoPath.split('/')[1].split('.')[0];

          // Add logo to static card
          let logoStaticHTML = '<img class=\"card-img-top\" src=\"' + url + '\" alt=\"Product Logo\">';
          $('#' + productName).last().prepend(logoStaticHTML);


          // Add logo to modal card
          let logoModalHTML = '<span class=\"media-left\">' +
                                '<img class=\"img-responsive\" src=\"' + url + '\" alt=\"Product Logo\"/>' +
                              '</span>';
          $('div.' + productName + '-modal').last().prepend(logoModalHTML);
        });

      }
      catch (e) {
        // TODO: Error handling
        alert(e);
      }
    }
  }); // ftools.database END


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
