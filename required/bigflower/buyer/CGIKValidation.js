
// lotcheck, gazou, dataload, validation
// １５～１８回戦店頭受け取り用

// ロットのチェック
function lotcheck(i) {
    dataload();
    if (kv[i] != "") {
        if (kv[i] < kl[i] || (kv[i] % kl[i]) != 0) {
            alert(kh[i] + "がロットの倍数になっていません｡");
            return false;
        }
    }
    return true;
}

// 画像の表示
function gazou(hana, syasin, type) {
    var type12;
    if (type == 1)
        type12 = "<BR><FONT COLOR=red size=+1>速報実物画像";
    else
        type12 = "<BR><FONT COLOR=blue size=+1>イメージ画像";
    document.write("<BODY BGCOLOR=#ffffff TEXT=#000000><DIV ALIGN=CENTER><BR><H1>" + hana + type12 + "</FONT></H1><BR><HR>");
    document.write("<TABLE COLS=4><TR><TD><DIV ALIGN=CENTER>");
    var dummy;
    if (type == 1) {
        document.write('<A HREF="' + "../images/today/" + syasin + '"><IMG SRC="' + "../images/today/" + syasin + '" WIDTH=200 HEIGHT=150 BORDER=0><BR></A></DIV></TD></TR></TABLE></DIV>');
    } else {
        document.write('<A HREF="' + "../images/kiri/" + syasin + '"><IMG SRC="' + "../images/kiri/" + syasin + '" WIDTH=200 HEIGHT=150 BORDER=0><BR></A></DIV></TD></TR></TABLE></DIV>');

    }
    document.write('<HR><CENTER>仕入担当から本日の入荷情報があります。<A HREF=buyer' + kaisen2 + '.htm>入荷情報へ<BR><BR><A HREF="JavaScript:history.go(-1)">戻る</A></CENTER>');
}
// 
function dataload() {
    var i
    var kkv = "";
    for (i = 0; i < kno; i++) {
        kv[i] = document.forms[0].k[i].value;
        if (kv[i] == "")
            kv[i] = 0;
        kkv += kv[i] + ",";
    }
    setCookie("AOrder", kkv);
}

// 正当性のチェック kaisen
function validation() {
    var month, day, hour, minute;
    var i;
    var kingakuk = 0;
    var kingakuh = 0;
    var ktv;
    var data = "\n";
    var data1 = "<BR>";
    var flag;
    var hinmei, hinmoku, hinmei1, hinmoku1, toukyuu, toukyuu1;
    var bikou, bikou1;
    var name, tel, mailaddr, tname, tzip, taddr, ttel;
    var pass = 0,
        cpc = ""; //クーポンメッセージに使ってる

    cflag1 = 1;
    cflag2 = 0;
    // クッキーのセット
    name = document.forms[0].Name.value;
    if (name != "") setCookie("Name", name);
    tel = document.forms[0].Phone.value;
    if (tel != "") setCookie("Tel", tel);
    mailaddr = document.forms[0].email.value;
    //		if ( name != "" ) setCookie( "Email", mailaddr );	バグ修正　2011/4/3
    if (mailaddr != "") setCookie("Email", mailaddr);
    if (kaisen < 15 || kaisen > 18) {
        tname = document.forms[0].todoName.value;
        if (tname != "") setCookie("TName", tname);
        tzip = document.forms[0].todoZip.value;
        if (tzip != "") setCookie("TZip", tzip);
        taddr = document.forms[0].todoAddr.value;
        if (taddr != "") setCookie("TAddr", taddr);
        ttel = document.forms[0].todoPhone.value;
        if (ttel != "") setCookie("TTel", ttel);
    }
    mailaddrk = document.forms[0].mailaddrk.value;
    if (mailaddrk != "") setCookie("MailK", mailaddrk);

    dataload();

    Now = new Date();
    month = Now.getMonth() + 1;
    day = Now.getDate();
    hour = Now.getHours();
    minute = Now.getMinutes();
    if (stypeT[kaisen] != 4) {
        if (simeCheck(snen, stuki, shi, sji, shun) < 0) {
            alert("\n締め切り日時を過ぎました。; ");
            return false;
        }
    }

    if (document.forms[0].Name.value == "") {
        alert(" \n氏名を入力してください; ");
        document.forms[0].Name.focus();
        return false;
    }
    if (document.forms[0].Phone.value == "") {
        alert(" \n電話番号を入力してください; ");
        document.forms[0].Phone.focus();
        return false;
    }
    if (document.forms[0].email.value == "") {
        alert(" \nメールアドレスを入力してください; ");
        document.forms[0].email.focus();
        return false;
    }
    //メールアドレスチェック　2022/01/27追加
    if (!document.forms[0].email.value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/)) {
        alert(" \nメールアドレスを正しく入力してください; ");
        document.forms[0].email.focus();
        return false;
    }
    //携帯アドレスチェック　2022/01/27追加
    if (document.forms[0].mailaddrk.value != "" &&
        !document.forms[0].mailaddrk.value.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/)) {
        alert(" \n携帯アドレスを正しく入力してください; ");
        document.forms[0].mailaddrk.focus();
        return false;
    }

    if (kaisen < 15 || kaisen > 18) //バグ修正　2011/5/1
    {
        //お届け先氏名入力チェック　2011/4/3追加
        if (document.forms[0].todoName.value == "") {
            alert(" \nお届け先氏名を入力してください; ");
            document.forms[0].todoName.focus();
            return false;
        }
        //お届け先郵便番号チェック　2017/9/23追加
        if (document.forms[0].todoZip.value == "") {
            alert(" \nお届け先郵便番号を入力してください; ");
            document.forms[0].todoZip.focus();
            return false;
        }
        //お届け先郵便番号チェック　2022/01/27追加
        if (!document.forms[0].todoZip.value.match(/^\d{3}-?\d{4}$/)) {
            alert(" \nお届け先郵便番号を正しく入力してください; ");
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
    }
    if (kaisen >= 15 && kaisen <= 18) {
        for (i = 0; i < 2; i++) {
            if (document.forms[0].receipt[i].checked) //店舗選択チェック
            {
                store = document.forms[0].receipt[i].value;
                cflag1 = 0;
                break
            }
        }
        if (cflag1) {
            alert("お受け取り先店舗をご選択ください");
            return false;
        }
        if (!document.forms[0].ok.checked) //了承チェック
            cflag2 = 1;
        if (cflag2) {
            alert("ご注文時の注意点にご了承頂けない場合はご注文できません\n");
            return false;
        }
    }
    data += "お名前:" + document.forms[0].Name.value + "\n";
    data1 += "お名前:" + document.forms[0].Name.value + "<BR>";
    data += "お電話:" + document.forms[0].Phone.value + "\n";
    data1 += "お電話:" + document.forms[0].Phone.value + "<BR>";

    data += "メールアドレス:" + document.forms[0].email.value + "\n";
    data1 += "メールアドレス:" + document.forms[0].email.value + "<BR>";
    if (document.forms[0].mailaddrk.value != "") {
        data += "携帯アドレス:" + document.forms[0].mailaddrk.value + "\n";
        data1 += "携帯アドレス:" + document.forms[0].mailaddrk.value + "<BR>";
    }

    if (kaisen < 15 || kaisen > 18) //バグ修正　2011/5/1
    {
        //お届け先データ追加	2017/09/23
        data += "お届け先氏名:" + document.forms[0].todoName.value + "\n";
        data1 += "お届け先氏名:" + document.forms[0].todoName.value + "<BR>";
        data += "お届け先郵便番号:" + document.forms[0].todoZip.value + "\n";
        data1 += "お届け先郵便番号:" + document.forms[0].todoZip.value + "<BR>";
        data += "お届け先住所:" + document.forms[0].todoAddr.value + "\n";
        data1 += "お届け先住所:" + document.forms[0].todoAddr.value + "<BR>";
        data += "お届け先tel:" + document.forms[0].todoPhone.value + "\n";
        data1 += "お届け先tel:" + document.forms[0].todoPhone.value + "<BR>";
    }

    data += "コメント:" + document.forms[0].comment.value + "\n\n";
    data1 += "コメント:" + document.forms[0].comment.value + "<BR><BR>";
    data += "注文:\n";
    data1 += "注文:<BR>";
    for (i = 0; i < kno; i++) {
        if (kv[i] != "") {
            data += "k" + i + ": " + kv[i] + "\n"
            data1 += "k" + i + ": " + kv[i] + "<BR>"
        }
    }

    for (i = 0; i < kno; i++) {
        hinmei = kh[i];
        if (hinmei.indexOf("〃") >= 0) hinmei = hinmei1;
        hinmei1 = hinmei;
        hinmoku = km[i];
        if (hinmoku.indexOf("〃") >= 0) hinmoku = hinmoku1;
        hinmoku1 = hinmoku;
        toukyuu = ko[i];
        if (toukyuu.indexOf("〃") >= 0) toukyuu = toukyuu1;
        toukyuu1 = toukyuu;
        bikou = kb[i];
        if (bikou.indexOf("〃") >= 0) bikou = bikou1
        bikou1 = bikou;
        if (kv[i] != "") {
            if (kv[i] < kl[i] || (kv[i] % kl[i]) != 0) {
                alert(kh[i] + "がロットの倍数になっていません｡");
                return false;
            }
            ktv = Math.round(kt[i] * kv[i]); //小数点以下がある場合単価＊本数を繰り上げ
            kingakuk = kingakuk + ktv;
            data += hinmei + ", " + hinmoku + ", " + toukyuu + ", " + kt[i] + ", " + kv[i] + kn[i] + ", " + ktv + ", " + bikou + "\n";
            data1 += hinmei + ", " + hinmoku + ", " + toukyuu + ", " + kt[i] + ", " + kv[i] + kn[i] + ", " + ktv + ", " + bikou + "<BR>";
        }
    }
    if (kingakuk <= 0) {
        alert("注文がありません。");
        return false;
    } else {
        if (kaisen < 15 || kaisen > 18) {
            data += "\n切花の合計金額（税込）は" + Math.round(kingakuk * 1.1) + "円です｡\n送料は含まれていません｡\n";
            data1 += "<BR>切花の合計金額（税込）は" + Math.round(kingakuk * 1.1) + "円です｡ <BR>送料は含まれていません｡<BR>";
            if (IssueFlagT[kaisen] == 1) //クーポン発行時
            {
                cpI = IssueT[kaisen] - kingakuk;
                if (cpI > 0) {
                    data += "\n************************************\n";
                    data += "来月の割引クーポン発行まであと" + cpI + "円";
                } else {
                    data += "\n*****ccccc*****\n";
                    data1 += "\n*****ccccc*****\n";
                }
            } else
                pass = 1;
            if (UseFlagT[kaisen] == 1) //クーポン使用可能時
            {
                cpc = Zen2HanN(document.forms[0].code.value);
                if (document.forms[0].code.value == "") {
                    if (pass != 1) //最終行の＊
                        data += "\n************************************\n";
                } else if (cpc != codeT[ktukiT[kaisen]]) {
                    document.forms[0].code.value = "";
                    alert("クーポンコードが間違っています。\n今月のクーポンコードを入力して下さい");
                    if (pass != 1) //最終行の＊
                        data += "\n************************************\n";
                } else {
                    cpU = UseT[kaisen] - kingakuk;
                    if (cpU > 0) {
                        data += "\n************************************\n";
                        data += "あと" + cpU + "円お買い上げで" + word1;
                        data += "\n************************************\n";
                    }
                    document.forms[0].code.value += " お買い上げ金額" + UseT[kaisen] + "円以上で" + word1;
                }
            } else if (pass != 1) //最終行の＊
            {
                data += "\n************************************\n";
            }
        } else //店頭受け取り
        {
            data += "\n切花の合計金額（税込）は" + Math.round(kingakuk * 1.1) + "円です｡\n\n";
            data += "受取店舗 = " + store + "\n";
            data += "受取日は" + uketori + "です。\n";
            data1 += "<BR>切花の合計金額（税込）は" + Math.round(kingakuk * 1.1) + "円です｡ <BR><BR>";
            data1 += "受取店舗 = " + store + "<BR>";
            data1 += "受取日は" + uketori + "です。<BR><BR>";
            data1 += "必ずお受取日にご来店下さい。<BR>いかなる場合でも返品・キャンセル・変更は一切致しません。<BR>当店で購入経験のある方のみの販売となります。<BR>";
            document.forms[0].store.value = store;
        }

        flag = confirm("このデータでいいですか？\n\n" + data);
        if (flag == false)
            return false;
        if (sousinflag == true) {
            alert("ご注文処理中です");
            return false;
        } else {
            sousinflag = true;
        }
    }
    document.forms[0].data.value = data1;
    kkv = getCookie("AOrder");
    document.forms[0].order.value = kkv;
    //        document.forms[0]._browser.value = navigator.userAgent;   // set browser info
    return true;
}

function Zen2HanN(orgText) {
    han = "0123456789.,-+abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    zen = "０１２３４５６７８９．，－＋ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ";
    str = "";
    for (i = 0; i < orgText.length; i++) {
        c = orgText.charAt(i);
        n = zen.indexOf(c, 0);
        if (n >= 0) c = han.charAt(n);
        str += c;
    }
    return str;
}

// -->