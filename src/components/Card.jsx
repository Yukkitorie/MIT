import React from 'react'

// import Lan from "../assets/img/Lan.png"

export default function Card({img, title}) {
return (
	<div className='card'>
		<img src={img} className='-img' alt='wtf'/>
		<div className='-container'>
			<div className='-title'>{title}</div>	
		</div>
	</div>
)
}