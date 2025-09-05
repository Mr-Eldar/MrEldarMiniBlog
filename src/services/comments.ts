import axios from 'axios'

export const getCommentsById = async (postId: number | undefined) => {
   const res = await axios.get(
			`https://68acc47fb996fea1c08ad7b2.mockapi.io/comments?postId=${postId}`
		);
   return res.data
}

export const createComment = async (comment: {}) => {
   const res = await axios.post(
			'https://68acc47fb996fea1c08ad7b2.mockapi.io/comments',
			comment
		);
   return res.data
}

export const clickLike = async (commentId: number, currentLikes: number) => {
	const res = await axios.put(
		`https://68acc47fb996fea1c08ad7b2.mockapi.io/comments/${commentId}`,
		{ likes: currentLikes + 1}
	);
	return res.data;
}