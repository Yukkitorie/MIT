import React, { useEffect, useState } from 'react';
import { client, getImageUrl } from '../lib/pocketbase';

export default function PostList({ img }) {
	const [item, setItem] = useState([]);

	const fetchData = async () => {
		try {
			const res = await client.collection("posts").getFullList(
				50, { fields: "id, collectionId, image, title, path:excerpt(200, true)", }
			);
			setItem(res);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			{item.length > 0 ? 
				item.map((post) => (
					<>
						<a href={"/knowledgebase?name=" + post.path} key={post.id} className='card'>
							<img src={getImageUrl(post)} className='-img' />
							<div className='-container'>
								<div className='-title'>{post.title}</div>
							</div>
						</a>
					</>
				))
			 : <p>Loading...</p>
			}
		</>
	);
}