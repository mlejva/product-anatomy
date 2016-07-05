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


  // TODO: Error handling - work with json only if status == 200
  var spreadsheetKey = '1itsXofYV9YOf-VtLO8Gr9goNzaRyCGAOUgFWV1wbK38';
  $.getJSON('https://spreadsheets.google.com/feeds/list/' + spreadsheetKey + '/od6/public/values?alt=json', function(data) {
    var entry = data.feed.entry;

    var cardNumber = 0;
    var rowHTML = '<div class=\"row content\"></div>';
    var cardInfo = '';

    $.each(entry, function(key, val) {
      var jsonObject = JSON.parse(JSON.stringify(val));
      cardNumber++;

      var product = new Product('', '', '', [], [], [], '', '', [], [], [], [], [], [], []);
      // TODO: Should add HTML only once inside each loop so search for specific element is done only once
      // TODO: key strings should be variables
      $.each(jsonObject, function(key, value) {
        // Parse data of next entry into a variable so it can be passed into the new card we are going to create
        if (value.$t !== '') {
          if (key === 'gsx$name' || key === 'gsx$description' || key === 'gsx$launched' || key === 'gsx$font' || key === 'gsx$technology') {
            cardInfo += '<b>' + key.substring(4) + '</b>' + ': ' + value.$t + '<br/>';
          }
          switch (key) {
            case 'gsx$name':
              product.name = value.$t;
              break;
            case 'gsx$url':
              product.url = value.$t;
              break;
            case 'gsx$twitter':
              product.twitter = value.$t;
              break;
            case 'gsx$founders':
              product.founders = value.$t.split('$');
              break;
            case 'gsx$foundersTwitter':
              product.foundersTwitter = value.$t.split('$');
              break;
            case 'gsx$alsoCreated':
              product.alsoCreated = value.$t.split('$');
              break;
            case 'gsx$description':
              product.description = value.$t;
              break;
            case 'gsx$launched':
              product.launched = value.$t;
              break;
            case 'gsx$fonts':
              product.fonts = value.$t.split('$');
              break;
            case 'gsx$colors':
              product.colors = value.$t.split('$');
              break;
            case 'gsx$platforms':
              product.platforms = value.$t.split('$');
              break;
            case 'gsx$technologyIOS':
              product.technologyIOS = value.$t.split('$');
              break;
            case 'gsx$technologyAndroid':
              product.technologyAndroid = value.$t.split('$');
              break;
            case 'gsx$technologyWindows':
              product.technologyWindows = value.$t.split('$');
              break;
            case 'gsx$technologyWebsite':
              product.technologyWebsite = value.$t.split('$');
              break;
          }
        }
      }); // $.each END(jsonObject,…)

      var cardHTML = '<div data-toggle=\"modal\" data-target=\"#card' + cardNumber + '\" class=\"col-lg-4\">' +
                      '<div class=\"card\">' +
                        '<img class=\"card-img-top\" src=\"https://brandfolder.com/slack/logo/slack-primary-logo.png\" alt=\"\" style=\"width:105px; height:30px; margin-top:20px; margin-left:20px;\">' +
                        '<div class=\"card-block\">';
      /*if (product.name.length != 0) {
        cardHTML += '<div class=\"product-logo\">' +
                      '<div class=\"row\">' +
                        product.name +
                      '</div>' +
                    '</div>';
      }*/
      if (product.description.length != 0) {
        cardHTML += '<div class=\"product-description\">' +
                      '<div class=\"row\">' +
                          product.description +
                      '</div>' +
                    '</div>';
      }
      if (product.platforms.length != 0) {
        var platformsPrintable = product.platforms.join(', ');
        cardHTML += '<div class=\"product-font\">' +
                      '<div class=\"row\">' +
                        '<b>Platforms </b>' + platformsPrintable +
                      '</div>' +
                    '</div>';
      }
      if (product.fonts.length != 0) {
        var fontsPrintable = product.fonts.join(', ');
        cardHTML += '<div class=\"product-font\">' +
                      '<div class=\"row\">' +
                        '<b>Font </b>' + fontsPrintable +
                      '</div>' +
                    '</div>';
      }
      // Add div for colors
      cardHTML += '<div class=\"product-colors\">' +
                  '</div>';
      // Close divs
      cardHTML += '</div></div></div>';

      var cardModalHTML = '<div id=\"card' + cardNumber + '\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">' +
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
                                '<div class=\"product-color\" style=\"background-color:#' + product.colors[i] + '\">' +
                                  '<div class=\"product-color-text\">' +
                                    product.colors[i].toUpperCase() +
                                  '</div>' +
                                '</div>' +

                              '</div>';
                              //'<div class=\"col-xs-2\">' +
                                //'<div class=\"product-color-text\">' +
                                  //product.colors[i].toUpperCase() +
                                //'</div>' +
                              //'</div>';
      }
      productColorsHTML += '</div>'; // Close the last row (may not be full)
      $('div.product-colors').last().append(productColorsHTML);
      $('div.content').last().append(cardModalHTML);
      cardInfo = ''; // Clear card data for next product
    }); // $.each(data,…) END

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
  }); // $.getJSON END

  /* ----- Search ----- */
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
}); // page load END
