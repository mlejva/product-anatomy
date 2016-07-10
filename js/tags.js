// TODO: Instead of deleting all elements it should move elements to next row according to max in row
var resizeGlobalTags = function() {
  $('div.' + DIV_CLASS_TAG_WRAPPER).empty();
  var maxInRow = 0;
  var offset = 0;
  // TODO: Should be constants
  if ($(window).width() > 1200) {
    maxInRow = 8;
    offset = 2;
  }
  else if ($(window).width() > 990) {
    maxInRow = 6;
    offset = 3;
  }
  else if ($(window).width() > 765) {
    maxInRow = 4;
    offset = 4;
  }
  else {
    maxInRow = 2;
    offset = 5;
  }

  // Add tags under searchbar
  var global_tags_html = '<div class=\"row\">';
  global_tags_html += '<div class=\"col-lg-' + maxInRow + ' col-lg-offset-' + offset + '\">';
  global_tags_html += '<div class=\"' + DIV_CLASS_TAG_ROW + '\">';
  var in_current_row = 0;
  for (var i = 0; i < GLOBAL_TAGS.length; i++) {
    if (in_current_row < maxInRow) {
      in_current_row++;
    }
    else {
      in_current_row = 0;
      global_tags_html += '</div> </div> </div>';
      global_tags_html += '<div class=\"row\">';
      global_tags_html += '<div class=\"col-lg-' + maxInRow + ' col-lg-offset-' + offset + '\">';
      global_tags_html += '<div class=\"' + DIV_CLASS_TAG_ROW + '\">';
      in_current_row++;
    }
    var tag_name = GLOBAL_TAGS[i];
    var tag_color;
    if (isInArray(tag_name.toLocaleLowerCase(), platforms)) {
        tag_color = PLATFORM_TAG_COLORS[tag_name.toLocaleLowerCase()];
    }
    else {
      tag_color = randomColorFromString(tag_name, TAG_COLORS);
    }
    global_tags_html += '<span class=\"' + DIV_CLASS_TAG + ' ' + DIV_CLASS_TAG_GLOBAL + '\" style=\"background-color:' + tag_color + '\">' + tag_name + '</span>';
  }
  global_tags_html += '</div> </div>';
  //$('div.tag-wrapper').children('.row').append(global_tags_html);

  $('div.' + DIV_CLASS_TAG_WRAPPER).append(global_tags_html);
  tag_search();
}
