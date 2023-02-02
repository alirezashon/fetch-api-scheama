/** @format */

import mongoose from 'mongoose';
import fetch from 'node-fetch';

 mongoose.connect('mongodblocalhost:27017/fetchDB');

const postSchema = mongoose.Schema({
	user_id: {
		type: Number,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	descripton: {
		type: String,
		required: true,
	},
});

const Post = mongoose.model('Post', postSchema);

async function getPosts() {
	const myPosts = await fetch('https://jsonplaceholder.typicode.com/posts');
	const response = await myPosts.json();

	for (let i = 0; i < response.length; i++) {
		const post = new Post({
			user_id: response[i]['userId'],
			id: response[i]['id'],
			title: response[i]['title'],
			descripton: response[i]['body'],
		});
		post.save();
	}

	// console.log(response);
}
getPosts();
