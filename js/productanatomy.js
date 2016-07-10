
/* Global variable */
const platforms = ['website', 'ios', 'macos', 'windows', 'android', 'linux'];
var tag_pressed = false;
/* ---------- */

/* ----- Functions ----- */
var generateDynamicColorsHTML = function(maxInRow, colors) {
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
var changeHeightOfCards = function() {
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

var initializeFirebase = function() {
  var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  };
  firebase.initializeApp(config);

  return firebase.database();
}
/* ---------- */

$(document).ready(function() {

  // Resize tags according to the actual screen size
  resizeGlobalTags();


  var database = initializeFirebase();
  firebase.database().ref(FIREBASE_PRODUCTS_PATH).once('value').then(function(snapshot) {
    var products = snapshot.val();
    var cardNumber = 0;
    for (var product_property in products) {
      var product = products[product_property];
      cardNumber++;

      /* ----- Card HTML ----- */
      var cardHTML = '<div class=\"col-lg-4\">' +
                      '<div data-toggle=\"modal\" data-target=\"#card' + cardNumber + '\" class=\"card\">';

      if (FIREBASE_PRODUCT_LOGO_URL in product) {
        cardHTML += '<img class=\"card-img-top\" src=\"' + product[FIREBASE_PRODUCT_LOGO_URL] + '\" alt=\"Product Logo\">';
      }
      cardHTML += '<div class=\"card-block\">';
      if (FIREBASE_PRODUCT_DESCRIPTION in product) {
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION + '\">' +
                      '<div class=\"row\">' +
                        product[FIREBASE_PRODUCT_DESCRIPTION] +
                      '</div>' +
                    '</div>';
      }
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
                                  '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>';

      cardModalHTML += '<div class=\"media\">';
      // Add product logo //
      if (FIREBASE_PRODUCT_LOGO_URL in product) {
        cardModalHTML += '<span class=\"media-left\">' +
                            '<img class=\"img-responsive\" src=\"' + product[FIREBASE_PRODUCT_LOGO_URL] + '\" alt=\"Product Logo\"/>' +
                          '</span>';
      }

      // Add product twitter url //
      if (FIREBASE_PRODUCT_TWITTER_USERNAME in product) {
        var product_twitter_username = product[FIREBASE_PRODUCT_TWITTER_USERNAME];
        var twitter_url = TWITTER_BASE_ADDRESS + product_twitter_username;

        cardModalHTML += '<div class=\"media-body\">' +
                            '<div class=\"' + DIV_CLASS_PRODUCT_TWITTER_LOGO + '\">' +
                              '<a target="_blank" href=\"' + twitter_url + '\">' + '<i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i>' + '</a>' +
                            '</div>' +
                          '</div>';
      }

      cardModalHTML += '</div>'; // Close div 'media'
      cardModalHTML += '</div> <div class=\"modal-body\">'; // Close div 'modal-header' and open div 'modal-body'

      // Add product URL //
      if (FIREBASE_PRODUCT_URL in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_URL_MODAL + '\">' +
                            '<a target="_blank" href=\"' + product[FIREBASE_PRODUCT_URL] + '\">' + product[FIREBASE_PRODUCT_URL] + '</a>' +
                          '</div>' +
                        '</div>';
      }

      // Add description //
      if (FIREBASE_PRODUCT_DESCRIPTION in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION_MODAL + '\">' +
                            product[FIREBASE_PRODUCT_DESCRIPTION] +
                          '</div>' +
                        '</div>';
      }

      // Add launched //
      if (FIREBASE_PRODUCT_LAUNCHED in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_LAUNCHED_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_LAUNCHED_MODAL + '</b>' + product[FIREBASE_PRODUCT_LAUNCHED] +
                          '</div>' +
                        '</div>';
      }

      // Add founders //
      if (FIREBASE_PRODUCT_FOUNDERS in product) {
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
          var founder = product[FIREBASE_PRODUCT_FOUNDERS][founder_property]; // Replace 'product[FIREBASE_PRODUCT_FOUNDERS][founder_property]' with 'founder'

          html_founders += '<div class=\"row\">';
          // Check wether we have twitter url for this founder
          html_founders += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + FOUNDER_TAG_COLOR + '\">' + founder + '</span>';
          if (index < founders_twitter_url.length) {
            var twitter_url = founders_twitter_url[index];
            var twitter_url_href = '<a target="_blank" href=\"' + twitter_url + '\">' + '<i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i>' + '</a>';
            html_founders += ' ' + twitter_url_href + '<br/>';
            //html_founders += product[FIREBASE_PRODUCT_FOUNDERS][founder_property] + ' ' + twitter_url_href + '<br/>';
          }
          else {
            //html_founders += product[FIREBASE_PRODUCT_FOUNDERS][founder_property] + '<br/>';
          }
          html_founders += '</div>';
          index++;
        }

        html_founders += '</div>'; // Close founders-names-wrapper
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_FOUNDERS_MODAL + '</b>' +
                              html_founders +
                          '</div>' +
                        '</div>';
      }

      // Add platforms //
      if (FIREBASE_PRODUCT_PLATFORMS in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_PLATFORMS_MODAL + '</b>';
        var platforms = [];
        for (var platform_property in product[FIREBASE_PRODUCT_PLATFORMS]) {
          var platform = product[FIREBASE_PRODUCT_PLATFORMS][platform_property];
          var platform_color = PLATFORM_TAG_COLORS[platform.toLocaleLowerCase()];
          cardModalHTML += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + platform_color + '\">' + platform + '</span>';
        }
        cardModalHTML += '</div></div>';
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
                for (var i = 0; i < platform_subtech.length; i++) {
                  var elem = platform_subtech[i];
                  var elem_color = randomColorFromString(elem, TAG_COLORS);
                  html += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + elem_color + '\">' + elem + '</span>';
                }
                var platform_subtech_printable = platform_subtech.join(', ');

                //html += platform_subtech_printable + '</div>';
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

    // After cards are loaded we either want to set the height of cards for same size or let them act dynamically.
    changeHeightOfCards();
    document.getElementById(SEARCHBOX_ID).addEventListener('input', search);
    // Add search feature to each tag we created
    tag_search();

    // Scroll to the top when modal is closed
    $('.modal').on('hidden.bs.modal', function () {
      if (tag_pressed) {
        window.scrollTo(0, 0);
        tag_pressed = false;
      }
    });
  }); // firebase END

  /* ----- Global Events ---- */
  // We want to change height of cards according to the size of window (e.g. different for mobile)
  $(window).bind('resize',function() {
    changeHeightOfCards();
    resizeGlobalTags();
  });
  /* ---------- */

}); // page loaded END
