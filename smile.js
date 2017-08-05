// "smile".starts("sm")
String.prototype.starts = function(start) {
    return this.toLowerCase().slice(0, start.length) == start.toLowerCase();
}
// "smile {0}".plug(":)")
String.prototype.plug = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
}
// "smile".contains("mile")
String.prototype.contains = function(substring) {
    return this.indexOf(substring) > -1
}

Array.prototype.find = function(condition) {
    var results = []
    for (var i=0; i<this.length; i++) {
        if (condition(this[i]))
            results.push(this[i])
    }
    return results
}
Array.prototype.first = function(condition) {
    for (var i=0; i<this.length; i++) {
        if (condition(this[i]))
            return this[i]
    }
    return null
}

function log(message) { if (console && console.log) console.log(message) }

// query_string("id")
function query_string(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

Number.prototype.round = function(decimals) {
    var m = Math.pow(10, decimals)
    return Math.round(this*m)/m
}

Number.prototype.as_money = function() {
    var c = 2
    var d = '.'
    var t = ','
    var n = this, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
    var v = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return "$" + v
}
