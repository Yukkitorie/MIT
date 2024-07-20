// lib/pocketbase.js
import PocketBase from 'pocketbase';

const url = 'https://yukkitorie3101.pockethost.io/';
export const client = new PocketBase(url);

export const getImageUrl = (item) => {
	const collectionId = item.collectionId;
	const fileId = item.id;
	const fileName = item.image;
	return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};
