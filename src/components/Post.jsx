import React, { useEffect, useState } from 'react';
import { client, getImageUrl } from '../lib/pocketbase';

export default function Post() {
	const [item, setItem] = useState(null);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	const fetchData = async () => {
		const param = params.name;
		try {
			const res = await client.collection("posts").getList(1, 50, {
				filter: `path="${param}"`,
			});
			setItem(res.items[0]);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			{item !== null ? 
				<>
					<div key={item.id} className='card'>
						<img src={getImageUrl(item)} className='-img' />
						<div className='-container'>
							<div className='-title'>{item.title}</div>
						</div>
					</div>
					<div dangerouslySetInnerHTML={{ __html: item.content }}></div>
				</>
			 	: <p>Loading...</p>
			}
		</>
	);
}