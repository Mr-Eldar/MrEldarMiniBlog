export interface Post {
   id: number
   title: string
   miniDescription: string
   fullDescription: string
   imageUrl: string
   postCategory: number
   createdAt: string
}

export type FilterCategories = {
	id: number;
	name: string;
	category_color: string;
};