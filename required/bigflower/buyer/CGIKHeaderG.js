
// simenichi, simejihun, kaisen, kaisen2, uketukebi
// buyerXX.htm, toukyuu.htm, omakase.htm, cyuuidaikou.htm, bara.htm
function headerG()
{
	var buyer;
    buyer = "buyer" + kaisen2 + ".htm";

	document.write( '<FONT SIZE="4" COLOR="blue">販売スケジュールは<A HREF="../ktoday.htm">こちら</A></FONT><BR><BR>' );
    document.write( '<FONT SIZE=5 COLOR=blue><CENTER>' + hanbai1T[kaisen] + '<BR><BR></FONT></CENTER>' );

	document.write( "<TABLE ALIGN=center BORDER=3 CELLPADDING=2 WIDTH=70% HEIGHT=60><TR><TD><CENTER><BR><FONT SIZE=4 COLOR=#FF6020>" );
	if ( stypeT[kaisen] != 4 )
    {
		document.write( "<B>ご注意ください。<BR>注文は" + simenichi + simejihun + "までの受付となります。<BR>" );
		document.write( "それ以外の時間は受け付けられません。<BR></B></FONT><BR></CENTER></TD></TR></TABLE><BR><BR>" );
	}
    else
    {
    	document.write( headerT[kaisen] );
		document.write( "<BR></FONT></CENTER></TD></TR></TABLE><BR><BR>" );
    }

	with( document )
	{
		write( '<CENTER>仕入担当からの本日の入荷情報があります。<BR>' );
		write( "画像の欄が◎の場合は速報参考画像があります。<BR>" );
		write( "画像の欄が○の場合はイメージ画像があります。<BR>" );
        write( "それぞれボタンをクリックすると画像が見られます。<BR>" );
		write( '等級について<A HREF="../buyer/toukyu.htm">こちら</A>をクリック<BR>' );
		write( '色、種類おまかせについて<A HREF="../buyer/omakase.htm">こちら</A>をクリック<BR>' );
        write( '仕入れ代行サービスについて<A HREF="../buyer/chuuidaikou.htm">こちら</A>をクリック<BR>' );
		write( 'バラの販売について<A HREF="../buyer/bara.htm">こちら</A>をクリック<BR>' );
	}
	if ( kaisen >= 15 && kaisen <= 18 )	//店頭受け取り
	{
		document.write( "<TR VALIGN=bottom><TD ALIGN=right><DIV ALIGN=center><B>" + uketukebi + "</B></TD>" );
		document.write( "販売は月水金の夕方から翌日５時３０分までと火木日の１９時３０分くらいから２１時１５分までの２回、予約販売で行います。受取日は月水金のみです。欠品が出た場合、確保がたとえ１品のみになってもそれのみで買い付けます。売り切れ連絡のメールは注文メールに対しての返信になります。複数のアドレスをお持ちの方はご注意ください。また、注文後、自動返信の注文確認メールが直ちに届かない方はご自身のメールアドレスの入力間違いです。メールが届かなくても電話でのフォローは一切致しませんのでご注意ください。個人情報の名前電話番号等、すべての入力枠にご記入ください。もれがありますと注文がキャンセルになる場合があります。会員の方のみご利用頂けます。</DIV></TR><BR><BR>" );
		document.write( "<TR VALIGN=bottom><FONT SIZE=+1><DIV ALIGN=right>注文締め切り日時　　</FONT>" );
		document.write( "<FONT SIZE=+1>" +  simenichi + "</FONT><FONT SIZE=+1>" + simejihun + "</DIV></FONT>" );
	}
	else if ( stypeT[kaisen] != 4 )	//無制限以外
    {
        document.write( "<TR VALIGN=bottom><TD ALIGN=right><DIV ALIGN=center><B>" + uketukebi + "</B></TD>" );
		document.write( '<FONT>' + souba + "</DIV></FONT></TR><BR><BR>" );
		document.write( "<TR VALIGN=bottom><FONT SIZE=+1><DIV ALIGN=right>注文締め切り日時　　</FONT>" );
		document.write( "<FONT SIZE=+1>" +  simenichi + "</FONT><FONT SIZE=+1>" + simejihun + "</DIV></FONT>" );
		document.write( "<DIV ALIGN=center><FONT SIZE=+1>FAXではいっさい受け付けません。</FONT></DIV></TR>" );
	}
    with ( document )
    {
		write( '<TABLE ALIGN=center BORDER=2 BGCOLOR=#FFFFDD BORDERCOLOR=blue BORDERCOLORLIGHT=blue BORDERCOLORDARK=black>' );
		write( "<TR ALIGN=center VALIGN=center><TD><FONT SIZE=+2>品名</FONT></TD>" );
		write( "<TD><FONT SIZE=+2>品目</FONT></TD><TD><FONT SIZE=+1>単価 円</FONT></TD>" );
		write( "<TD><FONT SIZE=+1>等級</FONT></TD><TD><FONT SIZE=-1>ロット数</FONT></TD>" );
		write( "<TD><FONT SIZE=+1>注文</FONT></TD><TD><FONT SIZE=+1>備考</FONT></TD>" );
		write( "<TD><FONT SIZE=+1>画像</FONT></TD></TR>" );
	}
}
// -->
