/* ----- CONSTANTS ----- */
const SPREAD_SHEET_KEY = '1itsXofYV9YOf-VtLO8Gr9goNzaRyCGAOUgFWV1wbK38';
const SPREAD_SHEET_URL = 'https://spreadsheets.google.com/feeds/list/' + SPREAD_SHEET_KEY + '/od6/public/values?alt=json';

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
      var widthOfColumn = 12 / maxInRow;
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

  $.getJSON(SPREAD_SHEET_URL)
  .done(function(data) {
    console.log('getJSON request succeeded!');

    var entry = data.feed.entry;
    var cardNumber = 0;
    var rowHTML = '<div class=\"row content\"></div>';
    var cardInfo = '';

    $.each(entry, function(key, val) {
      var jsonObject = JSON.parse(JSON.stringify(val));

      cardNumber++;
      var product = new Product('', '', '', '', [], [], [], '', '', [], [], [], '', [], [], [], [], [], [], []);
      $.each(jsonObject, function(key, value) {
        // Parse data of next entry into a variable so it can be passed into the new card we are going to create
        if (value.$t !== '') {
          switch (key) {
            case JSON_NAME_KEY:
              product.name = value.$t;
              break;
            case JSON_LOGO_URL_KEY:
              product.logoURL = value.$t;
              break
            case JSON_URL_KEY:
              product.url = value.$t;
              break;
            case JSON_TWITTER_KEY:
              product.twitter = value.$t;
              break;
            case JSON_FOUNDERS_KEY:
              product.founders = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_FOUNDERS_TWITTER_KEY:
              product.foundersTwitter = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_ALSO_CREATED_KEY:
              product.alsoCreated = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_DESCRIPTION_KEY:
              product.description = value.$t;
              break;
            case JSON_LAUNCHED_KEY:
              product.launched = value.$t;
              break;
            case JSON_FONTS_KEY:
              product.fonts = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_COLORS_KEY:
              product.colors = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_PLATFORMS_KEY:
              product.platforms = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_API_KEY:
              product.api = value.$t;
              break;
            case JSON_TECHNOLOGY_MACOS:
              product.technologyMacOS = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_TECHNOLOGY_IOS_KEY:
              product.technologyIOS = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_TECHNOLOGY_ANDROID_KEY:
              product.technologyAndroid = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_TECHNOLOGY_WINDOWS_KEY:
              product.technologyWindows = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_TECHNOLOGY_WEBSITE_KEY:
              product.technologyWebsite = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
            case JSON_TECHNOLOGY_LINUX_KEY:
              product.technologyLinux = value.$t.split(JSON_ARRAY_DELIMITER);
              break;
          }
        }
      }); // $.each END(jsonObject,…)

      /* ----- CARD HTML ----- */
      var cardHTML = '<div class=\"col-lg-4 bottom-buffer\">' +
                      '<div data-toggle=\"modal\" data-target=\"#' + DIV_CARD_ID + cardNumber + '\" class=\"card\">' +
                        '<img class=\"card-img-top\" src=\"' + product.logoURL + '\" alt=\"Product Logo\">' +
                        '<div class=\"card-block\">';
      if (product.description.length != 0) {
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION + '\">' +
                      '<div class=\"row\">' +
                          product.description +
                      '</div>' +
                    '</div>';
      }
      if (product.platforms.length != 0) {
        var platformsPrintable = product.platforms.join(', ');
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_PLATFORMS + '</b>' + platformsPrintable +
                      '</div>' +
                    '</div>';
      }
      if (product.fonts.length != 0) {
        var fontsPrintable = product.fonts.join(', ');
        cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_FONTS + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + DIV_TEXT_PRODUCT_FONTS + '</b>' + fontsPrintable +
                      '</div>' +
                    '</div>';
      }
      // Add div wrapper for colors
      cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER + '\">' +
                  '</div>';
      cardHTML += '</div></div></div>'; // Close divs
      // Create new card for next entry (always three cards per row)
      $('div.content').last().append(cardHTML);
      /* ----------- */

      /* ----- COLORS FOR CARD HTML ----- */
      /*
      // Dynamically add colors to cardHTML
      var productColorsHTML = '<div class=\"row\">';
      var inCurrentRow = 0;
      for (var i = 0; i < product.colors.length; i++) {
        if (inCurrentRow < 2) {
          // Add next color to the currently opened row
          inCurrentRow++;
        }
        else {
          productColorsHTML += '</div>'; // Close the last full row
          // Create a new row and add one color
          inCurrentRow = 0;
          productColorsHTML += '<div class=\"row\">';
          inCurrentRow++;
        }
        productColorsHTML += '<div class=\"col-xs-5\">' +
                                '<div class=\"' + DIV_CLASS_PRODUCT_COLORS + '\" style=\"background-color:#' + product.colors[i] + '\">' +
                                  '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_TEXT + '\">' +
                                    product.colors[i].toUpperCase() +
                                  '</div>' +
                                '</div>' +
                              '</div>';
      }

      productColorsHTML += '</div>'; // Close the last row (may not be full)
      */
      var productColorsHTML = generateDynamicColorsHTML(2, product.colors);
      $('div.' + DIV_CLASS_PRODUCT_COLORS_WRAPPER).last().append(productColorsHTML);
      /* ----------- */

      /* ----- CARD MODAL HTML ----- */
      var cardModalHTML = '<div id=\"' + DIV_CARD_ID + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">' +
                            '<div class=\"modal-dialog modal-md\">' +
                              '<div class=\"modal-content\">' +
                                '<div class=\"modal-header\">' +
                                  '<img class=\"img-responsive\" src=\"' + product.logoURL + '\" alt=\"image\"/>' +
                                  '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>' +
                                '</div>' +
                                '<div class=\"modal-body\">';
      if (product.url.length != 0) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_URL_MODAL + '\">' +
                            '<a href=\"'+ product.url +'\">' + product.url + '</a>' +
                          '</div>' +
                        '</div>';
      }
      if (product.description.length != 0) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_DESCRIPTION_MODAL + '\">' +
                            product.description +
                          '</div>' +
                        '</div>';
      }
      if (product.launched.length != 0) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_LAUNCHED_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_LAUNCHED_MODAL + '</b>' + product.launched +
                          '</div>' +
                        '</div>';
      }
      if (product.founders.length != 0) {
        var foundersPrintable = product.founders.join(', ');
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_FOUNDERS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_FOUNDERS_MODAL + '</b>' + foundersPrintable +
                          '</div>' +
                        '</div>';
      }
      if (product.platforms.length != 0) {
        var platformsPrintable = product.platforms.join(', ');
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_PLATFORMS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_PLATFORMS_MODAL + '</b>' + platformsPrintable +
                          '</div>' +
                        '</div>';
      }
      if (product.api.length != 0) {
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_API_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_API_MODAL + '</b>' + '<a href=\"'+ product.api +'\">' + product.api + '</a>' +
                          '</div>' +
                        '</div>';
      }

      // Add delimiter for technology if at least one technology property isn't empty
      if (product.technologyIOS.length != 0 || product.technologyAndroid.length != 0 ||
          product.technologyMacOS.length != 0 || product.technologyWindows.length != 0 ||
          product.technologyWebsite.length != 0) {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL + '\">';
      }
      /* ----- Technology Website ----- */
      if (product.technologyWebsite.length != 0) {
        // Add Website header
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_TECHNOLOGY_WEBSITE_HEADER_MODAL + '\">' +
                            '<b>' + DIV_TEXT_TECHNOLOGY_WEBSITE_HEADER_MODAL + '</b>' +
                          '</div>' +
                        '</div>';

        // Add every technology in Website
        cardModalHTML += '<div class=\"' + DIV_CLASS_TECHNOLOGY_WEBSITE_WRAPPER_MODAL + '\">';
        for (var i = 0; i < product.technologyWebsite.length; i++) {
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_WEBSITE_MODAL + '\">' +
                              product.technologyWebsite[i] +
                            '</div>';
        }
        cardModalHTML += '</div>'; // Close Website technology wrapper
      }

      /* ----- Technology iOS ----- */
      if (product.technologyIOS.length != 0) {
        // Add iOS header
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_TECHNOLOGY_IOS_HEADER_MODAL + '\">' +
                            '<b>' + DIV_TEXT_TECHNOLOGY_IOS_HEADER_MODAL + '</b>' +
                          '</div>' +
                        '</div>';

        // Add every technology in iOS
        cardModalHTML += '<div class=\"' + DIV_CLASS_TECHNOLOGY_IOS_WRAPPER_MODAL + '\">';
        for (var i = 0; i < product.technologyIOS.length; i++) {
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_IOS_MODAL + '\">' +
                              product.technologyIOS[i] +
                            '</div>';
        }
        cardModalHTML += '</div>'; // Close iOS technology wrapper
      }

      /* ----- Technology macOS ----- */
      if (product.technologyMacOS.length != 0) {
        // Add macOS header
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_TECHNOLOGY_MACOS_HEADER_MODAL + '\">' +
                            '<b>' + DIV_TEXT_TECHNOLOGY_MACOS_HEADER_MODAL + '</b>' +
                          '</div>' +
                        '</div>';

        // Add every technology in macOS
        cardModalHTML += '<div class=\"' + DIV_CLASS_TECHNOLOGY_MACOS_WRAPPER_MODAL + '\">';
        for (var i = 0; i < product.technologyMacOS.length; i++) {
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_MACOS_MODAL + '\">' +
                              product.technologyMacOS[i] +
                            '</div>';
        }
        cardModalHTML += '</div>'; // Close macOS technology wrapper
      }

      /* ----- Technology Android ----- */
      if (product.technologyAndroid.length != 0) {
        // Add Android header
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_TECHNOLOGY_ANDROID_HEADER_MODAL + '\">' +
                            '<b>' + DIV_TEXT_TECHNOLOGY_ANDROID_HEADER_MODAL + '</b>' +
                          '</div>' +
                        '</div>';

        // Add every technology in Android
        cardModalHTML += '<div class=\"' + DIV_CLASS_TECHNOLOGY_ANDROID_WRAPPER_MODAL + '\">';
        for (var i = 0; i < product.technologyAndroid.length; i++) {
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_ANDROID_MODAL + '\">' +
                              product.technologyAndroid[i] +
                            '</div>';
        }
        cardModalHTML += '</div>'; // Close Android technology wrapper
      }

      /* ----- Technology Windows ----- */
      if (product.technologyWindows.length != 0) {
        // Add Windows header
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_TECHNOLOGY_WINDOWS_HEADER_MODAL + '\">' +
                            '<b>' + DIV_TEXT_TECHNOLOGY_WINDOWS_HEADER_MODAL + '</b>' +
                          '</div>' +
                        '</div>';

        // Add every technology in Windows
        cardModalHTML += '<div class=\"' + DIV_CLASS_TECHNOLOGY_WINDOWS_WRAPPER_MODAL + '\">';
        for (var i = 0; i < product.technologyWindows.length; i++) {
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_WINDOWS_MODAL + '\">' +
                              product.technologyWindows[i] +
                            '</div>';
        }
        cardModalHTML += '</div>'; // Close Windows technology wrapper
      }

      /* ----- Technology Linux ----- */
      if (product.technologyLinux.length != 0) {
        // Add Linux header
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_TECHNOLOGY_LINUX_HEADER_MODAL + '\">' +
                            '<b>' + DIV_TEXT_TECHNOLOGY_LINUX_HEADER_MODAL + '</b>' +
                          '</div>' +
                        '</div>';

        // Add every technology in Linux
        cardModalHTML += '<div class=\"' + DIV_CLASS_TECHNOLOGY_LINUX_WRAPPER_MODAL + '\">';
        for (var i = 0; i < product.technologyLinux.length; i++) {
            cardModalHTML += '<div class=\"' + DIV_CLASS_PRODUCT_TECHNOLOGY_LINUX_MODAL + '\">' +
                              product.technologyLinux[i] +
                            '</div>';
        }
        cardModalHTML += '</div>'; // Close Linux technology wrapper
      }

      // Add delimiter for design if at least one design property isn't empty
      if (product.fonts.length != 0 || product.colors.length != 0) {
          cardModalHTML += '<hr class=\"' + DIV_CLASS_DESIGN_DELIMITER_MODAL + '\">';
      }
      /* ----- Design Fonts ----- */
      if (product.fonts.length != 0) {
        var fontsPrintable = product.fonts.join(', ');
        cardModalHTML += '<div class=\"row\">' +
                          '<div class=\"' + DIV_CLASS_PRODUCT_FONTS_MODAL + '\">' +
                            '<b>' + DIV_TEXT_PRODUCT_FONTS_MODAL + '</b>' + fontsPrintable +
                          '</div>' +
                        '</div>';
      }
      /* ----- Design Colors ----- */
      if (product.colors.length != 0) {
        cardModalHTML += generateDynamicColorsHTML(4, product.colors);
      }

      /* ----------- */
      cardModalHTML += '</div></div></div></div>'; // Close divs
      $('div.content').last().append(cardModalHTML);
      cardInfo = ''; // Clear card data for next product
    }); // $.each(data,…) END

  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('getJSON request failed! ' + textStatus);
    // TODO: Present user with some UX friendly error page
  })
  .always(function() {
    console.log('getJSON request ended!');

    // Get the tallest card and then set height of every card to the tallest one
    // TODO: How to solve height for different screen size?
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
