
// 締切時間と現在時間の差を求める
	function simeCheck( snen, stuki, shi, sji, shun )
    {
    	var flag, today, xday;
		today = new Date();
		xday  = new Date( snen, stuki-1, shi, sji, shun, 0 );
		flag = xday.getTime() - today.getTime();
//alert( "締切時刻　" + xday1 + "\r\n" + "現在時刻　" + today.getTime() + "\n差分　　" + flag );
        return flag;
    }
// -->
