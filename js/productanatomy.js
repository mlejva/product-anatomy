
/* Global variable */
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
                            '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_MODAL + '\" style=\"background-color:#' + colors[i] + '\">' +
                              '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_TEXT_MODAL + '\">' +
                                colors[i].toUpperCase() +
                              '</div>' +
                            '</div>' +
                          '</div>';
  }

  html += '</div>'; // Close the last row (may not be full)
  return html;
}
/* ---------- */

/* ----- Firebase functions ----- */
var initializeFirebase = function() {
  var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  };
  firebase.initializeApp(config);
}
var getDatabaseReference = function() {
  return firebase.database();
}
var getStorageReference = function() {
  return firebase.storage();
}
/* ---------- */

$(document).ready(function() {

  // Resize tags according to the actual screen size
  resizeGlobalTags();

  // Always call this before any Firebase reference
  initializeFirebase();

  var database = getDatabaseReference();
  var storage = getStorageReference();
  firebase.database().ref(FIREBASE_PRODUCTS_PATH).once('value').then(function(snapshot) {
    var products = snapshot.val();

    /* ----- Parsing product into static and modal cards  ----- */
    var cardNumber = 0;
    for (var product_property in products) {
      var product = products[product_property];
      cardNumber++;

      // Prepare static card for product
      var cardID = product[FIREBASE_PRODUCT_NAME].toLocaleLowerCase().replace(/ /g, '-'); // TODO: Should first check whether product has a name
      var cardHTML = /*'<div class=\"col-lg-4\">' +*/
                      /*'<div id=\"' + cardID + '\" data-toggle=\"modal\" data-target=\"#card' + cardNumber + '\" class=\"card\">';*/
                      '<div id=\"' + cardID + '\" class=\"card\">';
      cardHTML += '<div class=\"card-block\">';

      // Prepare modal card for product
      var cardModalHTML = '<div id=\"card' + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">' +
                            '<div class=\"modal-dialog modal-md\">' +
                              '<div class=\"modal-content\">' +
                                '<div class=\"modal-header\">' +
                                  '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>';
      var classForLogo = product[FIREBASE_PRODUCT_NAME].toLocaleLowerCase().replace(/ /g, '-') + '-modal'; // TODO: Should first check whether product has a name
      cardModalHTML += '<div class=\"media ' + classForLogo + '\">';

      // TODO: Add twitter url

      cardModalHTML += '</div>'; // Close div 'media'
      cardModalHTML += '</div> <div class=\"modal-body\">'; // Close div 'modal-header' and open div 'modal-body'


      // Add product name //
      if (FIREBASE_PRODUCT_NAME in product) {
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_NAME + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + product[FIREBASE_PRODUCT_NAME] + '</b>' +
                      '</div>' +
                    '</div>';

        cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_NAME_MODAL + '\">' +
                          '<div class=\"row\">' +
                            '<b>' + product[FIREBASE_PRODUCT_NAME] + '</b>' +
                          '</div>' +
                        '</div>';
      }

      // Add product website URL //
      if (FIREBASE_PRODUCT_URL in product) {
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_URL + '\">' +
                      '<div class=\"row\">' +
                        '<a target="_blank" href=\"' + product[FIREBASE_PRODUCT_URL] + '\">' + product[FIREBASE_PRODUCT_URL] + '</a>' +
                      '</div>' +
                    '</div>';

        cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_URL_MODAL + '\">' +
                          '<div class=\"row\">' +
                            '<a target="_blank" href=\"' + product[FIREBASE_PRODUCT_URL] + '\">' + product[FIREBASE_PRODUCT_URL] + '</a>' +
                          '</div>' +
                        '</div>';

      }

      // Add description //
      if (FIREBASE_PRODUCT_DESCRIPTION in product) {
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION + '\">' +
                      '<div class=\"row\">' +
                        product[FIREBASE_PRODUCT_DESCRIPTION] +
                      '</div>' +
                    '</div>';

        cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION_MODAL + '\">' +
                          '<div class=\"row\">' +
                            product[FIREBASE_PRODUCT_DESCRIPTION] +
                          '</div>' +
                        '</div>';
      }

      // Add platforms //
      if (FIREBASE_PRODUCT_PLATFORMS in product) {
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_PLATFORMS + '</b>';

        cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS_MODAL + '\">' +
                          '<div class=\"row\">' +
                            '<b>' + DIV_TEXT_PRODUCT_PLATFORMS_MODAL + '</b>';

        // Create array of platforms for given product
        var product_platforms = [];
        for (var platform_property in product[FIREBASE_PRODUCT_PLATFORMS]) {
          product_platforms.push(product[FIREBASE_PRODUCT_PLATFORMS][platform_property]);
        }

        // Sort platforms
        product_platforms = product_platforms.sort(function(a, b) {
          return (a.toLowerCase() > b.toLowerCase());
        });

        // Display platforms
        for (var i = 0; i < product_platforms.length; i++) {
          var platform = product_platforms[i];
          var platform_color = PLATFORM_TAG_COLORS[platform.toLocaleLowerCase()];
          cardHTML += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_STATIC + '\" style=\"background-color:' + platform_color + '\">' + platform + '</span>';
          cardModalHTML += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + platform_color + '\">' + platform + '</span>';
        }

        /*
        for (var platform_property in product[FIREBASE_PRODUCT_PLATFORMS]) {
          var platform = product[FIREBASE_PRODUCT_PLATFORMS][platform_property];
          var platform_color = PLATFORM_TAG_COLORS[platform.toLocaleLowerCase()];
          cardHTML += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_STATIC + '\" style=\"background-color:' + platform_color + '\">' + platform + '</span>';
          cardModalHTML += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + platform_color + '\">' + platform + '</span>';
        }
        */

        cardModalHTML += '</div></div>';
        cardHTML += '</div></div>';
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

        var product_founders = [];
        var foundersObject = {};
        var index = 0;
        for (var founder_property in product[FIREBASE_PRODUCT_FOUNDERS]) {
          var founder = product[FIREBASE_PRODUCT_FOUNDERS][founder_property];
          product_founders.push(founder);
          if (index < founders_twitter_url.length) {
            var twitter_url = founders_twitter_url[index];
            foundersObject[founder] = twitter_url;
          }
          else {
            foundersObject[founder] = '';
          }
          index++;
        }
        product_founders = product_founders.sort(function(a, b) {
          return ( a.toLowerCase() > b.toLowerCase() );
        });

        var html_founders_modal = '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_NAMES_MODAL + '\">';
        // TODO: static version
        var html_founders_static = '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER + '\">';
        var index = 0;
        html_founders_static += '<div class=\"row\">';

        for (var product_founder in foundersObject) {
          html_founders_modal += '<div class=\"row\">';
          // Check wether we have twitter url for this founder
          html_founders_static += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_STATIC + '\" style=\"background-color:' + FOUNDER_TAG_COLOR + '\">' + product_founder + '</span>';
          html_founders_modal += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + FOUNDER_TAG_COLOR + '\">' + product_founder + '</span>';
          if (foundersObject[product_founder] != '') {
            var twitter_url = foundersObject[product_founder];
            var twitter_url_href = '<a target="_blank" href=\"' + twitter_url + '\">' + '<i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i>' + '</a>';
            html_founders_modal += ' ' + twitter_url_href + '<br/>';
          }

          html_founders_modal += '</div>'; // Close row
          index++;
        }

        /*
        for (var founder_property in product[FIREBASE_PRODUCT_FOUNDERS]) {
          var founder = product[FIREBASE_PRODUCT_FOUNDERS][founder_property]; // Replace 'product[FIREBASE_PRODUCT_FOUNDERS][founder_property]' with 'founder'

          html_founders_modal += '<div class=\"row\">';
          // Check wether we have twitter url for this founder
          html_founders_static += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_STATIC + '\" style=\"background-color:' + FOUNDER_TAG_COLOR + '\">' + founder + '</span>';
          html_founders_modal += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + FOUNDER_TAG_COLOR + '\">' + founder + '</span>';
          if (index < founders_twitter_url.length) {
            var twitter_url = founders_twitter_url[index];
            var twitter_url_href = '<a target="_blank" href=\"' + twitter_url + '\">' + '<i class=\"fa fa-twitter fa-lg\" aria-hidden=\"true\"></i>' + '</a>';
            html_founders_modal += ' ' + twitter_url_href + '<br/>';
          }


          html_founders_modal += '</div>'; // Close row
          index++;
        }
        */
        html_founders_static += '</div>'; // Close row

        html_founders_modal += '</div>'; // Close founders-names-wrapper-modal
        html_founders_static += '</div>'; // Close founders-names-wrapper-static

        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_FOUNDERS + '</b>' +
                          html_founders_static +
                      '</div>' +
                    '</div>';

        cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_WRAPPER_MODAL + '\">' +
                          '<div class=\"row\">' +
                            '<b>' + DIV_TEXT_PRODUCT_FOUNDERS_MODAL + '</b>' +
                              html_founders_modal +
                          '</div>' +
                        '</div>';
      }

      // Add API //
      if (FIREBASE_PRODUCT_API in product) {
        cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_API_MODAL + '\">' +
                          '<div class=\"row\">' +
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
                cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_NAME_MODAL + '\">' +
                                  '<div class=\"row\">' +
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
                platform_subtech = platform_subtech.sort(function(a, b) {
                  return ( a.toLowerCase() > b.toLowerCase() );
                });
                for (var i = 0; i < platform_subtech.length; i++) {
                  var elem = platform_subtech[i];
                  var elem_color = randomColorFromString(elem, TAG_COLORS);
                  html += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + elem_color + '\">' + elem + '</span>';
                }
                html += '</div>';
                //var platform_subtech_printable = platform_subtech.join(', ');
                //html += platform_subtech_printable + '</div>';
              }
            }
            cardModalHTML += html;
          }
          cardModalHTML += '</div>'; // Close technology wrapper div
      }

      // Add design part //
      if ( (FIREBASE_PRODUCT_FONTS in product) || (FIREBASE_PRODUCT_COLORS in product) )  {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_DESIGN_DELIMITER_MODAL + '\">';

          if (FIREBASE_PRODUCT_FONTS in product) {
            // TODO: Constants
            cardModalHTML += '<div class=\"product-fonts-wrapper-modal\">';

            for (var fonts_platform_property in product[FIREBASE_PRODUCT_FONTS]) {
              var fonts_platform = product[FIREBASE_PRODUCT_FONTS][fonts_platform_property];

              var fonts = [];
              for (var font_property in fonts_platform) {
                if (font_property != 'name') {
                    fonts.push(fonts_platform[font_property]);
                }
                else {
                  // TODO: Constants
                  cardModalHTML += '<div class=\"product-platform-fonts-name-modal\">' +
                                    '<div class=\"row\">' +
                                      '<b>' + fonts_platform[font_property] + '</b>' +
                                    '</div>' +
                                   '</div>';
                }
              }
              fonts = fonts.sort(function(a, b) {
                return ( a.toLowerCase() > b.toLowerCase() );
              });
              var fontsPrintable = fonts.join(' ');
              // Add fonts for given platform
              // TODO: Constants
              cardModalHTML += '<div class=\"product-platforms-fonts-modal\">' +
                                  '<div class=\"row\">' +
                                    '<b>' + DIV_TEXT_PRODUCT_FONTS_MODAL + '</b>' + fontsPrintable +
                                  '</div>' +
                                '</div>';

            }

            cardModalHTML += '</div>'; // TODO: close product-fonts-wrapper-modal div
          }

          if (FIREBASE_PRODUCT_COLORS in product) {

            // TODO: Constants
            cardModalHTML += '<div class=\"product-colors-wrapper-modal\">';

            for (var colors_platform_property in product[FIREBASE_PRODUCT_COLORS]) {
              var colors_platform = product[FIREBASE_PRODUCT_COLORS][colors_platform_property];
            
              var colors = []
              for (var color_property in colors_platform) {
                if (color_property != 'name') {
                    colors.push(colors_platform[color_property]);
                }
                else {
                  // TODO: Constants
                  cardModalHTML += '<div class=\"product-platform-colors-name-modal\">' +
                                    '<div class=\"row\">' +
                                      '<b>' + colors_platform[color_property] + '</b>' +
                                    '</div>' +
                                   '</div>';
                }
              }
              colors.sort(function(a, b) {
                return ( a.toLowerCase() > b.toLowerCase() );
              });
              var productColorsHTML = generateDynamicColorsHTML(COLORS_PER_ROW_MODAL, colors);
              cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL + '\">';
              cardModalHTML += productColorsHTML;
              cardModalHTML += '</div>';
            }














            /*
            var colors = [];
            for (var color_property in product[FIREBASE_PRODUCT_COLORS]) {
              colors.push(product[FIREBASE_PRODUCT_COLORS][color_property]);
            }
            colors.sort(function(a, b) {
              return ( a.toLowerCase() > b.toLowerCase() );
            });
            var productColorsHTML = generateDynamicColorsHTML(COLORS_PER_ROW_MODAL, colors);
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL + '\">';
            cardModalHTML += productColorsHTML;
            cardModalHTML += '</div>';
            */
          }
      }

      cardHTML += '</div>'; // Close div modal-body

      // Add bottom button to static card //
      cardHTML += '<div class=\"card-footer ' + DIV_CLASS_BOTTOM_BUTTON_WRAPPER + '\">' +
                    '<a href=\"#\" data-toggle=\"modal\" data-target=\"#card' + cardNumber + '\" class=\"btn btn-info btn-block ' + BOTTOM_BUTTON + '\">About product</a>' +
                  '</div>';

      cardHTML += '</div></div>'; // Close divs
      //$('div.content').last().append(cardHTML);
      $('div.card-columns').last().append(cardHTML);

      cardModalHTML += '</div></div></div>'; // Close divs
      $('div.content').last().append(cardModalHTML);
    }
    /* ---------- */


    /* ----- Add product logo for both static and modal card ----- */
    for (var product_property in products) {
      var product = products[product_property];

      if (FIREBASE_PRODUCT_LOGO_URL in product) {
        var logo_url = product[FIREBASE_PRODUCT_LOGO_URL];

        var storageRef = storage.ref();
        // Get logo reference from Firebase storage
        var logoRef = storageRef.child(logo_url);
        logoRef.getMetadata().then(function(metadata) {
          var logoName = metadata.name;
          var productNameFromLogo = logoName.slice(0, logoName.indexOf('.'));

          var downloadURL = metadata.downloadURLs[0];

          // Add logo URL to static card
          // Check whether a product card for this logo is loaded in the html of a page
          if ( $('#' + productNameFromLogo).length > 0 ) {
            var logoHTML = '<img class=\"card-img-top\" src=\"' + downloadURL + '\" alt=\"Product Logo\">';
            $('#' + productNameFromLogo).last().prepend(logoHTML);
          }
          else { /* TODO: Is else branch needed?  */ }

          // Add logo URL to modal card
          // Check whether a modal product card for this logo is loaded in the html of a page
          if ( $('div.' + productNameFromLogo + '-modal').length > 0 ) {
            var logoHTML = '<span class=\"media-left\">' +
                              '<img class=\"img-responsive\" src=\"' + downloadURL + '\" alt=\"Product Logo\"/>' +
                            '</span>';
            $('div.' + productNameFromLogo + '-modal').last().prepend(logoHTML);
          }
          else { /* TODO: Is else branch needed?  */ }
        })
        .catch(function(error) {
          // TODO: Add error handling when retrieving download URL of logo from storage
          alert('Error while retrieving download URL of \'' + logo_url + '\': ' + error.code);
        });
      }
    }
    /* ---------- */

    // Add search feature to each tag we created
    tag_search();
  }); // firebase END


  /* ----- Global Events ---- */
  // Scroll to the top when modal is closed
  $('.modal').on('hidden.bs.modal', function () {
    if (tag_pressed) {
      window.scrollTo(0, 0);
      tag_pressed = false;
    }
  });

  // Add search functionality
  document.getElementById(SEARCHBOX_ID).addEventListener('input', search);

  $(window).bind('resize', function() {
    resizeGlobalTags();
  });
  /* ---------- */
}); // page loaded END
