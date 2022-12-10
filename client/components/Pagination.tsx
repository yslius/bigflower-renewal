import React, { useEffect, useState } from 'react'
import Link from 'next/link'
type propsPagination =  {
	currentPage: number,
	sizePage?: undefined| number,
	lengthResult: number,
	numPage?: undefined| number,
	baseHref: string
}

const Pagination: React.FC<propsPagination> = ({currentPage, sizePage, lengthResult, numPage, baseHref}) => {
	numPage = numPage?? 2
	sizePage = sizePage?? 15
	currentPage = Number(currentPage)
	const lPage:number = Math.floor(lengthResult/sizePage) + (lengthResult%sizePage != 0 ? 1 :0)
	
	const [firstPage, setFirstPage] = useState<number>(1)
	const [lastPage, setLastPage] = useState<number>(2*numPage+1)

	useEffect(()=>{
		numPage = numPage?? 2
		sizePage = sizePage?? 15
		setFirstPage(currentPage-numPage > 1 ? currentPage-numPage : 1)
		setLastPage(currentPage+numPage)
		if (numPage >= currentPage) {
			setLastPage(lengthResult<=sizePage ? 1 : 2*numPage+1)
		}
		if(currentPage+numPage >= lPage){
			setLastPage(lPage)
		}
		if(currentPage+numPage > lPage) {
			setFirstPage(lPage-(2*numPage)>0 ? lPage-(2*numPage) : 1)
		}
	}, [currentPage, lengthResult])

	const renderItemPage = (min: number, max: number) => {
		let listItem = []
		for (let index = min; index <= max; index++) {
			listItem.push(
				<li className={`page-item ${currentPage==index? 'active' : ''}`} key={index}>
					<Link href={`${baseHref}/${index}`}>
						<a className="page-link">{index}</a>
					</Link>
				</li>
			)
		}
		return listItem
	}

	return (
		<nav className="pagination">
			<ul className="nav-page flex-r">
				<li className="page-item disabled">
					<Link href={`${baseHref}/${currentPage>1? currentPage-1: 1}`}>
						<a className="page-link">前へ</a>
					</Link>
				</li>
				{
					renderItemPage(firstPage, lastPage)
				}
				<li className="page-item">
					<Link href={`${baseHref}/${currentPage<lPage? currentPage+1: lPage}`}>
						<a className="page-link">次へ</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination