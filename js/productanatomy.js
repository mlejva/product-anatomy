
const COLORS_PER_ROW = 2;
const COLORS_PER_ROW_MODAL = 2;

const BOOTSTRAP_MAX_WIDTH = 12;

const SEARCHBOX_ID = 'searchbox';

/* ----- Constant for static product card ----- */
const DIV_CLASS_PRODUCT_DESCRIPTION = 'product-description';

const DIV_CLASS_PRODUCT_PLATFORMS = 'product-platforms';
const DIV_TEXT_PRODUCT_PLATFORMS = 'Platforms ';

const DIV_CLASS_PRODUCT_FONTS = 'product-fonts';
const DIV_TEXT_PRODUCT_FONTS = 'Fonts ';

const DIV_CLASS_PRODUCT_COLORS_WRAPPER = 'product-colors-wrapper'
const DIV_CLASS_PRODUCT_COLORS = 'product-colors';
const DIV_CLASS_PRODUCT_COLORS_TEXT = 'product-colors-text';
/* ---------- */

/* ----- Constant for modal product card ----- */
const DIV_CLASS_PRODUCT_URL_MODAL = 'product-url-modal';

const DIV_CLASS_PRODUCT_DESCRIPTION_MODAL = 'product-description-modal';

const DIV_CLASS_PRODUCT_LAUNCHED_MODAL = 'product-launched-modal';
const DIV_TEXT_PRODUCT_LAUNCHED_MODAL = 'Launched on ';

const DIV_CLASS_PRODUCT_FOUNDERS_MODAL = 'product-founders-modal';
const DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER_MODAL = 'founders-names-wrapper';
const DIV_TEXT_PRODUCT_FOUNDERS_MODAL = 'Founded by ';

const DIV_CLASS_PRODUCT_PLATFORMS_MODAL = 'product-platforms-modal';
const DIV_TEXT_PRODUCT_PLATFORMS_MODAL = 'Platforms ';

const DIV_CLASS_PRODUCT_API_MODAL = 'product-api-modal';
const DIV_TEXT_PRODUCT_API_MODAL = 'API ';

const DIV_CLASS_PRODUCT_FONTS_MODAL = 'product-fonts-modal';
const DIV_TEXT_PRODUCT_FONTS_MODAL = 'Fonts ';

const DIV_CLASS_PRODUCT_TECHNOLOGY_WRAPPER_MODAL = 'technology-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_NAME_MODAL = 'technology-name';
const DIV_CLASS_PRODUCT_SUBTECHNOLOGY_MODAL = 'subtechnology';

const DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL = 'colors-modal-wrapper';

const DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL = 'technology-delimiter-modal';
const DIV_CLASS_DESIGN_DELIMITER_MODAL = 'design-delimiter-modal';
/* ---------- */

/* Constants for Firebase */
const FIREBASE_API_KEY = 'AIzaSyBJf4MX7uWsGQfoleAnoj7T2vg5boS1FUs';
const FIREBASE_AUTH_DOMAIN = 'product-anatomy.firebaseapp.com';
const FIREBASE_DATABASE_URL = 'https://product-anatomy.firebaseio.com';
const FIREBASE_STORAGE_BUCKET = 'product-anatomy.appspot.com';

const FIREBASE_PRODUCTS_PATH = '/products';

const FIREBASE_PRODUCT_PLATFORMS = 'platforms';
const FIREBASE_PRODUCT_FONTS = 'fonts';
const FIREBASE_PRODUCT_COLORS = 'colors';
const FIREBASE_PRODUCT_URL = 'url';
const FIREBASE_PRODUCT_DESCRIPTION = 'description';
const FIREBASE_PRODUCT_LAUNCHED = 'launched';
const FIREBASE_PRODUCT_FOUNDERS = 'founders';
const FIREBASE_PRODUCT_FOUNDERS_TWITTER = 'founders-twitter';
const FIREBASE_PRODUCT_API = 'api';
const FIREBASE_PRODUCT_TECHNOLOGY = 'technology';
/* ---------- */

/* Constants for Twitter */
const TWITTER_BASE_ADDRESS = 'https://www.twitter.com/';
/* ---------- */

/* ----- Functions ----- */
function generateDynamicColorsHTML(maxInRow, colors) {
  // Dynamically add colors to cardHTML
  var html = '<div class=\"row\">';
  var inCurrentRow = 0;
  for (var i = 0; i < colors.length; i++) {
    if (inCurrentRow < maxInRow) {
      // Add next color to the currently opened row
      inCurrentRow++;
    }
    else {
      html += '</div>'; // Close the last full row
      // Create a new row and add one color
      inCurrentRow = 0;
      html += '<div class=\"row\">';
      inCurrentRow++;
    }
    var widthOfColumn = BOOTSTRAP_MAX_WIDTH / maxInRow;
    html += '<div class=\"col-xs-' + widthOfColumn + '\">' +
                            '<div class=\"' + DIV_CLASS_PRODUCT_COLORS + '\" style=\"background-color:#' + colors[i] + '\">' +
                              '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_TEXT + '\">' +
                                colors[i].toUpperCase() +
                              '</div>' +
                            '</div>' +
                          '</div>';
  }

  html += '</div>'; // Close the last row (may not be full)
  return html;
}
function changeHeightOfCards() {
  if ($(window).width() > 992) {
    // Get the tallest card and then set height of every card to the tallest one
    $(document).ready(function() {
      // Get an array of all element heights
      var elementHeights = $('div.card').map(function() {
        return $(this).height();
      }).get();

      // Math.max takes a variable number of arguments
      // `apply` is equivalent to passing each height as an argument
      var maxHeight = Math.max.apply(null, elementHeights);

      // Set each height to the max height
      $('div.card').height(maxHeight);
    });
  }
  else {
    $('div.card').css('height', '100%');
  }
}
/* ---------- */


$(document).ready(function() {
  var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  firebase.database().ref(FIREBASE_PRODUCTS_PATH).once('value').then(function(snapshot) {
    var products = snapshot.val();
    var cardNumber = 0;
    for (var product_property in products) {
      var product = products[product_property];
      cardNumber++;

      /* ----- Card HTML ----- */
      var cardHTML = '<div class=\"col-lg-4 bottom-buffer\">' +
                      '<div data-toggle=\"modal\" data-target=\"#card' + cardNumber + '\" class=\"card\">' +
                        '<img class=\"card-img-top\" src=\"' + product['logo-url'] + '\" alt=\"Product Logo\">' +
                        '<div class=\"card-block\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION + '\">' +
                            '<div class=\"row\">' +
                              product['description'] +
                            '</div>' +
                          '</div>';

      if (FIREBASE_PRODUCT_PLATFORMS in product) {
        var platforms = [];
        for (var platform_property in product[FIREBASE_PRODUCT_PLATFORMS]) {
          platforms.push(product[FIREBASE_PRODUCT_PLATFORMS][platform_property]);
        }
        platformsPrintable = platforms.join(', ');
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_PLATFORMS + '</b>' + platformsPrintable +
                      '</div>' +
                    '</div>';
      }
      if (FIREBASE_PRODUCT_FONTS in product) {
        var fonts = [];
        for (var font_property in product[FIREBASE_PRODUCT_FONTS]) {
          fonts.push(product[FIREBASE_PRODUCT_FONTS][font_property]);
        }
        var fontsPrintable = fonts.join(', ');
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_FONTS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_FONTS + '</b>' + fontsPrintable +
                      '</div>' +
                    '</div>';
      }
      if (FIREBASE_PRODUCT_COLORS in product) {
        var colors = [];
        for (var color_property in product[FIREBASE_PRODUCT_COLORS]) {
          colors.push(product[FIREBASE_PRODUCT_COLORS][color_property]);
        }
        var productColorsHTML = generateDynamicColorsHTML(COLORS_PER_ROW, colors);
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER + '\">' + '</div>';
        cardHTML += productColorsHTML;

      }

      cardHTML += '</div></div></div>'; // Close divs
      // Append this card
      $('div.content').last().append(cardHTML);
      /* ---------- */

      /* ----- Card modal HTML ----- */
      var cardModalHTML = '<div id=\"card' + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">' +
                            '<div class=\"modal-dialog modal-md\">' +
                              '<div class=\"modal-content\">' +
                                '<div class=\"modal-header\">' +
                                  '<img class=\"img-responsive\" src=\"' + product['logo-url'] + '\" alt=\"image\"/>' +
                                  '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>' +
                                '</div>' +
                                '<div class=\"modal-body\">';

      // Add product URL //
      if (FIREBASE_PRODUCT_URL in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_URL_MODAL + '\">' +
                            '<a target="_blank" href=\"' + product[FIREBASE_PRODUCT_URL] + '\">' + product[FIREBASE_PRODUCT_URL] + '</a>' +
                          '</div>' +
                        '</div>';
      }

      // Add description //
      cardModalHTML += '<div class=\"row\">' +
                        '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION_MODAL + '\">' +
                          product[FIREBASE_PRODUCT_DESCRIPTION] +
                        '</div>' +
                      '</div>';

      // Add launched //
      cardModalHTML += '<div class=\"row\">' +
                        '<div class=\"' + DIV_CLASS_PRODUCT_LAUNCHED_MODAL + '\">' +
                          '<b>' + DIV_TEXT_PRODUCT_LAUNCHED_MODAL + '</b>' + product[FIREBASE_PRODUCT_LAUNCHED] +
                        '</div>' +
                      '</div>';

      // Add founders //
      // Get twitter usernames of founders
      var founders_twitter_url = [];
      if (FIREBASE_PRODUCT_FOUNDERS_TWITTER in product) {
        for (var founder_twitter_property in product[FIREBASE_PRODUCT_FOUNDERS_TWITTER]) {
          var url = TWITTER_BASE_ADDRESS + product[FIREBASE_PRODUCT_FOUNDERS_TWITTER][founder_twitter_property];
          founders_twitter_url.push(url);
        }
      }

      var html_founders = '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER_MODAL + '\">';
      var index = 0;
      for (var founder_property in product[FIREBASE_PRODUCT_FOUNDERS]) {

        // Check wether we have twitter url for this founder
        if (index < founders_twitter_url.length) {
            var twitter_url = founders_twitter_url[index];
            var twitter_url_href = '<a target="_blank" href=\"' + twitter_url + '\">' + '<i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i>' + '</a>'
            html_founders += product[FIREBASE_PRODUCT_FOUNDERS][founder_property] + ' ' + twitter_url_href + '<br/>';
        }
        else {
          html_founders += product[FIREBASE_PRODUCT_FOUNDERS][founder_property] + '<br/>';
        }
        index++;
      }

      html_founders += '</div>'; // Close founders-names-wrapper
      cardModalHTML += '<div class=\"row\">' +
                        '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_MODAL + '\">' +
                          '<b>' + DIV_TEXT_PRODUCT_FOUNDERS_MODAL + '</b>' +
                            '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER_MODAL + '\">' +
                              html_founders +
                            '</div>' +
                        '</div>' +
                      '</div>';

      // Add platforms //
      if (FIREBASE_PRODUCT_PLATFORMS in product) {
        var platforms = [];
        for (var platform_property in product[FIREBASE_PRODUCT_PLATFORMS]) {
          platforms.push(product[FIREBASE_PRODUCT_PLATFORMS][platform_property]);
        }
        platformsPrintable = platforms.join(', ');
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_PLATFORMS_MODAL + '</b>' + platformsPrintable +
                          '</div>' +
                        '</div>';
      }

      // Add API //
      if (FIREBASE_PRODUCT_API in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_API_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_API_MODAL + '</b>' + '<a target="_blank" href=\"' + product[FIREBASE_PRODUCT_API] + '\">' + product[FIREBASE_PRODUCT_API] + '</a>' +
                          '</div>' +
                        '</div>';
      }

      // Add all technologies //
      if (FIREBASE_PRODUCT_TECHNOLOGY in product) {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL + '\">';
          cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_WRAPPER_MODAL + '\">';

          var product_technology = product[FIREBASE_PRODUCT_TECHNOLOGY];
          for (var technology_property in product_technology) {
            var subtechnology = product_technology[technology_property];

            // Specific platforms
            var html = '';
            for (var subtechnology_property in subtechnology) {
              if (subtechnology_property == 'name') {
                cardModalHTML += '<div class=\"row\">' +
                                  '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_NAME_MODAL + '\">' +
                                    '<b>' + subtechnology[subtechnology_property] + '</b>' +
                                  '</div>' +
                                '</div>';
              }
              else {
                // Specific technologies of platform
                var platform_technology = subtechnology[subtechnology_property];
                var platform_subtech = [];
                for (var platform_subtechnology_property in platform_technology) {

                  var display_text = '';
                  if (platform_subtechnology_property == 'name') {
                    display_text = platform_technology[platform_subtechnology_property];
                    html += '<div class=\"' + DIV_CLASS_PRODUCT_SUBTECHNOLOGY_MODAL + '\">' +
                              '<b>' + display_text + ' ' + '</b>';
                  }
                  else {
                    platform_subtech.push(platform_technology[platform_subtechnology_property]);
                  }
                }
                var platform_subtech_printable = platform_subtech.join(', ');
                html += platform_subtech_printable + '</div>';
              }
            }
            cardModalHTML += html;
          }
          cardModalHTML += '</div>'; // Close technology wrapper div
      }

      // Add design part //
      if ( (FIREBASE_PRODUCT_FONTS in product) || (FIREBASE_PRODUCT_COLORS in product))  {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_DESIGN_DELIMITER_MODAL + '\">';
          if (FIREBASE_PRODUCT_FONTS in product) {
            var fonts = [];
            for (var font_property in product[FIREBASE_PRODUCT_FONTS]) {
              fonts.push(product[FIREBASE_PRODUCT_FONTS][font_property]);
            }
            var fontsPrintable = fonts.join(', ');
            cardModalHTML += '<div class=\"row\">' +
                              '<div class=\"' + DIV_CLASS_PRODUCT_FONTS_MODAL + '\">' +
                                '<b>' + DIV_TEXT_PRODUCT_FONTS_MODAL + '</b>' + fontsPrintable +
                              '</div>' +
                            '</div>';
          }
          if (FIREBASE_PRODUCT_COLORS in product) {
            var colors = [];
            for (var color_property in product[FIREBASE_PRODUCT_COLORS]) {
              colors.push(product[FIREBASE_PRODUCT_COLORS][color_property]);
            }
            var productColorsHTML = generateDynamicColorsHTML(COLORS_PER_ROW_MODAL, colors);
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL + '\">';
            cardModalHTML += productColorsHTML;
            cardModalHTML += '</div>';
          }
      }

      cardModalHTML += '</div></div></div>'; // Close divs
      $('div.content').last().append(cardModalHTML);
      /* ----- */
    }
    // After cards are load we either want to set the height of cards for same size or let them act dynamically.
    changeHeightOfCards();
  });

  // We want to change height of cards according to the size of window (e.g. different for mobile)
  $(window).bind('resize',function() {
    changeHeightOfCards();
});

  /* ----- Search ----- */
  var search = function() {
    var products = document.getElementsByClassName('card');
    var query = document.getElementById(SEARCHBOX_ID).value;
    var match = new Function;

    if (!query.length) {
      match = function() { return true; }
    }
    else {
      match = function (product) {
        return (product.textContent.toLowerCase().indexOf(query.toLowerCase()) >= 0);
      }
    }

    for (var i = 0; i < products.length; i++) {
      if (match(products[i]))
        products[i].parentElement.style.display = '';
      else {
        products[i].parentElement.style.display = 'none';
      }
    }
  }
  document.getElementById(SEARCHBOX_ID).addEventListener('input', search);
  /* ---------- */
}); // page loaded END
