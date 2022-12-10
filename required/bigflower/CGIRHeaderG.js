function headerG()
{
	with(document)
	{
		write( "<TABLE ALIGN=center BORDER=3 CELLPADDING=2 WIDTH=70% HEIGHT=60><TR><TD><CENTER><BR><FONT SIZE=4 COLOR=#FF6020>" );
		write( "<B>ご注意ください。<BR>注文は" + yokujitu + " 12時00分までの受付となります。<BR>" );
		write( "それ以外の時間は受け付けられません。<BR></B></FONT><BR></CENTER></TD></TR></TABLE><BR><BR>" );
		write( '<CENTER>仕入担当からの本日の入荷情報があります。<A HREF="buyer/buyer03.htm">こちら</A>をクリック<BR>' );
//		write( '<BR>鉢物通販は<A HREF="htodayG.htm">こちら</A>をクリック<BR></FONT>' );
//		write( '<BR>ブラウザの違いにより、注文できない方は<A HREF="kktodayCGI.htm">こちら</A>をクリック<BR></FONT>' );
//		write( "（チェックができませんので十分入力にご注意ください。）<BR><BR>" );
		write( "<CENTER>画像の欄が◎○の場合はイメージ画像があります。<BR>" );
//		write( "鉢物の画像はほとんど実物画像です。<BR>" );
		write( "ボタンをクリックすると画像が見られます。<BR><BR>" );
		write( '等級について<A HREF="toukyu.htm">こちら</A>をクリック<BR><BR>' );
		write( '色、種類おまかせについて<A HREF="omakase.htm">こちら</A>をクリック<BR><BR>' );
                write( '仕入れ代行サービスについては<A HREF="chuuidaikou.htm">こちら</A>をクリック<BR><BR>' );
		write( 'バラの販売について<A HREF="bara.htm">こちら</A>をクリック<BR><BR></CENTER>' );
		write( "<TR VALIGN=bottom><TD ALIGN=right><FONT SIZE=+2><DIV ALIGN=center>" + "リテール 切花　" +  yokujitu + "</FONT></TD><BR><BR>" );
		write( "<TR VALIGN=bottom><FONT SIZE=+1><DIV ALIGN=right>注文締め切り日時　　</FONT>" );
		write( "<FONT SIZE=+1>" + yokujitu + "</FONT><FONT SIZE=+1>12時00分</DIV></FONT><BR></TR>" );
		write( "<TABLE ALIGN=center BORDER=2 BGCOLOR=#FFFFDD BORDERCOLOR=blue BORDERCOLORLIGHT=blue BORDERCOLORDARK=black>" );
		write( "<TR ALIGN=center VALIGN=center><TD><FONT SIZE=+2>品名</FONT></TD>" );
		write( "<TD><FONT SIZE=+2>品目</FONT></TD><TD><FONT SIZE=+1>単価　円</FONT></TD>" );
		write( "<TD><FONT SIZE=+1>等級</FONT></TD><TD><FONT SIZE=+1>ロット数</FONT></TD>" );
		write( "<TD><FONT SIZE=+1>注文　本</FONT></TD><TD><FONT SIZE=+1>備考</FONT></TD>" );
		write( "<TD><FONT SIZE=+1>画像</FONT></TD></TR>" );
	}
}