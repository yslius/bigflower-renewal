function DataInput()
{
	var name, tel, mailaddr, tname, taddr, ttel;
    name = getCookie( "Name" );
    tel = getCookie( "Tel" );
    mailaddr = getCookie( "Email" );
    tname = getCookie( "TName" );
    taddr = getCookie( "TAddr" );
    ttel = getCookie( "TTel" );
	if ( Kaisen == 1 )
	{
		document.write( '<input type=hidden name="recipient" value="yotai@bigflower.co.jp">' );
		document.write( '<input type=hidden name="subject" value="1 Kaisen Order">' );
	}
	if ( Kaisen == 2 )
	{
		document.write( '<input type=hidden name="recipient" value="sakidori@bigflower.co.jp">' );
		document.write( '<input type=hidden name="subject" value="2 Kaisen Order">' );
	}
	if ( Kaisen == 3 )
	{
		document.write( '<input type=hidden name="recipient" value="orig@bigflower.co.jp">' );
		document.write( '<input type=hidden name="subject" value="3 Kaisen Order">' );
	}
	if ( Kaisen == 4 )
	{
		document.write( '<input type=hidden name="recipient" value="4kaisen@bigflower.co.jp">' );
		document.write( '<input type=hidden name="subject" value="4 Kaisen Order">' );
	}
	if ( Kaisen == 5 )
	{
		document.write( '<input type=hidden name="recipient" value="5kaisen@bigflower.co.jp">' );
		document.write( '<input type=hidden name="subject" value="5 Kaisen Order">' );
	}

	document.write( '<input type=hidden name="env_report" value="REMOTE_HOST,HTTP_USER_AGENT">' );
	document.write( '<input type=hidden name="return_link_url" value="//www.bigflower.co.jp/">' );
	document.write( '<input type=hidden name="return_link_title" value="ホームページに戻る">' );
	document.write( '<input type=hidden name="title" value="ご注文ありがとうございました。">' );
	document.write( '<input type=hidden name="required" value="Name,Phone,email">' );
	document.write( '<input type=hidden name="print_config" value="subject,Name,Phone,email,todoName,todoAddr,todoPhone,comment,data">' );
	document.write( "<table border=0 cellpadding=7 CELLSPACING=1 width=500><tr>" );
	document.write( '<td><FONT COLOR=blue SIZE=5>氏　名</td><TD><INPUT NAME="Name" TYPE="TEXT" SIZE=30 value=' + name + '>　(必須)</FONT></TD></tr>' );
	document.write( '<tr><td><FONT COLOR=blue SIZE=5>電話番号</td><TD><INPUT NAME="Phone" TYPE="TEXT" SIZE=30 value=' + tel + '>　(必須・半角)</FONT></TD></tr>' );
	document.write( '<tr><td><FONT COLOR=blue SIZE=5>メールアドレス</td><TD><INPUT NAME="email" TYPE="TEXT" SIZE=30 value=' + mailaddr + '>　(必須・半角)</FONT></TD></tr>' );
	document.write( "</table>" );
    document.write( "<FONT COLOR=magenta SIZE=4>ご注意：メールアドレスを間違えると返信メールを送れません。<BR></FONT>");
	document.write( "<BR>次の項目はお届け先住所が登録してある住所と同じ場合は必要ありません。<BR><BR>" );
	document.write( "<table border=1 cellpadding=0 width=400><tr>" );
	document.write( '<td>お届け先名前</td><TD><INPUT NAME="todoName" TYPE="TEXT" SIZE=30 value=' + tname + '></TD></tr>' );
	document.write( '<td>お届け先住所</td><TD><textarea name="todoAddr" rows=3 cols=35>' + taddr + '</textarea></TD></tr>' );
	document.write( '<td>お届け先Tel</td><TD><INPUT NAME="todoPhone" TYPE="TEXT" SIZE=30 value=' + ttel + '></TD></tr>' );
	document.write( "</table><BR>" );
	document.write( '<FONT SIZE=4 COLOR=blue> コメントをどうぞ　<textarea name="comment" rows=5 cols=50></textarea>' );
	document.write( "<BR></FONT>" );
	document.write( '<P ALIGN="center">' );
	document.write( '<input type="hidden" name="data">' );
	document.write( '<hr><center>' );
	document.write( '<input type="SUBMIT" value="注文" onClick="return validation()">　　' );
	document.write( '<input type="RESET" value="リセット">' );
	document.write( "</center><BR>" );
//	document.write( '<DIV STYLE="border-width:4pt;border-style: ridge;border-color:ffd700;padding:2px;width=650px;background:000000">' );
//	document.write( '<DIV ID="blinkblock3" STYLE="visibility: visible;font-size:16pt;font-weight:bold;color:ffffff"><CENTER>花材予約販売　（期間、数量限定販売）お早めにどうぞ。</CENTER></DIV></DIV>' );
//	document.write( '<DIV style="font-family:impact;font-size:14pt;color:0000ff;margin-top:-22pt;margin-left:500pt"></DIV>' );
//	document.write( '<A HREF="./yoyaku/k5today.htm"><FONT size=3>こちら</A>をクリック</FONT></DIV><BR>' );
//	document.write( '<DIV STYLE="border-width:4pt;border-style: ridge;border-color:ffd700;padding:2px;width=700px;background:ff0000" >' );
//	document.write( '<DIV ID="blinkblock4" STYLE="visibility: visible;font-size:16pt;font-weight:bold;color:ffff00"><CENTER>資材　激安特別販売・・破格です。（期間、数量限定販売）お早めにどうぞ。</CENTER></DIV></DIV>' );
//	document.write( '<DIV style="font-family:impact;font-size:14pt;color:0000ff;margin-top:-25pt;margin-left:530pt">' );
//	document.write( '<A HREF="./yoyaku/k4today.htm"><FONT size=3>こちら</A>をクリック</FONT></DIV><BR>' );
}
