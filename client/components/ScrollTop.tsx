import React, { useEffect, useState } from 'react'
type propsScrollTop = {
    isShow: boolean,
    elementRef: any
}

const ScrollTop: React.FC<propsScrollTop> = ({isShow, elementRef}) => {
    const handleScrollTop = () => {
        elementRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
	return isShow ? (
		<div className="scroll-top" onClick={handleScrollTop}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule ="evenodd" stroke='currentColor' d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
        </div>
	) : null
}

export default ScrollTop