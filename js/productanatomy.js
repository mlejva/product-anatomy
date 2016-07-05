$(document).ready(function() {
  function Product(name, url, twitter, founders, foundersTwitter, alsoCreated, description, launched, fonts, colors, platforms, technologyIOS, technologyAndroid, technologyWindows, technologyWebsite) {
    this.name = name;
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
    this.technologyIOS = technologyIOS;
    this.technologyAndroid = technologyAndroid;
    this.technologyWindows = technologyWindows;
    this.technologyWebsite = technologyWebsite;
  }
  /* ----- CONSTANTS ----- */
  const SPREAD_SHEET_KEY = '1itsXofYV9YOf-VtLO8Gr9goNzaRyCGAOUgFWV1wbK38';
  const SPREAD_SHEET_URL = 'https://spreadsheets.google.com/feeds/list/' + SPREAD_SHEET_KEY + '/od6/public/values?alt=json';

  const JSON_NAME_KEY = 'gsx$name';
  const JSON_URL_KEY = 'gsx$url';
  const JSON_TWITTER_KEY = 'gsx$twitter';
  const JSON_FOUNDERS_KEY = 'gsx$founders';
  const JSON_FOUNDERS_TWITTER_KEY = 'gsx$foundersTwitter';
  const JSON_ALSO_CREATED_KEY = 'gsx$alsoCreated';
  const JSON_DESCRIPTION_KEY = 'gsx$description';
  const JSON_LAUNCHED_KEY = 'gsx$launched';
  const JSON_FONTS_KEY = 'gsx$fonts';
  const JSON_COLORS_KEY = 'gsx$colors';
  const JSON_PLATFORMS_KEY = 'gsx$platforms';
  const JSON_TECHNOLOGY_IOS_KEY = 'gsx$technologyIOS';
  const JSON_TECHNOLOGY_ANDROID_KEY = 'gsx$technologyAndroid';
  const JSON_TECHNOLOGY_WINDOWS_KEY = 'gsx$technologyWindows';
  const JSON_TECHNOLOGY_WEBSITE_KEY = 'gsx$technologyWebsite';

  const DIV_CARD_ID = 'card';

  const DIV_CLASS_PRODUCT_DESCRIPTION = 'product-description';
  const DIV_CLASS_PRODUCT_PLATFORMS = 'product-platforms';
  const DIV_CLASS_PRODUCT_FONTS = 'product-fonts';
  const DIV_CLASS_PRODUCT_COLORS = 'product-colors';
  const DIV_CLASS_PRODUCT_COLORS_WRAPPER = 'product-colors-wrapper'
  const DIV_CLASS_PRODUCT_COLORS_TEXT = 'product-colors-text';

  const DIV_TEXT_PRODUCT_PLATFORMS = 'Platforms ';
  const DIV_TEXT_PRODUCT_FONTS = 'Fonts ';
  /* ----------- */

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

      var product = new Product('', '', '', [], [], [], '', '', [], [], [], [], [], [], []);
      // TODO: Should add HTML only once inside each loop so search for specific element is done only once
      $.each(jsonObject, function(key, value) {
        // Parse data of next entry into a variable so it can be passed into the new card we are going to create
        if (value.$t !== '') {
          if (key === 'gsx$name' || key === 'gsx$description' || key === 'gsx$launched' || key === 'gsx$font' || key === 'gsx$technology') {
            cardInfo += '<b>' + key.substring(4) + '</b>' + ': ' + value.$t + '<br/>';
          }
          switch (key) {
            case JSON_NAME_KEY:
              product.name = value.$t;
              break;
            case JSON_URL_KEY:
              product.url = value.$t;
              break;
            case JSON_TWITTER_KEY:
              product.twitter = value.$t;
              break;
            case JSON_FOUNDERS_KEY:
              product.founders = value.$t.split('$');
              break;
            case JSON_FOUNDERS_TWITTER_KEY:
              product.foundersTwitter = value.$t.split('$');
              break;
            case JSON_ALSO_CREATED_KEY:
              product.alsoCreated = value.$t.split('$');
              break;
            case JSON_DESCRIPTION_KEY:
              product.description = value.$t;
              break;
            case JSON_LAUNCHED_KEY:
              product.launched = value.$t;
              break;
            case JSON_FONTS_KEY:
              product.fonts = value.$t.split('$');
              break;
            case JSON_COLORS_KEY:
              product.colors = value.$t.split('$');
              break;
            case JSON_PLATFORMS_KEY:
              product.platforms = value.$t.split('$');
              break;
            case JSON_TECHNOLOGY_IOS_KEY:
              product.technologyIOS = value.$t.split('$');
              break;
            case JSON_TECHNOLOGY_ANDROID_KEY:
              product.technologyAndroid = value.$t.split('$');
              break;
            case JSON_TECHNOLOGY_WINDOWS_KEY:
              product.technologyWindows = value.$t.split('$');
              break;
            case JSON_TECHNOLOGY_WEBSITE_KEY:
              product.technologyWebsite = value.$t.split('$');
              break;
          }
        }
      }); // $.each END(jsonObject,…)

      var cardHTML = '<div data-toggle=\"modal\" data-target=\"#' + DIV_CARD_ID + cardNumber + '\" class=\"col-lg-4\">' +
                      '<div class=\"card\">' +
                        '<img class=\"card-img-top\" src=\"https://brandfolder.com/slack/logo/slack-primary-logo.png\" alt=\"\" style=\"width:105px; height:30px; margin-top:20px; margin-left:20px;\">' +
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
      // Add div for colors
      cardHTML += '<div class=\"' + DIV_CLASS_PRODUCT_COLORS_WRAPPER + '\">' +
                  '</div>';
      // Close divs
      cardHTML += '</div></div></div>';




      var cardModalHTML = '<div id=\"' + DIV_CARD_ID + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">' +
                        '<div class=\"modal-dialog\">' +
                          '<div class=\"modal-content\">' +
                            '<div class=\"modal-header\">' +
                              '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>' +
                            '</div>' +
                            '<div class=\"modal-body\">' +
                              cardInfo +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>'

      // Create new card for next entry (always three cards per row)
      $('div.content').last().append(cardHTML);
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
      $('div.' + DIV_CLASS_PRODUCT_COLORS_WRAPPER).last().append(productColorsHTML);
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
    var query = document.getElementById('searchbox').value;
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
        products[i].parentElement.style.display = 'none';;
      }
    }
  }
  document.getElementById('searchbox').addEventListener('input', search);
}); // page loaded END
