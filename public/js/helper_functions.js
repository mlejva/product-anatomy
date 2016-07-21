// TODO: Make my own random color function
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
