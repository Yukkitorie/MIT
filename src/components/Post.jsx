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
				<div className="blog-page">
					<div className="blog-header">
						<h1 className="blog-title">{item.title}</h1>
						<p className="blog-date">Publication Date: {new Date(item.created).toLocaleDateString()}</p>
					</div>
					<img src={getImageUrl(item)} alt={item.title} className="blog-image" />
					<div className="blog-content" dangerouslySetInnerHTML={{ __html: item.content }}></div>
				</div>
			: <p>Loading...</p>
			}
		</>
	);
}
