import { Button, Stack, TextField, Typography } from '@mui/material';
import { update } from 'firebase/database';
import React, { useCallback, useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useOutletContext } from 'react-router-dom';
import { checkPlayed, roundCheck, sweetAlert } from '../../utils/helper';

const BarcodeScanner = ({ onNext }) => {
  const [input, setInput] = useState(null);
  const [stopStream, setStopStream] = useState(false);
  const [error, setError] = useState(null);
  let [recording, set_recording] = useState(false);
  const [team, team_ref] = useOutletContext();

  const handleOnChange = useCallback(
    (err, result) => {
      set_recording(true);
      if (result) {
        checkBarcodeData(result.text);
      }
      if (err) return;
      return () => {
        set_recording(false);
        setInput(null);
        setStopStream(false);
        setError(null);
      };
    },
    [onNext]
  );

  const onError = (error) => {
    if (error.name === 'NotAllowedError') {
      setError('Camera access denied');
      setStopStream(true);
    } else {
      console.log(error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input === '' || input === null)
      return setError('plase provide barcode first');
    checkBarcodeData(input);
  };

  const checkBarcodeData = (value) => {
    const checkRound = roundCheck(Number(value));
    if (!checkRound) return setError('invalid barcode');
    const isPlayed = checkPlayed(checkRound, team);
    if (isPlayed)
      return sweetAlert('Elke game kan maar 1x per team gespeeld worden.');
    update(team_ref, {
      playing: {
        round: checkRound.round,
        step: 2,
        roundData: checkRound,
      },
    });
  };

  return (
    <>
      <Stack
        style={{
          position: 'relative',
          padding: '4px',
        }}
        className='cool-border-thing'
      >
        <BarcodeScannerComponent
          width={310}
          height={282}
          onUpdate={handleOnChange}
          onError={onError}
          stopStream={stopStream}
        />
        {recording === false && (
          <div
            style={{
              position: 'absolute',
              top: 4,
              left: 4,
              bottom: 4,
              right: 4,
              backgroundColor: 'var(--button-color)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              {error === 'Camera access denied'
                ? 'Camera access denied'
                : 'Waiting for camera...'}
            </div>
          </div>
        )}
      </Stack>
      <Typography
        variant='p'
        component='p'
        align='center'
        px={3}
        color='#888888'
      >
        Geen camera? Je kan ook handmatig de barcode invoeren.
      </Typography>
      <Stack spacing={2} direction='row' px={2}>
        <TextField
          id='standard-basic'
          label={'Barcode invullen'}
          variant='standard'
          margin='dense'
          required
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error && error}
        />
        <Button
          variant='contained'
          size='small'
          onClick={handleOnSubmit}
          sx={{
            width: '8rem',
            height: '2rem',
            marginTop: '1.6rem!important',
            backgroundColor: '#004384',
          }}
        >
          {'Stuur'}
        </Button>
      </Stack>
    </>
  );
};

export default BarcodeScanner;
