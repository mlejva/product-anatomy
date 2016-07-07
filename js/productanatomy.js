/* ----- CONSTANTS ----- */
const SPREAD_SHEET_KEY = '1itsXofYV9YOf-VtLO8Gr9goNzaRyCGAOUgFWV1wbK38';
const SPREAD_SHEET_URL = 'https://spreadsheets.google.com/feeds/list/' + SPREAD_SHEET_KEY + '/od6/public/values?alt=json';

const COLORS_PER_ROW = 2;
const COLORS_PER_ROW_MODAL = 2;

const BOOTSTRAP_MAX_WIDTH = 12;

const JSON_ARRAY_DELIMITER = '$';
const JSON_NAME_KEY = 'gsx$name';
const JSON_LOGO_URL_KEY = 'gsx$logourl';
const JSON_URL_KEY = 'gsx$url';
const JSON_TWITTER_KEY = 'gsx$twitter';
const JSON_FOUNDERS_KEY = 'gsx$founders';
const JSON_FOUNDERS_TWITTER_KEY = 'gsx$founderstwitter';
const JSON_ALSO_CREATED_KEY = 'gsx$alsocreated';
const JSON_DESCRIPTION_KEY = 'gsx$description';
const JSON_LAUNCHED_KEY = 'gsx$launched';
const JSON_FONTS_KEY = 'gsx$fonts';
const JSON_COLORS_KEY = 'gsx$colors';
const JSON_PLATFORMS_KEY = 'gsx$platforms';
const JSON_API_KEY = 'gsx$api';
const JSON_TECHNOLOGY_MACOS = 'gsx$technologymacos'
const JSON_TECHNOLOGY_IOS_KEY = 'gsx$technologyios';
const JSON_TECHNOLOGY_ANDROID_KEY = 'gsx$technologyandroid';
const JSON_TECHNOLOGY_WINDOWS_KEY = 'gsx$technologywindows';
const JSON_TECHNOLOGY_WEBSITE_KEY = 'gsx$technologywebsite';
const JSON_TECHNOLOGY_LINUX_KEY = 'gsx$technologylinux';

const SEARCHBOX_ID = 'searchbox';

const DIV_CARD_ID = 'card';

const DIV_CLASS_PRODUCT_DESCRIPTION = 'product-description';
const DIV_CLASS_PRODUCT_PLATFORMS = 'product-platforms';
const DIV_CLASS_PRODUCT_FONTS = 'product-fonts';
const DIV_CLASS_PRODUCT_COLORS_WRAPPER = 'product-colors-wrapper'
const DIV_CLASS_PRODUCT_COLORS = 'product-colors';
const DIV_CLASS_PRODUCT_COLORS_TEXT = 'product-colors-text';

const DIV_TEXT_PRODUCT_PLATFORMS = 'Platforms ';
const DIV_TEXT_PRODUCT_FONTS = 'Fonts ';

const DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL = 'technology-delimiter-modal';
const DIV_CLASS_DESIGN_DELIMITER_MODAL = 'design-delimiter-modal';

const DIV_CLASS_TECHNOLOGY_IOS_HEADER_MODAL = 'technology-ios-header-modal'
const DIV_CLASS_TECHNOLOGY_IOS_WRAPPER_MODAL = 'technology-ios-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_IOS_MODAL = 'product-technology-ios-modal';
const DIV_TEXT_TECHNOLOGY_IOS_HEADER_MODAL = 'iOS';

const DIV_CLASS_TECHNOLOGY_MACOS_HEADER_MODAL = 'technology-macos-header-modal'
const DIV_CLASS_TECHNOLOGY_MACOS_WRAPPER_MODAL = 'technology-macos-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_MACOS_MODAL = 'product-technology-macos-modal';
const DIV_TEXT_TECHNOLOGY_MACOS_HEADER_MODAL = 'macOS';

const DIV_CLASS_TECHNOLOGY_ANDROID_HEADER_MODAL = 'technology-android-header-modal'
const DIV_CLASS_TECHNOLOGY_ANDROID_WRAPPER_MODAL = 'technology-android-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_ANDROID_MODAL = 'product-technology-android-modal';
const DIV_TEXT_TECHNOLOGY_ANDROID_HEADER_MODAL = 'Android';

const DIV_CLASS_TECHNOLOGY_WEBSITE_HEADER_MODAL = 'technology-website-header-modal'
const DIV_CLASS_TECHNOLOGY_WEBSITE_WRAPPER_MODAL = 'technology-website-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_WEBSITE_MODAL = 'product-technology-website-modal';
const DIV_TEXT_TECHNOLOGY_WEBSITE_HEADER_MODAL = 'Website';

const DIV_CLASS_TECHNOLOGY_WINDOWS_HEADER_MODAL = 'technology-windows-header-modal'
const DIV_CLASS_TECHNOLOGY_WINDOWS_WRAPPER_MODAL = 'technology-windows-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_WINDOWS_MODAL = 'product-technology-windows-modal';
const DIV_TEXT_TECHNOLOGY_WINDOWS_HEADER_MODAL = 'Windows';

const DIV_CLASS_TECHNOLOGY_LINUX_HEADER_MODAL = 'technology-linux-header-modal'
const DIV_CLASS_TECHNOLOGY_LINUX_WRAPPER_MODAL = 'technology-linux-wrapper';
const DIV_CLASS_PRODUCT_TECHNOLOGY_LINUX_MODAL = 'product-technology-linux-modal';
const DIV_TEXT_TECHNOLOGY_LINUX_HEADER_MODAL = 'Linux';


const DIV_CLASS_PRODUCT_URL_MODAL = 'product-url-modal';

const DIV_CLASS_PRODUCT_DESCRIPTION_MODAL = 'product-description-modal';

const DIV_CLASS_PRODUCT_LAUNCHED_MODAL = 'product-launched-modal';
const DIV_TEXT_PRODUCT_LAUNCHED_MODAL = 'Launched on ';

const DIV_CLASS_PRODUCT_FOUNDERS_MODAL = 'product-founders-modal';
const DIV_TEXT_PRODUCT_FOUNDERS_MODAL = 'Founded by ';

const DIV_CLASS_PRODUCT_PLATFORMS_MODAL = 'product-platforms-modal';
const DIV_TEXT_PRODUCT_PLATFORMS_MODAL = 'Platforms ';

const DIV_CLASS_PRODUCT_API_MODAL = 'product-api-modal';
const DIV_TEXT_PRODUCT_API_MODAL = 'API ';

const DIV_CLASS_PRODUCT_FONTS_MODAL = 'product-fonts-modal';
const DIV_TEXT_PRODUCT_FONTS_MODAL = 'Fonts ';
/* ----------- */

$(document).ready(function() {
  function Product(name, logoURL, url, twitter, founders, foundersTwitter, alsoCreated, description,
    launched, fonts, colors, platforms, api, technologyMacOS, technologyIOS, technologyAndroid,
    technologyWindows, technologyWebsite, technologyLinux) {
    this.name = name;
    this.logoURL = logoURL;
    this.url = url;
    this.twitter = twitter;
    this.founders = founders;
    this.foundersTwitter = foundersTwitter;
    this.alsoCreated = alsoCreated;
    this.description = description;
    this.launched = launched;
    this.fonts = fonts;
    this.colors = colors;
    this.platforms = platforms;
    this.api = api;
    this.technologyMacOS = technologyMacOS;
    this.technologyIOS = technologyIOS;
    this.technologyAndroid = technologyAndroid;
    this.technologyWindows = technologyWindows;
    this.technologyWebsite = technologyWebsite;
    this.technologyLinux = technologyLinux;
  }

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

  var config = {
    apiKey: "AIzaSyBJf4MX7uWsGQfoleAnoj7T2vg5boS1FUs",
    authDomain: "product-anatomy.firebaseapp.com",
    databaseURL: "https://product-anatomy.firebaseio.com",
    storageBucket: "product-anatomy.appspot.com",
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  firebase.database().ref('/products').once('value').then(function(snapshot) {

    var products = snapshot.val();
    var cardNumber = 0;
    for (var product_property in products) {
      var product = products[product_property];
      cardNumber++;

      /* CARD HTML */
      var cardHTML = '<div class=\"col-lg-4 bottom-buffer\">' +
                      '<div data-toggle=\"modal\" data-target=\"#' + DIV_CARD_ID + cardNumber + '\" class=\"card\">' +
                        '<img class=\"card-img-top\" src=\"' + product['logo-url'] + '\" alt=\"Product Logo\">' +
                        '<div class=\"card-block\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION + '\">' +
                            '<div class=\"row\">' +
                              product['description'] +
                            '</div>' +
                          '</div>';

      if ('platforms' in product) {
        var platforms = [];
        for (var platform_property in product['platforms']) {
          platforms.push(product['platforms'][platform_property]);
        }
        platformsPrintable = platforms.join(', ');
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_PLATFORMS + '</b>' + platformsPrintable +
                      '</div>' +
                    '</div>';
      }
      if ('fonts' in product) {
        var fonts = [];
        for (var font_property in product['fonts']) {
          fonts.push(product['fonts'][font_property]);
        }
        var fontsPrintable = fonts.join(', ');
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_FONTS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_FONTS + '</b>' + fontsPrintable +
                      '</div>' +
                    '</div>';
      }
      if ('colors' in product) {
        var colors = [];
        for (var color_property in product['colors']) {
          colors.push(product['colors'][color_property]);
        }
        var productColorsHTML = generateDynamicColorsHTML(COLORS_PER_ROW, colors);
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER + '\">' + '</div>';
        cardHTML += productColorsHTML;

      }

      cardHTML += '</div></div></div>'; // Close divs
      // Append this card
      $('div.content').last().append(cardHTML);
      /* ----- */

      /* CARD MODAL HTML */
      var cardModalHTML = '<div id=\"' + DIV_CARD_ID + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">' +
                            '<div class=\"modal-dialog modal-md\">' +
                              '<div class=\"modal-content\">' +
                                '<div class=\"modal-header\">' +
                                  '<img class=\"img-responsive\" src=\"' + product['logo-url'] + '\" alt=\"image\"/>' +
                                  '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>' +
                                '</div>' +
                                '<div class=\"modal-body\">';


      if ('url' in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_URL_MODAL + '\">' +
                            '<a href=\"'+ product['url'] +'\">' + product['url'] + '</a>' +
                          '</div>' +
                        '</div>';
      }
      // Add description
      cardModalHTML += '<div class=\"row\">' +
                        '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION_MODAL + '\">' +
                          product['description'] +
                        '</div>' +
                      '</div>';
      // Add launched
      cardModalHTML += '<div class=\"row\">' +
                        '<div class=\"' + DIV_CLASS_PRODUCT_LAUNCHED_MODAL + '\">' +
                          '<b>' + DIV_TEXT_PRODUCT_LAUNCHED_MODAL + '</b>' + product['launched'] +
                        '</div>' +
                      '</div>';
      // Add founders
      var founders = [];
      for (var founder_property in product['founders']) {
        founders.push(product['founders'][founder_property]);
      }
      var foundersPrintable = founders.join(', ');
      cardModalHTML += '<div class=\"row\">' +
                        '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_MODAL + '\">' +
                          '<b>' + DIV_TEXT_PRODUCT_FOUNDERS_MODAL + '</b>' + foundersPrintable +
                        '</div>' +
                      '</div>';
      if ('platforms' in product) {
        var platforms = [];
        for (var platform_property in product['platforms']) {
          platforms.push(product['platforms'][platform_property]);
        }
        platformsPrintable = platforms.join(', ');
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_PLATFORMS_MODAL + '</b>' + platformsPrintable +
                          '</div>' +
                        '</div>';
      }
      if ('api' in product) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_API_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_API_MODAL + '</b>' + '<a href=\"'+ product['api'] +'\">' + product['api'] + '</a>' +
                          '</div>' +
                        '</div>';
      }
      // Add all technologies
      if ('technology' in product) {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL + '\">';
          cardModalHTML += '<div class=\"technology-wrapper\">'; // TODO: CONSTANT

          var product_technology = product['technology'];
          for (var technology_property in product_technology) {
            var subtechnology = product_technology[technology_property];

            // Specific platforms
            var html = '';
            for (var subtechnology_property in subtechnology) {
              if (subtechnology_property == 'name') {
                cardModalHTML += '<div class=\"row\">' +
                                  '<div class=\"' + 'technology-name' + '\">' + // TODO: CONSTANT
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
                    html += '<div class=\"' + 'subtechnology' + '\">' + // TODO: CONSTANT
                              '<b>' + display_text + '</b>';
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
      // Add design part
      if (('fonts' in product) || ('colors' in product)) {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_DESIGN_DELIMITER_MODAL + '\">';
          if ('fonts' in product) {
            var fonts = [];
            for (var font_property in product['fonts']) {
              fonts.push(product['fonts'][font_property]);
            }
            var fontsPrintable = fonts.join(', ');
            cardModalHTML += '<div class=\"row\">' +
                              '<div class=\"' + DIV_CLASS_PRODUCT_FONTS_MODAL + '\">' +
                                '<b>' + DIV_TEXT_PRODUCT_FONTS_MODAL + '</b>' + fontsPrintable +
                              '</div>' +
                            '</div>';
          }
          if ('colors' in product) {
            var colors = [];
            for (var color_property in product['colors']) {
              colors.push(product['colors'][color_property]);
            }
            var productColorsHTML = generateDynamicColorsHTML(COLORS_PER_ROW_MODAL, colors);
            cardModalHTML += '<div class=\"colors-modal-wrapper\">';
            cardModalHTML += productColorsHTML;
            cardModalHTML += '</div>';
          }
      }
      cardModalHTML += '</div></div></div>'; // Close divs
      console.log(cardModalHTML);
      $('div.content').last().append(cardModalHTML);
      /* ----- */
    }
  });

  changeHeightOfCards();
  $(window).bind('resize',function(){
    changeHeightOfCards();
});

  /* ----- SEARCH ----- */
  var products = document.getElementsByClassName('card');
  var search = function() {
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
}); // page loaded END
