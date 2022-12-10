
// Cookie.js
// クッキー
// クッキーの取得
function getCookie(key) {
    tmp = document.cookie + ";";
    tmp1 = tmp.indexOf(key, 0);
    if (tmp1 != -1) {
        tmp = tmp.substring(tmp1, tmp.length);
        start = tmp.indexOf("=", 0) + 1;
        end = tmp.indexOf(";", start);
        return (unescape(tmp.substring(start, end)));
    }
    return ("");
}
// クッキーの設定(期間：無限)
function setCookie(key, val) {
    tmp = key + "=" + escape(val) + "; ";
    tmp += "expires=Fri,31-Dec-2030 23:59:59; ";
    document.cookie = tmp;
}
// クッキーの設定(期間：1日)
function setCookie1(key, val) {
    setDay = new Date();
    setDay.setTime(setDay.getTime() + (1000 * 60 * 60 * 24));
    expDay = setDay.toGMTString();
    document.cookie = key + "=" + escape(val) + ";expires=" + expDay;
}

function setCookieShort(key, val) {
    setDay = new Date();
    setDay.setTime(setDay.getTime() + (3000));
    expDay = setDay.toGMTString();
    document.cookie = key + "=" + escape(val) + ";expires=" + expDay;
}

// クッキーの表示
function dispCookie() {
    var i, tmp = "";
    if (document.cookie != "") {
        tmpCookie = document.cookie.split(";");
        //alert( tmpCookie );
        for (i = 0; i < tmpCookie.length; i++) {
            cName = tmpCookie[i].split("=")[0];
            cData = tmpCookie[i].split("=")[1];
            //				alert( cName + " = " + unescape( cData ) );
            tmp += cName + " = " + unescape(cData) + "\r\n";
        }
        alert(tmp);
    }
}
// クッキーの削除
function delCookie() {
    var tmpCookie, expireDate, i, cName;
    if (document.cookie != "") {
        tmpCookie = document.cookie.split(";");
        //alert( tmpCookie.length );
        expireDate = new Date();
        expireDate.setYear(expireDate.getYear() - 1);
        for (i = 0; i < tmpCookie.length; i++) {
            cName = tmpCookie[i].split("=")[0];
            document.cookie = cName + "=;expireDate=" + expireDate.toGMTString();
        }
        alert("Cookieを" + tmpCookie.length + "個削除しました。");
    } else
        alert("クッキーはありません。");
}
//-->