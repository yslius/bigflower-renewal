
function lotcheck(i) {
    //alert( "lotcheck1" );
    dataload();
    //alert( "lotcheck2" );
    if (kv[i] != "") {
        if (kv[i] < kl[i] || (kv[i] % kl[i]) != 0) {
            alert(kh[i] + "がロットの倍数になっていません｡");
            return false;
        }
    }
    return true;
}

function gazou(hana, syasin, type) {
    var type12;
    var dummy;

    if (type == 1)
        type12 = "<BR><FONT COLOR=red size=+1>速報参考画像";
    else
        type12 = "<BR><FONT COLOR=blue size=+1>イメージ画像";

    document.write("<BODY BGCOLOR=#ffffff TEXT=#000000><DIV ALIGN=CENTER><BR><H1>" + hana + type12 + "</FONT></H1><BR><HR>");
    document.write("<TABLE COLS=4><TR><TD><DIV ALIGN=CENTER>");

    if (type == 1) {
        document.write('<A HREF="' + "../images/today/" + syasin + '"><IMG SRC="' + "../images/today/" + syasin + '" WIDTH=200 HEIGHT=150 BORDER=0><BR></A></DIV></TD></TR></TABLE></DIV>');
    } else {
        document.write('<A HREF="' + "../images/kiri/" + syasin + '"><IMG SRC="' + "../images/kiri/" + syasin + '" WIDTH=200 HEIGHT=150 BORDER=0><BR></A></DIV></TD></TR></TABLE></DIV>');
    }
    document.write('<HR><CENTER>仕入担当から本日の入荷情報があります。<A HREF=buyer/buyer03.htm>入荷情報へ<BR><BR><A HREF="JavaScript:history.go(-1)">戻る</A></CENTER>');
}

function validation() {
    var day, hour, minute;
    var i;
    var kingakuk = 0;
    var kingakuh = 0;
    var ktv;
    var kkv = "";
    var data = "\n";
    var data1 = "<BR>";
    var flag;
    var hinmei, hinmoku, hinmei1, hinmoku1;
    var name, tel, mailaddr, tname, tzip, taddr, ttel, id;

    // クッキーのセット
    name = document.forms[0].Name.value;
    if (name != "") setCookie("Name", name);
    id = document.forms[0].Id.value;
    if (id != "") setCookie("Id", id);
    mailaddr = document.forms[0].email.value;
    if (mailaddr != "") setCookie("Email", mailaddr);
    //届け先項目　2017/9/23追加
    tname = document.forms[0].todoName.value;
    if (tname != "") setCookie("TName", tname);
    tzip = document.forms[0].todoZip.value;
    if (tzip != "") setCookie("TZip", tzip);
    taddr = document.forms[0].todoAddr.value;
    if (taddr != "") setCookie("TAddr", taddr);
    ttel = document.forms[0].todoPhone.value;
    if (ttel != "") setCookie("TTel", ttel);

    dataload();
    Now = new Date(); // 現在日時
    day = Now.getDate();
    hour = Now.getHours();
    minute = Now.getMinutes();
    if (day == ydd) // 締め切り日時のチェック(翌日の場合)
    {
        if (hour >= 12) // １４時００分を過ぎたかをチェック
        {
            alert(" \n締め切り時間を過ぎました｡; ");
            return false;
        }
    } else {
        if (day != tdd) // 当日以外の場合
        {
            alert("\n締め切り日時を過ぎました。; ");
            return false;
        }
    }
    // 必須入力チェック
    if (document.forms[0].Name.value == "") {
        alert(" \n氏名を入力してください; ");
        document.forms[0].Name.focus();
        return false;
    }
    if (document.forms[0].Id.value == "") {
        alert(" \nIDを入力してください; ");
        document.forms[0].Id.focus();
        return false;
    }
    if (document.forms[0].Password.value == "") {
        alert(" \nパスワードを入力してください; ");
        document.forms[0].Password.focus();
        return false;
    }
    if (document.forms[0].Password.value.length != 4) {
        alert(" \nパスワードが違います; ");
        document.forms[0].Password.focus();
        return false;
    }
    //メールアドレスチェック　2022/02/20追加
    if (document.forms[0].email.value == "") {
        alert(" \nメールアドレスを入力してください; ");
        document.forms[0].email.focus();
        return false;
    }
    //メールアドレスチェック　2022/02/20追加
    if (!document.forms[0].email.value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/)) {
        alert(" \nメールアドレスを正しく入力してください; ");
        document.forms[0].email.focus();
        return false;
    }
    //お届け先氏名入力チェック　2011/4/3追加
    if (document.forms[0].todoName.value == "") {
        alert(" \nお届け先氏名を入力してください; ");
        document.forms[0].todoName.focus();
        return false;
    }
    //お届け先郵便番号入力チェック　2017/9/23追加
    if (document.forms[0].todoZip.value == "") {
        alert(" \nお届け先郵便番号を入力してください; ");
        document.forms[0].todoZip.focus();
        return false;
    }
    //お届け先住所入力チェック　2011/4/3追加
    if (document.forms[0].todoAddr.value == "") {
        alert(" \nお届け先住所を入力してください; ");
        document.forms[0].todoAddr.focus();
        return false;
    }
    //お届け先Tel入力チェック　2011/4/3追加
    if (document.forms[0].todoPhone.value == "") {
        alert(" \nお届け先Telを入力してください; ");
        document.forms[0].todoPhone.focus();
        return false;
    }

    data += "お名前:" + document.forms[0].Name.value + "\n";
    data1 += "お名前:" + document.forms[0].Name.value + "<BR>";
    data += "ID:" + document.forms[0].Id.value + "\n";
    data1 += "ID:" + document.forms[0].Id.value + "<BR>";
    data += "Password:" + document.forms[0].Password.value + "\n";
    data1 += "Password:" + document.forms[0].Password.value + "<BR>";
    data += "メールアドレス:" + document.forms[0].email.value + "\n";
    data1 += "メールアドレス:" + document.forms[0].email.value + "<BR>";

    //お届け先データ追加	2017/09/23
    data += "お届け先氏名：" + document.forms[0].todoName.value + "\n";
    data1 += "お届け先氏名：" + document.forms[0].todoName.value + "<BR>";
    data += "お届け先郵便番号：" + document.forms[0].todoZip.value + "\n";
    data1 += "お届け先郵便番号：" + document.forms[0].todoZip.value + "<BR>";
    data += "お届け先住所：" + document.forms[0].todoAddr.value + "\n";
    data1 += "お届け先住所：" + document.forms[0].todoAddr.value + "<BR>";
    data += "お届け先Tel：" + document.forms[0].todoPhone.value + "\n";
    data1 += "お届け先Tel：" + document.forms[0].todoPhone.value + "<BR>";

    data += "コメント:" + document.forms[0].comment.value + "\n\n";
    data1 += "コメント:" + document.forms[0].comment.value + "<BR><BR>";
    data += "注文:\n";
    data1 += "注文:<BR>";
    for (i = 1; i <= kno; i++) {
        hinmei = kh[i];
        if (hinmei.indexOf("〃") >= 0) hinmei = hinmei1;
        hinmei1 = hinmei;
        hinmoku = km[i];
        if (hinmoku.indexOf("〃") >= 0) hinmoku = hinmoku1;
        hinmoku1 = hinmoku;
        if (kv[i] != "") {
            if (kv[i] < kl[i] || (kv[i] % kl[i]) != 0) {
                alert(kh[i] + "がロットの倍数になっていません");
                return false;
            }



            ktv = Math.round(kt[i] * kv[i]);

            kingakuk = kingakuk + ktv;
            sk = hinmei + " " + hinmoku + " " + kt[i] + " " + kv[i] + " " + ktv;
            data += sk + "\n";
            data1 += sk + "<BR>";
        }
        if (kv[i] == "")
            kv[i] = 0;
        kkv += kv[i] + ",";
    }

    if (kingakuk <= 0) {
        alert("注文がありません。");
        return false;
    }

    data += "\n合計金額は" + Math.round((kingakuk + 1095) * 1.1) + "円です｡ \n";
    data1 += "<BR>合計金額は" + Math.round((kingakuk + 1095) * 1.1) + "円です｡ <BR>";

    data += "\n合計金額は１個口分の送料（１０９５円）が含まれています。\n";
    data += "大量にご購入頂いた場合、配送口数毎に送料が加算されます。\n";
    data1 += "<BR>合計金額は１個口分の送料（１０９５円）が含まれています。<BR>";
    data1 += "大量にご購入頂いた場合、配送口数毎に送料が加算されます。<BR>"

    flag = confirm("このデータでいいですか？\n" + data);
    if (flag == false)
        return false;

    if (sousinflag == true) {
        alert("ご注文処理中です");
        return false;
    } else {
        sousinflag = true;
    }

    document.forms[0].data.value = data1;
    document.forms[0].order.value = kkv;

    return true;
}
// -->