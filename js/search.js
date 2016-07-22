// TODO: Search in database instead of local search at user
var search = function() {
  var products_modal = document.getElementsByClassName('modal'); // We want to search in modal cards
  var products_static = document.getElementsByClassName('card'); // But we want to hide static card
  var query = document.getElementById(CONST.SEARCHBOX_ID).value;
  var match = new Function;

  if (!query.length) {
    match = function() { return true; }
  }
  else {
    match = function (product) {
      // We want to match products that are an intersection of words of query
      var wordsFromQuery = query.split(' ');
      for (var i = 0; i < wordsFromQuery.length; i++) {
        var word = wordsFromQuery[i].toLowerCase();
        if ( (product.textContent.toLowerCase().indexOf(word) < 0) ) {
          return false;
        }
      }
      return true;
    }
  }

  var resultsCount = 0;
  for (var i = 0; i < products_modal.length; i++) {
    if (match(products_modal[i])) {
      resultsCount++;
      products_static[i].style.display = '';
    }
    else {
      products_static[i].style.display = 'none';
    }
  }

  // Show how many results was found
  // TODO: Text search results constants
  $('div.' + CONST.DIV_CLASS_SEARCH_RESULTS).empty();
  $('div.' + CONST.DIV_CLASS_NOTHING_FOUND).empty();
  var resultsText = '';
  if (resultsCount == 0) {
    resultsText = '';
    $('div.' + CONST.DIV_CLASS_NOTHING_FOUND).append(CONST.NOTHING_FOUND_TEXT);
  }
  else if (resultsCount == 1) {
    resultsText = CONST.SEARCH_RESULT_TEXT_SINGULAR;
  }
  else {
    resultsText = CONST.SEARCH_RESULT_TEXT_PLURAL.replace(CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE, resultsCount);
  }
  $('div.' + CONST.DIV_CLASS_SEARCH_RESULTS).append(resultsText);
}
/* ---------- */



/* ----- Search using tags ----- */
var enableTagSearch = function(tags) {
  for (var i = 0; i < tags.length; i++) (function (tag) {
    tag.addEventListener('click', function(e) {

      if ($(this).hasClass('tag-modal')) {
        var thisModal = $(this).closest('.modal');
          thisModal.modal('hide');
      }

      // TODO: When modal card closes and page scrolls to "search-scroll", the page returns to the modal static card
      // TODO: Scroll is slower than search - user can't see the change in results
      //window.scrollTo(0, 0); // Primitive scroll to the top of the page
      document.getElementById("search-scroll").scrollIntoView(); // TODO: constant id="search-scroll"
      document.getElementById(CONST.SEARCHBOX_ID).value = tag.textContent;


      search();
    })
  })(tags[i]);
}
/* ---------- */
