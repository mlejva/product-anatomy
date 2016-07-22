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
    var widthOfColumn = CONST.BOOTSTRAP_MAX_WIDTH / maxInRow;
    html += '<div class=\"col-xs-' + widthOfColumn + '\">' +
                            '<div class=\"' + CONST.DIV_CLASS_PRODUCT_COLOR_MODAL + '\" style=\"background-color:#' + colors[i] + '\">' +
                              '<div class=\"' + CONST.DIV_CLASS_PRODUCT_COLOR_TEXT_MODAL + '\">' +
                                colors[i].toUpperCase() +
                              '</div>' +
                            '</div>' +
                          '</div>';
  }

  html += '</div>'; // Close the last row (may not be full)
  return html;
}

var getTechnologyDelimiter = function() {
  var delimHTML = '<hr class=\"' + CONST.DIV_CLASS_TECHNOLOGY_DELIMITER_MODAL + '\">';
  return delimHTML;
}

var getDesignDelimiter = function() {
  var delimHTML = '<hr class=\"' + CONST.DIV_CLASS_DESIGN_DELIMITER_MODAL + '\">';
  return delimHTML;
}

// Returns HTML parsed technology of given platform
var parsePlatformTechnology = function(platformObj) {
  // platformObj contains platform specific technology
  /*
  *   platformObj: <object>
  *   |
  *   name: <string>
  *   |
  *   techType1: <object>
  *    \
  *     |
  *     name: <string>
  *     |
  *     tehnology: <string>
  *   |
  *   techType2
  *   ...
  */


  var platformName = platformObj['name'];
  var techHTML = '<div class=\"' + CONST.DIV_CLASS_PRODUCT_TECHNOLOGY_NAME_MODAL + '\">' +
                  '<div class="row">' +
                    '<b>' + platformName + '</b>' +
                  '</div>' +
                '</div>';
  for (var platformProperty in platformObj) {

      if (platformProperty !== 'name') {
        var techTypeObj = platformObj[platformProperty];

        var techTypeName = techTypeObj['name'];
        techHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_SUBTECHNOLOGY_MODAL + '\">' +
                      '<b>' + techTypeName + ' ' + '</b>';

        // Now for each tech type object we have to loop through it and prepare HTML
        for (var techTypeProperty in techTypeObj) {

          if (techTypeProperty !== 'name') {
            var technology = techTypeObj[techTypeProperty];
            var tagColor = randomColorFromString(technology, CONST.TAG_COLORS);
            var tagHTML = '<span class=\"' + CONST.DIV_CLASS_TAG + ' ' + CONST.DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + tagColor + '\">' + technology + '</span>';

            techHTML += tagHTML;
          }
        }
        techHTML += '</div>'; // Close DIV_CLASS_PRODUCT_SUBTECHNOLOGY_MODAL
      }

  }

  return techHTML;
}

// Return HTML parsed fonts of given platforms
var parsePlatformFonts = function(platformObj) {
  var platformName = platformObj['name'];
  var fontsHTML = '<div class=\"' + CONST.DIV_CLASS_PRODUCT_PLATFORM_FONTS_NAME_MODAL + '\">' +
                    '<div class=row>' +
                      '<b>' + platformName + ' ' + '</b>' +
                    '</div>' +
                  '</div>' +
                  '<div class=\"' + CONST.DIV_CLASS_PRODUCT_PLATFORMS_FONTS_MODAL + '\">' +
                    '<div class=\"row\">' +
                      '<b>' + CONST.DIV_TEXT_PRODUCT_FONTS_MODAL + '</b>';

  for (var platformProperty in platformObj) {
      if (platformProperty !== 'name') {
        var fontName = platformObj[platformProperty];

        fontsHTML += fontName + ' ';
      }
  }

  fontsHTML += '</div></div>'; // Close DIV_CLASS_PRODUCT_PLATFORMS_FONTS_MODAL and row

  return fontsHTML;
}

// Return HTML parsed colors of given platforms
var parsePlatformColors = function(platformObj) {
  var platformName = platformObj['name'];
  var colorsHTML = '<div class=\"' + CONST.DIV_CLASS_PRODUCT_PLATFORM_COLORS_NAME_MODAL + '\">' +
                      '<div class=row>' +
                        '<b>' + platformName + ' ' + '</b>' +
                      '</div>' +
                    '</div>' +
                    '<div class=\"' + CONST.DIV_CLASS_PRODUCT_PLATFORM_COLORS_MODAL + '\">';
  var colors = [];

  for (var platformProperty in platformObj) {
    if (platformProperty !== 'name') {
      var color = platformObj[platformProperty];
      colors.push(color);
    }
  }


  colorsHTML += generateDynamicColorsHTML(CONST.COLORS_PER_ROW_MODAL, colors);
  colorsHTML += '</div>';

  return colorsHTML;
}

class Product {

  // Properties in opt object in constructor are properties that every product must have ->
  // -> these properties will always be displayed
  constructor(firebaseProduct, opts) {

    if ( !firebaseProduct || (Object.keys(firebaseProduct).length === 0 && firebaseProduct.constructor === Object) ) {
      // TODO: Constants
      if ( ('name' in opts) && ('url' in opts) && ('description' in opts) && ('platforms' in opts) && ('founders' in opts) ) {
        this.name = opts['name'];
        this.url = opts['url'];
        this.description = opts['description'];
        this.platforms = opts['platforms'];
        this.founders = opts['founders'];

        // TODO: Create id for product
      }
      else {
        throw '`opts` object in Product constructor must have defined `name`, `url`, `description`, `platforms` and `founders`';
      }
    }
    else {
      for (var property in firebaseProduct) {
        switch(property) {
          case CONST.FIREBASE_PRODUCT_ID:
            this.id = firebaseProduct[CONST.FIREBASE_PRODUCT_ID];
          break;

          case CONST.FIREBASE_PRODUCT_LOGO_URL:
            this.logoPath = firebaseProduct[CONST.FIREBASE_PRODUCT_LOGO_URL];
          break;

          case CONST.FIREBASE_PRODUCT_NAME:
            this.name = firebaseProduct[CONST.FIREBASE_PRODUCT_NAME];
          break;

          case CONST.FIREBASE_PRODUCT_URL:
            this.url = firebaseProduct[CONST.FIREBASE_PRODUCT_URL];
          break;

          case CONST.FIREBASE_PRODUCT_DESCRIPTION:
            this.description = firebaseProduct[CONST.FIREBASE_PRODUCT_DESCRIPTION];
          break;

          case CONST.FIREBASE_PRODUCT_PLATFORMS:
            this.platforms = [];
            var platformObj = firebaseProduct[CONST.FIREBASE_PRODUCT_PLATFORMS];
            for (var platform in platformObj) {
              this.platforms.push(platformObj[platform]);
            }
            // Sort platforms
            this.platforms.sort(function(a, b) {
              return (a.toLowerCase() > b.toLocaleLowerCase());
            });
          break;

          case CONST.FIREBASE_PRODUCT_FOUNDERS:
            this.founders = [];
            var foundersObj = firebaseProduct[CONST.FIREBASE_PRODUCT_FOUNDERS];
            for (var founder in foundersObj) {
              this.founders.push(foundersObj[founder]);
            }
            // Sort founders
            this.founders.sort(function(a, b) {
              return (a.toLowerCase() > b.toLocaleLowerCase());
            });
          break;

          case CONST.FIREBASE_PRODUCT_API:
            this.api = firebaseProduct[CONST.FIREBASE_PRODUCT_API];
          break;

          case CONST.FIREBASE_PRODUCT_FOUNDERS_TWITTER:
            var twitterObj = firebaseProduct[CONST.FIREBASE_PRODUCT_FOUNDERS_TWITTER];
            this.foundersTwitter = twitterObj;
          break;

          // TODO: Constants?
          /* Technology tree in database
            * technology
            * \
            *  |
            *   website (=== `platform`) ----------- 1st level
            *   \
            *    |
            *    frontend (=== `techType`) -------- 2nd level
            *     \
            *     |
            *     JavaScript (=== `technology`) -- 3rd level
            *     |
            *     backend
                  ...
            *  |
            *  ios
            *  \
            *   |
            *   codedIn
            *   \
            *    |
            *    Swift
            *  |
            *  ...
          */
          case CONST.FIREBASE_PRODUCT_TECHNOLOGY:
            this['productTech'] = [];
            var techObj = firebaseProduct[CONST.FIREBASE_PRODUCT_TECHNOLOGY];
            for (var platform in techObj) {
              // platformObj contains everything from the 1st level
              var platformObj = techObj[platform];

              //this[platform] = platformObj;
              this['productTech'].push(platformObj); // Save array of product tech
            }
          break;

          // Font and color tree in database is same as technology database,
          // except that it has only two levels depth
          case CONST.FIREBASE_PRODUCT_FONTS:
            this['productFonts'] = [];
            var fontsObj = firebaseProduct[CONST.FIREBASE_PRODUCT_FONTS];
            for (var platform in fontsObj) {
              var platformObj = fontsObj[platform];

              this['productFonts'].push(platformObj);
            }
          break;

          case CONST.FIREBASE_PRODUCT_COLORS:
            this['productColors'] = [];
            var colorsObj = firebaseProduct[CONST.FIREBASE_PRODUCT_COLORS];
            for (var platform in colorsObj) {
              var platformObj = colorsObj[platform];

              this['productColors'].push(platformObj);
            }
          break;
        }
      }
    }
  }



  // Since every property in static card is required by object constructor
  // we don't need to check whether those properties are defined

  // Returns HTML of static card
  getStaticCardFromProduct(cardNumber) {
    //var cardID = this.name.toLocaleLowerCase().replace(/ /g, '-');
    var cardID = this.id;
    var staticCardHTML = '<div id=\"' + cardID + '\" class=\"card\">';
    staticCardHTML += '<div class=\"card-block\">';

    // Add name //
    staticCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_NAME + '\">' +
                        '<div class=\"row\">' +
                          '<b>' + this.name + '</b>' +
                        '</div>' +
                      '</div>';

    // add website URL //
    staticCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_URL + '\">' +
                        '<div class=\"row\">' +
                          '<a target="_blank" href=\"' + this.url + '\">' + this.url + '</a>' +
                        '</div>' +
                      '</div>';

    // Add description //
    staticCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_DESCRIPTION + '\">' +
                        '<div class=\"row\">' +
                          this.description +
                        '</div>' +
                      '</div>';

    // Add platforms //
    staticCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_PLATFORMS + '\">' +
                        '<div class=\"row\">' +
                          '<b>' + CONST.DIV_TEXT_PRODUCT_PLATFORMS + '</b>';
    for (var i = 0; i < this.platforms.length; i++) {
      var platform = this.platforms[i];
      var platformColor = CONST.PLATFORM_TAG_COLORS[platform.toLowerCase()];
      staticCardHTML += '<span class=\"' + CONST.DIV_CLASS_TAG + ' ' + CONST.DIV_CLASS_TAG_STATIC + '\" style=\"background-color:' + platformColor + '\">' + platform + '</span>';
    }
    staticCardHTML += '</div></div>' // Close DIV_CLASS_PRODUCT_PLATFORMS and row

    // Add founders //
    // TODO: Add twitter of founders
    staticCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER + '\">' +
                        '<div class=\"row\">' +
                          '<b>' + CONST.DIV_TEXT_PRODUCT_FOUNDERS + '</b>' +
                          '<div class=\"' + CONST.DIV_CLASS_PRODUCT_FOUNDERS + '\">';
    for (var i = 0; i < this.founders.length; i++) {
      var founder = this.founders[i];
      staticCardHTML += '<span class=\"' + CONST.DIV_CLASS_TAG + ' ' + CONST.DIV_CLASS_TAG_STATIC + '\" style=\"background-color:' + CONST.FOUNDER_TAG_COLOR + '\">' +
                          founder +
                        '</span>';
    }
    staticCardHTML += '</div></div></div>'; // Close DIV_CLASS_PRODUCT_FOUNDERS, row and DIV_CLASS_PRODUCT_FOUNDERS_NAMES_WRAPPER

    staticCardHTML += '</div>'; // Close card-block

    // Add bottom button //
    staticCardHTML += '<div class=\"card-footer ' + CONST.DIV_CLASS_BOTTOM_BUTTON_WRAPPER + '\">' +
                        '<a href=\"#\" data-toggle=\"modal\" data-target=\"#card' + cardNumber + '\" class=\"btn btn-info btn-block ' + CONST.DIV_CLASS_BOTTOM_BUTTON + '\">' +
                          CONST.BOTTOM_BUTTON_TEXT +
                        '</a>' +
                      '</div>';



    staticCardHTML += '</div>'; // Close card
    return staticCardHTML;
  }

  // Returns HTML of modal card
  getModalCardFromProduct(cardNumber) {
    var modalCardHTML = '<div id=\"card' + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">' +
                          '<div class=\"modal-dialog modal-md\">' +
                            '<div class=\"modal-content\">' +
                              '<div class=\"modal-header\">' +
                                '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times; </button>';
    var logoClass = this.name.toLowerCase().replace(/ /g, '-') + '-modal';
    modalCardHTML += '<div class=\"media ' + logoClass + '\"></div>';
    modalCardHTML += '</div>'; // Close modal-header

    modalCardHTML += '<div class=\"modal-body\">';

    // Add name //
    modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_NAME_MODAL + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + this.name + '</b>' +
                      '</div>' +
                    '</div>';

    // Add website URL //
    modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_URL_MODAL + '\">' +
                      '<div class=\"row\">' +
                        '<a target="_blank" href=\"' + this.url + '\">' + this.url + '</a>' +
                      '</div>' +
                    '</div>';

    // Add description //
    modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_DESCRIPTION_MODAL + '\">' +
                      '<div class=\"row\">' +
                        this.description +
                      '</div>' +
                    '</div>';

    // Add platforms //
    modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_PLATFORMS_MODAL + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + CONST.DIV_TEXT_PRODUCT_PLATFORMS_MODAL + '</b>';
    for (var i = 0; i < this.platforms.length; i++) {
      var platform = this.platforms[i];
      var platformColor = CONST.PLATFORM_TAG_COLORS[platform.toLowerCase()];
      modalCardHTML += '<span class=\"' + CONST.DIV_CLASS_TAG + ' ' + CONST.DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + platformColor + '\">' + platform + '</span>';
    }
    modalCardHTML += '</div></div>'; // Close DIV_CLASS_PRODUCT_PLATFORMS_MODAL and row

    // Add founders //
    // TODO: Add twitter of founders
    modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_FOUNDERS_WRAPPER_MODAL + '\">' +
                      '<div class=\"row\">' +
                        '<b>' + CONST.DIV_TEXT_PRODUCT_FOUNDERS_MODAL + '</b>' +
                      '</div>' +
                      '<div class=\"' + CONST.DIV_CLASS_PRODUCT_FOUNDERS_NAMES_MODAL + '\">';
    for (var i = 0; i < this.founders.length; i++) {
      var founder = this.founders[i];
      modalCardHTML += '<div class=\"row\">';
      modalCardHTML += '<span class=\"' + CONST.DIV_CLASS_TAG + ' ' + CONST.DIV_CLASS_TAG_MODAL + '\" style=\"background-color:' + CONST.FOUNDER_TAG_COLOR + '\">' +
                          founder +
                        '</span>';
      modalCardHTML += '</div>' // Close row
    }
    modalCardHTML += '</div>'; // Close DIV_CLASS_PRODUCT_FOUNDERS_NAMES_MODAL
    modalCardHTML += '</div>'; // Close DIV_CLASS_PRODUCT_FOUNDERS_WRAPPER_MODAL


    // TODO: Constants
    // Now we have to check whether product has certain properties

    // Add API //
    /* TODO:
    * Or should I write
    *   if (object.propertyName === undefined) { } <--- use this
    * http://stackoverflow.com/questions/27509/detecting-an-undefined-object-property
    */
    if (this.api !== undefined && this.api !== '') {
      modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_API_MODAL + '\">' +
                        '<div class=\"row\">' +
                          '<b>' + CONST.DIV_TEXT_PRODUCT_API_MODAL + '</b>' + '<a target="_blank" href=\"' + this.api + '\">' + this.api + '</a>' +
                        '</div>' +
                      '</div>';
    }

    // Add technologies //
    if (this.productTech !== undefined && this.productTech !== []) {
      modalCardHTML += getTechnologyDelimiter();

      modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_TECHNOLOGY_WRAPPER_MODAL + '\">';
      for (var i = 0; i < this.productTech.length; i++) {
        var platformObj = this.productTech[i];

        var techHTML = parsePlatformTechnology(platformObj);

        modalCardHTML += techHTML;
      }
      modalCardHTML += '</div>'; // Close DIV_CLASS_PRODUCT_TECHNOLOGY_WRAPPER_MODAL
    }


    // Add design - colors and fonts //
    if ( (this.productFonts !== undefined && this.productFonts !== []) ||
         (this.productColors !== undefined && this.productColors !== []) ) {
      modalCardHTML += getDesignDelimiter();

      // Add fonts
      if (this.productFonts !== undefined && this.productFonts !== []) {
        modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_FONTS_WRAPPER_MODAL + '\">';

        for (var i = 0; i < this.productFonts.length; i++) {
          var platformObj = this.productFonts[i];

          var fontsHTML = parsePlatformFonts(platformObj);

          modalCardHTML += fontsHTML;
        }

        modalCardHTML += '</div>'; // Close DIV_CLASS_PRODUCT_FONTS_WRAPPER_MODAL
      }

      // Add colors
      if (this.productColors !== undefined && this.productColors !== []) {
        modalCardHTML += '<div class=\"' + CONST.DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL + '\">';

        for (var i = 0; i < this.productColors.length; i++) {
          var platformObj = this.productColors[i];

          var colorsHTML = parsePlatformColors(platformObj);

          modalCardHTML += colorsHTML;
        }

        modalCardHTML += '</div>'; // Close DIV_CLASS_PRODUCT_COLORS_WRAPPER_MODAL
      }
    }


    modalCardHTML += '</div>';  // Close modal-body
    modalCardHTML += '</div></div></div>'; // Close modal-content, modal-dialog and modal

    return modalCardHTML;
  }

  getProductLogoURL(product, callback) {
    var fTools = new FirebaseTools(CONST.CONFIG);

    if (this.logoPath !== undefined && this.logoPath !== '') {
      fTools.storage.ref().child(this.logoPath).getDownloadURL().then(function(url) {
        callback(product, url);
      })
      .catch(function(error) {
        throw('Error while trying to get product logo from storage: ' + error);
      });
    }
    else {
      throw('Product does not have any logo in storage');
    }
  }
}