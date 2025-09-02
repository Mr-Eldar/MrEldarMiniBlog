export type Comment = {
	id: number;
	postId: number;
	userName: string;
	commentContent: string;
	likes: number;
	isLiked: boolean;
};