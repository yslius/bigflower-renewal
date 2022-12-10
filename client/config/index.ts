export default {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    API_URL: process.env.NEXT_PUBLIC_URL_API ?? 'http://localhost:8484/api', 
    MODE_DEV: process.env.NEXT_PUBLIC_MODE=='dev',
    TYPES: {
        RECOM: 'おすすめ',
        VISIT: '来店取得',
    },
    STATUS: {
        SALE: '販売中',
        OFF: '販売終了',
    },
    MAIN_ITEM: [
        {
            title: '即日発送販売　その１',
            description: [
                '次回の販売はMM月DD日７時０分頃を予定しています。'
            ],
            href: 'kaisen02',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '即日発送販売　その３',
            description: [
                '次回の販売はMM月DD日１０時３０分頃を予定しています。'
            ],
            href: 'kaisen03',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '即日発送販売　その２',
            description: [
                '次回の販売はMM月DD日７時０分頃を予定しています。'
            ],
            href: 'kaisen04',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '在庫売り尽くし',
            description: [
                '次回の販売はMM月DD日１６時１５分頃を予定しています。'
            ],
            href: 'kaisen05',
            addDay: 1,
            format: 'MM月DD日'
        },
        {
            title: '入荷前夜の予約販売　その１ ＆ 確保状況は即返答します。',
            description: [
                '次回の販売はMM月DD日１８時４５分頃の予定です。',
                '＆印同士の前夜予約販売は同梱できます。（その１～その３まで）'
            ],
            href: 'kaisen06',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '入荷前夜の予約販売　その２　＆　確保状況は即返答します。',
            description: [
                '次回の販売はMM月DD日１８時５０分頃の予定です。',
                '＆印同士の前夜予約販売は同梱できます。（その１～その３まで）'
            ],
            href: 'kaisen07',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '入荷日前夜の予約販売　その３（バラのみ）＆ 確保状況は即返答します',
            description: [
                '次回の販売はMM月DD日１８時５５分頃の予定です。',
                '＆印同士の前夜予約販売は同梱可能です。（その１～その３まで）'
            ],
            href: 'kaisen09',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '明日入荷バラの先行予約販売',
            description: [
                '次回はMM月DD日１４時３０分～１５時０分の３０分間販売します。',
                '更新後すぐにご利用ください。'
            ],
            href: 'kaisen10',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '２０２１年１２月・正月花材・予約販売　１２月２４日または２５日発送予定です。',
            description: [
                'YYYY年正月花材の販売は受付終了しました。'
            ],
            href: 'kaisen11',
            addDay: 0,
            format: 'YYYY年'
        },
        {
            title: '２０２２年８月お盆花材の予約販売　８月８日発送予定です。',
            description: [
                'YYYY年MM月お盆の予約販売は受付終了しました。'
            ],
            href: 'kaisen13',
            addDay: 0,
            format: 'YYYY年MM月'
        },
        {
            title: '店頭受取予約販売①',
            description: [
                '**バイヤー推薦の予約販売** 次回はMM月DD日１８時３０分頃から販売します。',
                '更新後すぐにご利用ください。'
            ],
            href: 'kaisen15',
            addDay: 1,
            format: 'MM月DD日'
        },
        {
            title: '店頭受取予約販売②',
            description: [
                '次回の販売はMM月DD日１８時４５分頃の予定です。'
            ],
            href: 'kaisen16',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '店頭受取予約販売③',
            description: [
                '次回の販売はMM月DD日１８時５０分頃の予定です。'
            ],
            href: 'kaisen17',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: '店頭受取予約販売④',
            description: [
                '次回の販売はMM月DD日１８時５５分頃の予定です。',
            ],
            href: 'kaisen18',
            addDay: 2,
            format: 'MM月DD日'
        }
    ],
    PREEMPTIVE: [
        {
            title: 'バーチャルショップ先行特別割引販売',
            description: [
                '次回の販売はMM月DD日１０時３０分頃を予定しています。'
            ],
            href: 'kaisen20',
            addDay: 2,
            format: 'MM月DD日'
        },
        {
            title: 'バーチャルショップ先行特別割引販売その２',
            description: [
                '今後も突然予定外の販売をすることがあります。次回の販売は未定ですがなるべく数多く行うよう努力します。'
            ],
            href: 'kaisen21',
            addDay: 0,
            format: 'none'
        },
        {
            title: 'テスト用販売データ',
            description: [
                'テスト用販売データ・・送料が変わりました。**バイヤー推薦の予約販売** 次回はMM月DD日１８時３０分頃から販売します。更新後すぐにご利用ください。'
            ],
            href: 'kaisen23',
            addDay: 18,
            format: 'MM月DD日'
        },
    ],
    IMPORT_TYPE: [
        {
            name: '即日発送販売　その１',
            key: 'kaisen02'
        },
        {
            name: '即日発送販売　その３',
            key: 'kaisen03'
        },
        {
            name: '即日発送販売　その２',
            key: 'kaisen04'
        },
        {
            name: '在庫売り尽くし',
            key: 'kaisen05'
        },
        {
            name: '入荷前夜の予約販売その１＆確保状況は即返答します。',
            key: 'kaisen06'
        },
        {
            name: '入荷前夜の予約販売その２＆確保状況は即返答します。',
            key: 'kaisen07'
        },
        {
            name: '入荷日前夜の予約販売その３（バラのみ）＆確保状況は即返答します',
            key: 'kaisen09'
        },
        {
            name: '明日入荷バラの先行予約販売',
            key: 'kaisen10'
        },
        {
            name: '２０２１年１２月・正月花材・予約販売　１２月２４日または２５日発送予定です。',
            key: 'kaisen11'
        },
        {
            name: '２０２２年８月お盆花材の予約販売８月８日発送予定です。',
            key: 'kaisen13'
        },
        {
            name: '店頭受取予約販売①',
            key: 'kaisen15'
        },
        {
            name: '店頭受取予約販売②',
            key: 'kaisen16'
        },
        {
            name: '店頭受取予約販売③',
            key: 'kaisen17'
        },
        {
            name: '店頭受取予約販売④',
            key: 'kaisen18'
        },
        {
            name: 'バーチャルショップ先行特別割引販売',
            key: 'kaisen20'
        },
        {
            name: 'バーチャルショップ先行特別割引販売その２',
            key: 'kaisen21'
        },
        {
            name: 'テスト用販売データ',
            key: 'kaisen23'
        }
    ],
    API_ZIPCODE: 'postal-codes-jp.azurewebsites.net/api/PostalCodes/' //'madefor.github.io/postal-code-api/api/v1/'
}