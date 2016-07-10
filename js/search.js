// TODO: Search in database instead of local search at user
// TODO: Search more specific than just searching whole text content of product
var search = function() {
  var products_modal = document.getElementsByClassName('modal'); // We want to search in modal cards
  var products_static = document.getElementsByClassName('card'); // But we want to hide static card
  var query = document.getElementById(SEARCHBOX_ID).value;
  var match = new Function;

  if (!query.length) {
    match = function() { return true; }
  }
  else if (query.substr(0, query.indexOf(':')) == ':' ) { // Special search

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
/* ---------- */

/* ----- Search using tags ----- */
var tag_search = function() {
  var tags = document.getElementsByClassName(DIV_CLASS_TAG);
  for (var i = 0; i < tags.length; i++) (function (tag) {
    tag.addEventListener('click', function (e) {
      var tag_classes_list = $(this).attr('class').split(/\s+/);

      if (isInArray(DIV_CLASS_TAG_GLOBAL, tag_classes_list)) // TODO: Move up only on mobile
        window.scrollTo(0, 0);

      tag_pressed = true;
      $(this).closest('.modal').modal('hide');
      document.getElementById(SEARCHBOX_ID).value = tag.textContent;
      search();
    })
  })(tags[i]);
}
/* ---------- */
