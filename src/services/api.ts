import axios from 'axios';


export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: 'Available' | 'Issued';
}

const api = axios.create({
  baseURL: "https://crudcrud.com/api/8168dcef00fe4048adab0b0a1a0201f2/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books');
  return response.data;
};

export const createBook = async (book: Omit<Book, '_id'>): Promise<Book> => {
  const response = await api.post('/books', book);
  return response.data;
};

export const updateBook = async (id: string, book: Partial<Book>): Promise<Book> => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
}; 