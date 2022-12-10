import Layouts from 'layouts'
import Link from 'next/link'
import config from 'config'
import MainItem from 'components/MainItem'
import { setFormatDate } from 'utils/FuncUtils'

const Home = () => {
	return (
		<Layouts description='会員制ゴールド通信販売'>
			<div className="header">
				<h2 className="title">会員制ゴールド通信販売</h2>
				<div className='description'>
					こちらでのご利用は<Link href='#'><a className="link">入会</a></Link>が必要です
				</div>
				<div className="description">
					入会済みのお客様は下記の一覧からお入り下さい。
				</div>
			</div>
			<div className="content">
				<div className="list-item flex-r">
					{
						config.MAIN_ITEM.map((item, index) => {
							let status = config.STATUS.OFF
							let type = []
							if (index % 2 == 0) {
								status = config.STATUS.SALE
								type.push(config.TYPES.RECOM)
							}
							if (index == 12) {
								type.push(config.TYPES.VISIT)
							}
							return <MainItem 
								key={index}
								title={item.title} 
								description={setFormatDate(item.description, item.format, item.addDay) as Array<string>} 
								type={type}
								status={status}
								href={`/buyer/${item.href}`}/>
						})
					}
				</div>
				<div className="info">
					<div className="line">
						頻繁に注文する方でリアルタイムに更新お知らせ連絡を受けたい方はこちらからお申し込み下さい。
					</div>
					<div className="line">
						（携帯電話のアドレスが有効。たまのご利用の方にはこのサービスは必要ありません）
					</div><br />
					<div className="line">			
						それぞれの販売方法には締め切り時間が設けられております。<br />
					</div><br />
					<div className="line">
						ご購入の際はお使いのパソコンの時間が正しいかどうか必ずご確認下さい。<br />
					</div><br />
					<div className="line text-red">
						すべての会員制ゴールド通信販売は入会時にご了承いただいた「会員規約」をもとに運営されています。
					</div>
					<div className="line text-red">
						スムースな運営のための会員システムになります。
					</div>
					<div className="line text-red">							
						守って頂けない場合はお互いの不利益になりますので販売拒否や退会の処置をさせて頂く場合があります。
					</div>
					<div className="line">
						取引に非協力的な場合や悪意がある場合も同様になります。
					</div>
					<div className="line">
						万が一、トラブルが起きた場合の対処も協力的にお願いします。
					</div>
					<div className="line">
						会員制ゴールド通信販売の表示金額は税別価格となっております。
					</div><br />
					<div className="line">
						消費税は商品合計にまとめてかけさせて頂きます。
					</div>
				</div>
			</div>
		</Layouts>
	)
}

export default Home
