
const COLORS_PER_ROW = 2;
const COLORS_PER_ROW_MODAL = 2;

const BOOTSTRAP_MAX_WIDTH = 12;

const SEARCHBOX_ID = 'searchbox';

const DIV_CLASS_TAG_WRAPPER = 'tag-wrapper';
const DIV_CLASS_TAG = 'tag';

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
const DIV_CLASS_PRODUCT_TWITTER_LOGO = 'twitter-logo';

const DIV_CLASS_PRODUCT_URL_MODAL = 'product-url-modal';

const DIV_CLASS_PRODUCT_DESCRIPTION_MODAL = 'product-description-modal';

const DIV_CLASS_PRODUCT_LAUNCHED_MODAL = 'product-launched-modal';
const DIV_TEXT_PRODUCT_LAUNCHED_MODAL = 'Launched on ';

const DIV_CLASS_PRODUCT_FOUNDERS_MODAL = 'product-founders-modal';
const DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER_MODAL = 'founders-names-wrapper';
const FOUNDER_TAG_COLOR = '#d0021b';
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

/* ----- Constants for Firebase ----- */
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
const FIREBASE_PRODUCT_LOGO_URL = 'logo-url'
const FIREBASE_PRODUCT_TWITTER_USERNAME = 'twitter-username';
/* ---------- */

/* Constants for Twitter */
const TWITTER_BASE_ADDRESS = 'https://www.twitter.com/';
/* ---------- */

/* Global variable */
var tag_colors = ['orange', 'teal', 'cyan', 'goldenrod', 'purple', 'blue', 'pink', 'brown'];
//var platform_tag_colors  = ['#ff7473', '#ffc952', '#47b8e0', '#58C9B9', '#D1B6E1', '#CE6D39'];
var platform_tag_colors = {
  website: '#ff7473',
  ios: '#ffc952',
  macos: '#47b8e0',
  windows: '#58c9b9',
  android: '#d1b6e1',
  linux: '#ce6d39'
}
var global_tags = ['Website', 'iOS', 'macOS', 'Windows', 'Android', 'Linux', 'Javascript', 'C', 'Objective-C', 'C++', 'Go', 'Java', 'Python', 'Hack', 'PHP', 'Erlang', 'Swift', 'Haskell', 'Perl'];
Array.prototype.push.apply(global_tags, ['Scala', 'Ruby on Rails', 'C#']);
var platforms = ['website', 'ios', 'macos', 'windows', 'android', 'linux'];
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
// TODO: Make my own
var randomColorFromString = function (str, colors) {
    function digitize (str) {
        var code = 0;
        if (str === undefined) { return code; }
        for (var i = 0; i < str.length; i++)
            code += str.toLowerCase().charCodeAt(i);
        return code;
    }

    var code = digitize(str);
    return colors[(code % colors.length)];
};
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
// Instead of deleting all elements it should move elements to next row according to max in row
function resizeGlobalTags() {
  $('div.tag-wrapper').children('.row').empty();
  var maxInRow = 0;
  var offset = 0;
  if ($(window).width() > 567) {
    //$('div.tag-wrapper').children('.row').children().removeClass('col-lg-2 col-lg-offset-5');
    //$('div.tag-wrapper').children('.row').children().addClass('col-lg-6 col-lg-offset-3');
    maxInRow = 6;
    offset = 3;
  }
  else {
    //$('div.tag-wrapper').children('.row').children().removeClass('col-lg-6 col-lg-offset-3');
    //$('div.tag-wrapper').children('.row').children().addClass('col-lg-2 col-lg-offset-5');
    maxInRow = 2;
    offset = 5;
  }

  // Add tags under searchbar
  var global_tags_html = '<div class=\"col-lg-' + maxInRow + ' col-lg-offset-' + offset + '\">';
  global_tags_html += '<div class=\"tag-row\">';
  var in_current_row = 0;
  for (var i = 0; i < global_tags.length; i++) {
    if (in_current_row < maxInRow) {
      in_current_row++;
    }
    else {
      in_current_row = 0;
      global_tags_html += '</div> </div>';
      global_tags_html += '<div class=\"col-lg-' + maxInRow + ' col-lg-offset-' + offset + '\">';
      global_tags_html += '<div class=\"tag-row\">';
      in_current_row++;
    }
    var tag_name = global_tags[i];
    var tag_color;
    if (isInArray(tag_name.toLocaleLowerCase(), platforms)) {
        tag_color = platform_tag_colors[tag_name.toLocaleLowerCase()];
    }
    else {
      tag_color = randomColorFromString(tag_name, tag_colors);
    }
    global_tags_html += '<span class=\"' + DIV_CLASS_TAG + '\" style=\"background-color:' + tag_color + '\">' + tag_name + '</span>';
  }
  global_tags_html += '</div> </div>'
  $('div.tag-wrapper').children('.row').append(global_tags_html);
}
/* ---------- */

$(document).ready(function() {



  resizeGlobalTags();


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
          html_founders += '<span class=\"' + DIV_CLASS_TAG + '\" style=\"background-color:' + FOUNDER_TAG_COLOR + '\">' + founder + '</span>';
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
          var platform_color = platform_tag_colors[platform.toLocaleLowerCase()];
          cardModalHTML += '<span class=\"' + DIV_CLASS_TAG + '\" style=\"background-color:' + platform_color + '\">' + platform + '</span>';
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
                  var elem_color = randomColorFromString(elem, tag_colors);
                  html += '<span class=\"' + DIV_CLASS_TAG + '\" style=\"background-color:' + elem_color + '\">' + elem + '</span>';
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







    // After cards are load we either want to set the height of cards for same size or let them act dynamically.
    changeHeightOfCards();
    /* ----- Search ----- */
    var products_modal = document.getElementsByClassName('modal'); // We want to search in modals
    var products_static = document.getElementsByClassName('card'); // But we want to hide statics
    var search = function() {
      var query = document.getElementById(SEARCHBOX_ID).value;
      var match = new Function;

      if (!query.length) {
        match = function() { return true; }
      }
      else if (query.substr(0, query.indexOf(':')) == ':' ) {

      }
      else {
        match = function (product) {
          return (product.textContent.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        }
      }

      for (var i = 0; i < products_modal.length; i++) {
        if (match(products_modal[i]))
          products_static[i].parentElement.style.display = '';
        else {
          products_static[i].parentElement.style.display = 'none';
        }
      }
    }
    document.getElementById(SEARCHBOX_ID).addEventListener('input', search);

    /* ----- Search using tags ----- */
    var tags = document.getElementsByClassName(DIV_CLASS_TAG);
    for (var i = 0; i < tags.length; i++) (function (tag) {
      tag.addEventListener('click', function (e) {
        $(this).closest('.modal').modal('toggle');
        document.getElementById(SEARCHBOX_ID).value = tag.textContent;
        search();
      })
    })(tags[i]);
    /* ---------- */
  }); // firebase END


  /* ----- Global Events ---- */
  // We want to change height of cards according to the size of window (e.g. different for mobile)
  $(window).bind('resize',function() {
    changeHeightOfCards();
    resizeGlobalTags();
  });
  /* ---------- */

}); // page loaded END
