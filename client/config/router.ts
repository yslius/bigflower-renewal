export type ItemNav = {
    url: string,
    label: string,
    child?: undefined|Array<ItemNav>,
    icon?: string
}
type Routers = {
    home: ItemNav,
    pages: Array<ItemNav>,
    admins?: Array<ItemNav>
}
export const routers: Routers = {
    home: {
        url: '/',
        label: '',
        child: []
    },
    pages: [
        {
            url: 'https://www.bigflower.co.jp/',
            label: 'ビックフラワーTOP',
            child: []
        },
        {
            url: '#',
            label: '入会不要・ギフト可',
            child: [
                {
                    url: 'https://www.bigflower.jp/',
                    label: '切花不要・ギフト可',
                    child: []
                },
                {
                    url: 'https://www.bigflower.co.jp/v/v-ez.htm',
                    label: 'EZバーチャル（ギフト専門）',
                    child: []
                },
                {
                    url: 'https://www.bigflower.co.jp/H/',
                    label: '鉢物バーチャル',
                    child: []
                },
            ]
        },
        {
            url: '#',
            label: '入会不要・ギフト不可',
            child: [
                {
                    url: 'https://www.bigflower.co.jp/sizai/index.htm',
                    label: '資材バーチャル',
                    child: []
                },
            ]
        },
        {
            url: '#',
            label: '要入会・ギフト不可\n大口販売・最安値',
            child: [
                {
                    url: 'https://www.bigflower.co.jp/chuui.htm',
                    label: '会員制ゴールド通信販売',
                    child: []
                },
            ]
        }
    ],
}