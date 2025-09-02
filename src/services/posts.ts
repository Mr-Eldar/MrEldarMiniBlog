import axios from 'axios';

export const getPosts = async (page: number = 1, limit: number = 6) => {
	const res = await axios.get(
		`https://689c747b58a27b18087e3e72.mockapi.io/Posts?page=${page}&limit=${limit}`
	);
	return res.data;
};

export const getPostsForDelete = async () => {
	const res = await axios.get(
		`https://689c747b58a27b18087e3e72.mockapi.io/Posts`
	);
	return res.data;
}

export const getCountPosts = async () => {
	const res = await axios.get(
		`https://689c747b58a27b18087e3e72.mockapi.io/Posts`
	);
	return res.data.length;
};

export const getPostFullInfoById = async (id?: number) => {
	const res = await axios.get(
		`https://689c747b58a27b18087e3e72.mockapi.io/Posts/${id}`
	);
	return res.data;
};

export const deletePostById = async (id: number | null) => {
	const res = await axios.delete(
		`https://689c747b58a27b18087e3e72.mockapi.io/Posts/${id}`
	);
	return res.data;
};