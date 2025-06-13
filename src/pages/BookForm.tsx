import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getBooks, createBook, updateBook, Book } from '../services/api';

type BookFormData = Omit<Book, '_id'>;

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  genre: yup.string().required('Genre is required'),
  publishedYear: yup
    .number()
    .required('Published year is required')
    .min(1000, 'Invalid year')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  status: yup.string().oneOf(['Available', 'Issued'] as const).required('Status is required'),
});

const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Biography'];
const statuses = ['Available', 'Issued'] as const;
type Status = typeof statuses[number];

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: 'Available' as Status
    }
  });

  const currentGenre = watch('genre');
  const currentStatus = watch('status');

  const { data: books = [] } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled: isEditMode,
  });

  const createMutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book created successfully');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to create book');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Book> }) =>
      updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book updated successfully');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to update book');
    },
  });

  useEffect(() => {
    if (isEditMode && books.length > 0) {
      const book = books.find((b) => b._id === id);
      if (book) {
        setValue('title', book.title);
        setValue('author', book.author);
        setValue('genre', book.genre);
        setValue('publishedYear', book.publishedYear);
        setValue('status', book.status as Status);
      }
    }
  }, [id, books, isEditMode, setValue]);

  const onSubmit = (data: BookFormData) => {
    if (isEditMode) {
      updateMutation.mutate({ id: id!, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {isEditMode ? 'Edit Book' : 'Add New Book'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          size='small'

          label="Title"
          margin="normal"
          {...register('title')}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />

        <TextField
          fullWidth
          label="Author"
          margin="normal"
          size='small'

          {...register('author')}
          error={Boolean(errors.author)}
          helperText={errors.author?.message}
        />

        <TextField
          fullWidth
          select
          label="Genre"
          size='small'
          margin="normal"
          value={currentGenre}
          onChange={(e) => setValue('genre', e.target.value)}
          error={Boolean(errors.genre)}
          helperText={errors.genre?.message}
        >
          <MenuItem value="">Select Genre</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Published Year"
          type="number"
          size='small'
          margin="normal"
          {...register('publishedYear', { valueAsNumber: true })}
          error={Boolean(errors.publishedYear)}
          helperText={errors.publishedYear?.message}
        />

        <TextField
          fullWidth
          select
          label="Status"
          size='small'
          margin="normal"
          value={currentStatus}
          onChange={(e) => setValue('status', e.target.value as Status)}
          error={Boolean(errors.status)}
          helperText={errors.status?.message}
        >
          <MenuItem value="">Select Status</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {(createMutation.isPending || updateMutation.isPending) ? (
              <CircularProgress size={24} />
            ) : (
              isEditMode ? 'Update Book' : 'Add Book'
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BookForm; 