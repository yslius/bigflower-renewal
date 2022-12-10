import Layouts from 'layouts'
import Link from 'next/link'
import config from 'config'
import MainItem from 'components/MainItem'
const Ktoday = () => {
	return (
		<Layouts description='先取りバーチャル'>
			<div className="header">
				<h2 className="title">先取りバーチャル</h2>
				<div className='description'>
					入荷当日発送の販売です。
				</div>
				<div className="description">
					水揚げ等はしておりませんのでお客様の方でお願い致します。
				</div>
			</div>
			<div className="content">
				<div className="list-item flex-r">
					{
						config.PREEMPTIVE.map((item, index) => {
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
								description={item.description} 
								type={type}
								status={status}
								href={`/buyer/${item.href}`}/>
						})
					}
				</div>
				<div className="info">
					<div className="line">
						このページの情報は頻繁に変化します。
					</div>
					<div className="line">
						お客様ご自身で常に
						<Link href={'#'} >
							<button className='btn btn-primve'>更新</button>
						</Link>
						してご覧下さい。<br/>
					</div><br />
					<div className="line">			
						***********************************<br />
					</div><br />
					<div className="line">
						<Link href='#'>
							<a className='line-bottom'>
							特割情報更新サービス
							</a>
						</Link>
					</div><br />
					<div className="line text-red">
						こちらにご登録頂ければ販売開始時刻にご連絡致します。
					</div>
					<div className="line text-red">
						開始時刻に毎回ご連絡させて頂きますので月、水、金曜の午前中～昼頃に数回、
					</div>
					<div className="line text-red">							
						メールにてご連絡させて頂きます。
					</div>
					<div className="line">
						***********************************
					</div>
				</div>
			</div>
		</Layouts>
	)
}

export default Ktoday
