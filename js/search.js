/* ----- Functions for search ----- */
function displaySearchHitCount(hitCount, query) {
  $('#' + CONST.SEARCH_RESULTS_ID).empty();
  $('#' + CONST.ANNOUNCEMENT_ID).empty();
  var resultsText = '';
  if (hitCount == 0) {
    resultsText = '';
    $('#' + CONST.ANNOUNCEMENT_ID).append(CONST.NOTHING_FOUND_TEXT);
  }
  else if (hitCount == 1) {
    resultsText = CONST.SEARCH_RESULT_TEXT_SINGULAR.replace(CONST.SEARCH_RESULT_TEXT_QUERY_REPLACE, query);
  }
  else {
    resultsText = CONST.SEARCH_RESULT_TEXT_PLURAL.replace(CONST.SEARCH_RESULT_TEXT_COUNT_REPLACE, hitCount).replace(CONST.SEARCH_RESULT_TEXT_QUERY_REPLACE, query);
  }
  $('#' + CONST.SEARCH_RESULTS_ID).append(resultsText);
}
function presentProductsFromSearch(algoliaProducts) {
  $('div.card-columns').empty();
  $('.modal').remove(); // Remove all modal cards

  for (var i = 0; i < algoliaProducts.length; i++) {
    var product = new Product(algoliaProducts[i], {});
    addProductCards(product, i);
  }
}
function searchInDatabaseAndPresentHits(searchQuery) {
  index.search(searchQuery, function searchDone(err, content) {
    if (err) {
      // TODO: Error handling
      console.log(err.message);
      console.log(err.debugData);
      return;
    }
    else {
      presentProductsFromSearch(content.hits);
      displaySearchHitCount(content.hits.length, searchQuery);
    }
  });
}
function enableTagSearch(tags) {
  for (var i = 0; i < tags.length; i++) (function (tag) {
    tag.addEventListener('click', function(e) {

      if ($(this).hasClass('tag-modal')) {
        var thisModal = $(this).closest('.modal');
          thisModal.modal('hide');
      }

      // TODO: When modal card closes and page scrolls to "search-scroll", the page returns to the modal static card
      // TODO: Scroll is slower than search - user can't see the change in results
      //window.scrollTo(0, 0); // Primitive scroll to the top of the page
      document.getElementById(CONST.SEARCH_WINDOW).scrollIntoView(); // TODO: constant id="search-scroll"
      document.getElementById(CONST.SEARCHBOX_ID).value = tag.textContent;

      searchInDatabaseAndPresentHits(tag.textContent);
    })
  })(tags[i]);
}
/* ---------- */
