function titleFilter(ur) {
    var extention = {
        ".shtml": "/",
        ".html": "/",
        ".cfm": "/",
        ".cfml": "/",
    };
    var filUrl = ur.replace(/\.shtml|\.html|\.cfm|\.cfml/gi, function (matched) {
        return extention[matched];
    }).replace(/[0-9]*/gi, "").split("/");

    var title = '';

    for(var i = 0; i < filUrl.length; i++) {
        filUrl[i] === "" ? title = filUrl[filUrl.length - 2] : title = filUrl[filUrl.length - 1]
    }

    title = title.split("-");
    var capitalize = [];
    for (var j = 0; j < title.length; j++) {
        capitalize.push(title[j].charAt(0).toUpperCase() + title[j].slice(1));
    }
    return capitalize.join(" ");
}

console.log(titleFilter('https://www.goldberg-law.com/meet-us/support-team'))
console.log(titleFilter('http://plclotx.firmsitepreview.com/blog/2019/03/how-to-use-a-gps-in-the-car-safely.shtml'))
