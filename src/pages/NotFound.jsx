import { Button, Stack, Typography } from '@mui/material';
import Whitespace from '../components/common/Whitespace';

const NotFound = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      px={3}
    >
      <Typography variant='h1'>404</Typography>
      <Typography variant='p'>
        The page you are looking for does not exist.
      </Typography>
      <Whitespace height={32} />
      <Button variant='contained' color='primary' href='/'>
        Go to Home
      </Button>
    </Stack>
  );
};

export default NotFound;
