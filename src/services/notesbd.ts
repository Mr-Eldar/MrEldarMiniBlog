import axios from 'axios'

export const getNotes = async (page = 1, limit = 8) => {
   const res = await axios.get(
      `https://68acc47fb996fea1c08ad7b2.mockapi.io/notes?page=${page}&limit=${limit}`
   );
   return res.data;
}

export const getCountNotes = async () => {
   const res = await axios.get(
      `https://68acc47fb996fea1c08ad7b2.mockapi.io/notes`
   );
   return res.data.length;
}

export const getNoteById = async (id: number) => {
   const res = await axios.get(
      `https://68acc47fb996fea1c08ad7b2.mockapi.io/notes/${id}`
   );

   return res.data;
}

export const getNotesForDelete = async () => {
	const res = await axios.get(
		`https://68acc47fb996fea1c08ad7b2.mockapi.io/notes`
	);
	return res.data;
};

export const deleteNotesById = async (id: number | null) => {
	const res = await axios.delete(
		`https://68acc47fb996fea1c08ad7b2.mockapi.io/notes/${id}`
	);
	return res.data;
};