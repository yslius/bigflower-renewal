import React from 'react'
import config from 'config'
import Link from 'next/link'
type propsMainItem =  {
	title: string,
	description: Array<string>,
	type: Array<string>,
	status: string,
	href: string
}

const MainItem: React.FC<propsMainItem> = ({title, description, type, status, href}) => {
	const headActive = status == config.STATUS.SALE ? 'sale' : 'off'
	
	return (
		<Link href={href}>
			<div className="main-item">
				<div className={`item-header flex-r ${headActive}`}>
					<div className="types flex-c">
						{
							type.map((item, key) => {
								let icoPlus = ''
								switch (item) {
									case config.TYPES.RECOM:
										icoPlus = 'recom'
										break;
									case config.TYPES.VISIT:
										icoPlus = 'visit'
										break;
									default:
										break;
								}
								return <div className={`type ${icoPlus}`} key={key}>
									{item}
								</div>
							})
						}
					</div>
					<div className="title">
						{title}
					</div>
					<div className="status">
						{status}
					</div>
				</div>
				<div className="description">
					{
						description.map((item, key) =>{
							return <div className="line" key={key}>{item}</div>
						})
					}
				</div>
			</div>
		</Link>
	)
}

export default MainItem