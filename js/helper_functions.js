// TODO: Make my own random color function
// TODO: Get rid of helpet_functions.js
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

var isInArray = function(value, array) {
  return array.indexOf(value) > -1;
};

var presentErrorPage = function() {
  $('#' + CONST.SEARCH_RESULTS_ID).empty();
  $('div.' + CONST.DIV_CLASS_CONTENT).empty();
  $('#' + CONST.ANNOUNCEMENT_ID).empty();
  $('#' + CONST.ANNOUNCEMENT_ID).append(CONST.ERROR_MSG);
};
