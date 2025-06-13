import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Book Management Dashboard
        </Typography>
        <Button
          color="inherit"
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => navigate('/add')}
        >
          Add Book
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 