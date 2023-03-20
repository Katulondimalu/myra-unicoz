import { Box, Stack } from '@mui/material';

const RoundImage = ({ image }) => {
  return (
    <Stack>
      <Box
        component='img'
        sx={{
          width: '100%',
          height: 'auto',
        }}
        alt='logo'
        src={image}
      />
    </Stack>
  );
};

export default RoundImage;
