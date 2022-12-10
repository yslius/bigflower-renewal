import React from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import Link from 'next/link'
import {routers} from 'config/router'

function Header() {
	return (
		<header className='flex-r'>
			<div className="content">
				<Link href={routers.home.url}>
					<div className="logo">
						<Image src='/images/logo.jpg' layout='intrinsic' width="200" height="35" placeholder='empty'></Image>
					</div>
				</Link>
				<Navbar />
			</div>
		</header>
	)
}

export default Header