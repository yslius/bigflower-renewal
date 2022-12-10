import React from 'react'
import Link from 'next/link'
import {routers, ItemNav} from 'config/router'

function Navbar() {
	const listNav = (nav: Array<ItemNav>, isChild: boolean)=>{
		return nav.map((item, index) => {
			let itemChild  = item.child?? []
			let htmlChild = itemChild.length > 0 ? listNav(itemChild, true) : listNav(itemChild, false)
			if (isChild) {
				return <li className="nav-item" key={index}>
					<Link href={item.url}>
						<span className='item-text'>{item.label}</span>
					</Link>
				</li>
			}else {
				return <li className="nav-item" key={index}>
							<div className="group flex-r">
								<Link href={item.url}>
									<span className='item-text'>{item.label}</span>
								</Link>
							</div>
							{htmlChild.length > 0? <ul className="nav">{htmlChild}</ul> : null}
						</li>
			}
		})
	}
	return (
		<div className='navbar'>
			<input type="checkbox" name="" id="navbar-menu" />
			<label htmlFor="navbar-menu" className='navbar-menu'>
				<span className='line'></span>
			</label>
			<ul className="nav flex-r">
				{
					listNav(routers.pages, false)
				}
			</ul>
			<span className="nav-background"></span>
		</div>
	)
}

export default Navbar