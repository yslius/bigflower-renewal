import Head from 'next/head'
import React, { useRef, useState } from 'react'
import config from 'config'
import Footer from './partials/Footer'
import Header from './partials/Header'
import ScrollTop from 'components/ScrollTop'

type LayoutProps = {
	children?: any,
	title?: string,
	description?: string
}

const Layouts : React.FC<LayoutProps> = ({children, title, description}) => {
	const [isShow, setIsShow] = useState(false)
	const elementRef = useRef(null)

	const handleScroll = (e: React.UIEvent<HTMLElement>) => {
		if (e.currentTarget.scrollTop > 100) {
			setIsShow(true)
		}else{
			setIsShow(false)
		}
		let search: any = document.getElementsByClassName('search')
		let headerList: any = document.getElementsByClassName('list-head')
		let productItem: any = document.getElementsByClassName('list-item-product')

		if (search.length > 0 &&headerList.length > 0 && productItem.length > 0) {
			if (!search[0].classList.contains('p-fix-search')) {
				if ((productItem[0].offsetTop - e.currentTarget.scrollTop) < 200) {
					search[0].classList.add('p-fix-search')
					headerList[0].classList.add('p-fix-header')
				}
			}else{
				if ((productItem[0].offsetTop - e.currentTarget.scrollTop) > 200) {
					search[0].classList.remove('p-fix-search')
					headerList[0].classList.remove('p-fix-header')
				}
			}	
		}
	}

	return (
		<>
			<Head>
				<title>{title||config.APP_NAME}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={description || ''} />
				<meta httpEquiv='content-language' content='JP' />
			</Head>
			<Header />
			<main onScroll={handleScroll} ref={elementRef}>
				<div className='container'>
					{children}
				</div>
				<ScrollTop isShow={isShow} elementRef={elementRef}/>
				<Footer />
			</main>
		</>
	)
}

export default Layouts