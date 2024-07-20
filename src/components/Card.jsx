import React, { useEffect, useState } from 'react';
import { client, getImageUrl } from '../lib/pocketbase';

export default function Card({ img }) {
	const [item, setItem] = useState([]);	

	const fetchData = async () => {
		try {
			const res = await client.collection("posts").getFullList();
			setItem(res);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);3
	return (
		<>
			{item.length > 0 ? (
				item.map((post) => (
					<>
					<div key={post.id} className='card'>
						<img src={getImageUrl(post)} className='-img' />
						<div className='-container'>
							<div className='-title'>{post.title}</div>
						</div>
						{/* <div dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
					</div>
					</>
				))
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}