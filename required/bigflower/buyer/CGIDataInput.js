// 
// kaisen
function DataInput() {
    var name, tel, mailaddr, tname, tzip, taddr, ttel, mailaddrk, coupon;
    var recipient, subject;

    name = getCookie("Name");
    tel = getCookie("Tel");
    mailaddr = getCookie("Email");
    tname = getCookie("TName");
    tzip = getCookie("TZip");
    taddr = getCookie("TAddr");
    ttel = getCookie("TTel");
    mailaddrk = getCookie("MailK");

    recipient = kaisen + "kaisen@bigflower.co.jp";
    //件名設定
    if (kaisen == 1)
        subject = "１Ｋａｉｓｅｎ【入荷日前々日～の予約販売：会員制ゴールド通信販売】";
    else if (kaisen == 2)
        subject = "２Ｋａｉｓｅｎ【入荷日当日１回目の販売：会員制ゴールド通信販売】";
    else if (kaisen == 3)
        subject = "３Ｋａｉｓｅｎ【入荷日当日３回目の販売：会員制ゴールド通信販売】";
    else if (kaisen == 4)
        subject = "４Ｋａｉｓｅｎ【入荷日当日２回目の販売：会員制ゴールド通信販売】";
    else if (kaisen == 5)
        subject = "５Ｋａｉｓｅｎ【５回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 6)
        subject = "６Ｋａｉｓｅｎ【入荷日直前予約販売その１：会員制ゴールド通信販売】";
    else if (kaisen == 7)
        subject = "７Ｋａｉｓｅｎ【入荷日直前予約販売その２：会員制ゴールド通信販売】";
    else if (kaisen == 8)
        subject = "８Ｋａｉｓｅｎ【８回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 9)
        subject = "９Ｋａｉｓｅｎ【入荷日直前予約販売その３：会員制ゴールド通信販売】";
    else if (kaisen == 10)
        subject = "１０Ｋａｉｓｅｎ【１０回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 11)
        subject = "１１Ｋａｉｓｅｎ【１１回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 12)
        subject = "１２Ｋａｉｓｅｎ【１２回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 13)
        subject = "１３Ｋａｉｓｅｎ【１３回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 14)
        subject = "１４Ｋａｉｓｅｎ【１４回戦注文：会員制ゴールド通信販売】";
    else if (kaisen == 15)
        subject = "１５Ｋａｉｓｅｎ【店頭受取予約販売①：会員制ゴールド通信販売】";
    else if (kaisen == 16)
        subject = "１６Ｋａｉｓｅｎ【店頭受取予約販売②：会員制ゴールド通信販売】";
    else if (kaisen == 17)
        subject = "１７Ｋａｉｓｅｎ【店頭受取予約販売③：会員制ゴールド通信販売】";
    else if (kaisen == 18)
        subject = "１８Ｋａｉｓｅｎ【店頭受取予約販売④：会員制ゴールド通信販売】";
    else if (kaisen == 25)
        subject = "２５Ｋａｉｓｅｎ【プリザーブドフラワー・他：会員制ゴールド通信販売】";
    else if (kaisen == 26)
        subject = "２６Ｋａｉｓｅｎ【プリザーブドフラワー・他：会員制ゴールド通信販売】";
    else if (kaisen == 27)
        subject = "２７Ｋａｉｓｅｎ【プリザーブドフラワー・他：会員制ゴールド通信販売】";
    else if (kaisen == 28)
        subject = "２８Ｋａｉｓｅｎ【プリザーブドフラワーアウトレット商品：会員制ゴールド通信販売】";
    else if (kaisen == 29)
        subject = "２９Ｋａｉｓｅｎ【プリザーブドフラワー・他：会員制ゴールド通信販売】";
    else if (kaisen == 30)
        subject = "３０Ｋａｉｓｅｎ【プリザーブドフラワー・他：会員制ゴールド通信販売】";

    //    subject = kaisen + " Kaisen Order";

    //alert( "order=" + recipient + ", subject =" + subject );
    document.write('<div class="h-adr">');
    document.write('<form method="POST" action="../buyer/formmailNetZ.cgi" onsubmit="validation()">');
    document.write('<span class="p-country-name" style="display:none;">Japan</span>');
    document.write('<input type=hidden name="recipient" value="' + recipient + '">');
    document.write('<input type=hidden name="subject" value="' + subject + '">');
    document.write('<input type=hidden name="syurui" value="' + kaisen + '">');
    document.write('<input type=hidden name="bangou" value="0">');
    document.write('<input type=hidden name="order" value="">');
    document.write('<input type=hidden name="env_report" value="REMOTE_HOST,HTTP_USER_AGENT">');
    document.write('<input type=hidden name="return_link_url" value="//www.bigflower.co.jp/">');
    document.write('<input type=hidden name="return_link_title" value="ホームページに戻る">');
    document.write('<input type=hidden name="title" value="ご注文ありがとうございました。">');
    document.write('<input type=hidden name="required" value="Name,Phone,email">');
    document.write('<input type=hidden name="print_config" value="subject,Name,Phone,email,mailaddrk,todoName,todoZip,todoAddr,todoPhone,comment,data,code">');
    document.write("<table border=0 cellpadding=7 CELLSPACING=1 width=500><tr>");
    document.write('<td><FONT COLOR=blue SIZE=5>氏　名</td><TD><input name="Name" TYPE="TEXT" SIZE=30 value=' + name + '>　(必須)</FONT></TD></tr>');
    document.write('<tr><td><FONT COLOR=blue SIZE=5>電話番号</td><TD><input name="Phone" TYPE="TEXT" SIZE=30 value=' + tel + '>　(必須・半角)</FONT></TD></tr>');
    document.write('<tr><td><FONT COLOR=blue SIZE=5>メールアドレス</td><TD><input name="email" TYPE="TEXT" SIZE=30 value=' + mailaddr + '>　(必須・半角)</FONT></TD></tr>');
    document.write('<tr><td><FONT COLOR=blue SIZE=5>携帯アドレス</td><TD><input name="mailaddrk" TYPE="TEXT" SIZE=30 value=' + mailaddrk + '></FONT></TD></tr>');
    document.write("</table>");
    document.write("ご注文後、代品・欠品情報など緊急なお知らせがある場合があります。<BR>リアルタイムで情報交換できますので携帯をお持ちのお客様は<BR>是非携帯アドレスをご入力下さい。<BR>尚転送設定をされている場合、携帯アドレスは必要ありません<BR>");
    document.write("<FONT COLOR=magenta SIZE=4>ご注意：メールアドレスを間違えると返信メールを送れません。<BR></FONT>");
    document.write("<FONT COLOR=magenta SIZE=4>お願い：お届け先住所には都道府県名も正確にご記入ください。<BR></FONT>");
    //	document.write( "<BR>次の項目はお届け先住所が登録してある住所と同じ場合は必要ありません。<BR><BR>" );	2011/4/3 届け先項目を必須入力に変更
    document.write("<BR>確認のためにお届け先住所は、都道府県名も含めて必ずご記入ください。<BR><BR>");
    document.write("<table border=1 cellpadding=0 width=500><tr>");
    document.write('<td>お届け先氏名</td><TD><input name="todoName" type="TEXT" SIZE=50 value=' + tname + '>(必須)</TD></tr>');
    document.write('<td>お届け先郵便番号</td><TD><input type="text" class="p-postal-code" name="todoZip" SIZE=50 value=' + tzip + ' >(必須・半角)</TD></tr>');
    document.write('<td>お届け先住所</td><TD><textarea class="p-region p-locality p-street-address p-extended-address" name="todoAddr" rows=3 cols=35>' + taddr + '</textarea>(都道府県名も必須)</TD></tr>');
    document.write('<td>お届け先Tel</td><TD><input name="todoPhone" type="TEXT" SIZE=50 value=' + ttel + '>(必須・半角)</TD></tr>');
    document.write("</table><BR>");
    document.write('<FONT SIZE=4 COLOR=blue> コメントをどうぞ　<textarea name="comment" rows=5 cols=50></textarea>');
    document.write("<BR></FONT>");
    document.write('<P ALIGN="center">');
    document.write('<input type="hidden" name="data">');
    document.write('<SPAN ID="new1" STYLE="color:#FF0000"><BLINK>' + word + '</BLINK></SPAN><BR>');
    if (UseFlagT[kaisen] == 1)
        document.write('　割引クーポンコード入力不要・税込み７０００円以上で送料半額（半角）：<INPUT NAME="code" TYPE="text" SIZE="9" MAXLENGTH="8" value=""><BR>');
    document.write("<FONT COLOR=magenta SIZE=4>送料が変わりました。ご確認ください。クーポンコード休止中です。<BR></FONT>");
    document.write('<A href="coupon.htm" target="_blank">割引クーポンコードについて</A>');
    document.write('<hr><center>');
    document.write('<input type="SUBMIT" value="注文" onClick="return validation()">　　');
    document.write('<input type="RESET" value="リセット">');
    document.write("</center>");
    document.write("</form>");
    document.write('</div>');
}
// -->

var t = [],
    YubinBango;
! function(YubinBango) {
    var n = function() {
        function n(t, n) {
            if (void 0 === t && (t = ""), this.URL = "https://yubinbango.github.io/yubinbango-data/data", this.g = [null, "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"], t) {
                var e = t.replace(/[０-９]/g, function(t) { return String.fromCharCode(t.charCodeAt(0) - 65248) }),
                    r = e.match(/\d/g),
                    o = r.join(""),
                    i = this.h(o);
                i ? this.i(i, n) : n(this.j())
            }
        }
        return n.prototype.h = function(t) { if (7 === t.length) return t }, n.prototype.j = function(t, n, e, r, o) { return void 0 === t && (t = ""), void 0 === n && (n = ""), void 0 === e && (e = ""), void 0 === r && (r = ""), void 0 === o && (o = ""), { k: t, region: n, l: e, m: r, o: o } }, n.prototype.p = function(t) { return t && t[0] && t[1] ? this.j(t[0], this.g[t[0]], t[1], t[2], t[3]) : this.j() }, n.prototype.q = function(t, n) {
            window.$yubin = function(t) { return n(t) };
            var e = document.createElement("script");
            e.setAttribute("type", "text/javascript"), e.setAttribute("charset", "UTF-8"), e.setAttribute("src", t), document.head.appendChild(e)
        }, n.prototype.i = function(n, e) {
            var r = this,
                o = n.substr(0, 3);
            return o in t && n in t[o] ? e(this.p(t[o][n])) : void this.q(this.URL + "/" + o + ".js", function(i) { return t[o] = i, e(r.p(i[n])) })
        }, n
    }();
    YubinBango.Core = n
}(YubinBango || (YubinBango = {}));
var n = ["Japan", "JP", "JPN", "JAPAN"],
    e = ["p-region-id", "p-region", "p-locality", "p-street-address", "p-extended-address"],
    YubinBango;
! function(YubinBango) {
    var t = function() {
        function t() { this.s() }
        return t.prototype.s = function() {
            var n = this,
                e = document.querySelectorAll(".h-adr");
            [].map.call(e, function(e) {
                if (n.t(e)) {
                    var r = e.querySelectorAll(".p-postal-code");
                    r[r.length - 1].addEventListener("keyup", function(e) { t.prototype.u(n.v(e.target.parentNode)) }, !1)
                }
            })
        }, t.prototype.v = function(t) { return "FORM" === t.tagName || t.classList.contains("h-adr") ? t : this.v(t.parentNode) }, t.prototype.t = function(t) {
            var e = t.querySelector(".p-country-name"),
                r = [e.innerHTML, e.value];
            return r.some(function(t) { return n.indexOf(t) >= 0 })
        }, t.prototype.u = function(t) {
            var n = this,
                e = t.querySelectorAll(".p-postal-code");
            new YubinBango.Core(this.A(e), function(e) { return n.B(t, e) })
        }, t.prototype.A = function(t) { return [].map.call(t, function(t) { return t.value }).reduce(function(t, n) { return t + n }) }, t.prototype.B = function(t, n) {
            var r = [this.C, this.D];
            r.map(function(r) { return e.map(function(e) { return r(e, t, n) }) })
        }, t.prototype.C = function(t, n, e) {
            if (e) {
                var r = n.querySelectorAll("." + t);
                [].map.call(r, function(t) { return t.value = "" })
            }
        }, t.prototype.D = function(t, n, e) {
            var r = { "p-region-id": e.k, "p-region": e.region, "p-locality": e.l, "p-street-address": e.m, "p-extended-address": e.o },
                o = n.querySelectorAll("." + t);
            [].map.call(o, function(n) { return n.value += r[t] ? r[t] : "" })
        }, t
    }();
    YubinBango.MicroformatDom = t
}(YubinBango || (YubinBango = {})), document.addEventListener("DOMContentLoaded", function() { new YubinBango.MicroformatDom }, !1);