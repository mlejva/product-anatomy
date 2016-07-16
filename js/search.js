// TODO: Search in database instead of local search at user
var search = function() {
  var products_modal = document.getElementsByClassName('modal'); // We want to search in modal cards
  var products_static = document.getElementsByClassName('card'); // But we want to hide static card
  var query = document.getElementById(SEARCHBOX_ID).value;
  console.log(query);
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

  for (var i = 0; i < products_modal.length; i++) {
    if (match(products_modal[i]))
      products_static[i].style.display = '';
    else
      products_static[i].style.display = 'none';
  }
}
/* ---------- */

/* ----- Search using tags ----- */
var enableTagSearch = function(tags) {
  for (var i = 0; i < tags.length; i++) (function (tag) {
    tag.addEventListener('click', function (e) {
      var classes = $(this).attr('class').split(/\s+/);

      console.log(classes);
      $(this).closest('.modal').modal('hide');
      document.getElementById(SEARCHBOX_ID).value = tag.textContent;
      search();
    })
  })(tags[i]);
}
/* ---------- */
