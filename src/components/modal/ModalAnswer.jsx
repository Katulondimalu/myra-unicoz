import {
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { useTranslation } from '../../utils/languages'
import Whitespace from '../common/Whitespace'
import CustomButtonPrimary from '../button/CustomButtonPrimary'
import { makeStyles } from '@mui/styles'
import ReactCodeInput from 'react-code-input'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  background: '#fff',
  boxShadow: 24,
  p: 2,
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputLabel-root': {
      color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#000',
    },
  },
}))

const popperSx = {
  '& .MuiPaper-root': {
    border: '1px solid black',
    padding: 1,
  },
  '& .MuiPickersCalendarHeader-label': {
    width: '150px',
  },
  '& .MuiPickersArrowSwitcher-button': {
    marginLeft: '-50%',
    marginRight: '20%',
  },
  '& .MuiCalendarPicker-root': {
    width: '100%',
  },
  '& .PrivatePickersSlideTransition-root': {
    width: '100%',
  },
}

const props = {
  className: 'reactCodeInput',
  inputStyle: {
    fontFamily: 'source-serif-pro-regular',
    margin: '4px',
    width: '50px',
    height: '50px',
    backgroundColor: '#FFFAF4',
    // border: "2px solid var(--secondary-color)",
    borderBottom: '2px solid var(--color-1)',
    borderRadius: '10px',
    fontSize: '24px',
    paddingLeft: '12px',
  },
}

const ModalAnswerComponent = ({
  open,
  handleClose,
  title,
  desc,
  text,
  action,
  loading,
  type,
  setTextAnswer,
  textAnswer,
  error,
}) => {
  const t = useTranslation()
  const classes = useStyles()

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      action(e)
    }
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ textAlign: 'left', color: 'var(--color-1)' }}>
          <ClearIcon onClick={handleClose} />
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {desc}
        </Typography>
        <Whitespace height={20} />
        {/* type text */}
        {type == 'text' && (
          <TextField
            className={classes.root}
            id="outlined-basic"
            label="Type in the right answer"
            variant="filled"
            helperText={error}
            error={error !== null}
            onChange={(e) => setTextAnswer(e.target.value)}
            sx={{ width: '100%' }}
            onKeyDown={handleKeyDown}
          />
        )}
        {/* type number 4 */}
        {type == 'n4' && (
          <>
            <form onKeyDown={handleKeyDown}>
              <ReactCodeInput
                type="number"
                fields={4}
                {...props}
                onChange={(e) => setTextAnswer(e)}
              />
            </form>
            <br />
            <Typography variant="p" sx={{ color: 'var(--color-5)' }}>
              {error !== null && error}
            </Typography>
          </>
        )}
        {/* type number 2 */}
        {type == 'n2' && (
          <>
            <form onKeyDown={handleKeyDown}>
              <ReactCodeInput
                type="number"
                fields={2}
                {...props}
                onChange={(e) => setTextAnswer(e)}
              />
            </form>
            <br />
            <Typography variant="p" sx={{ color: 'var(--color-5)' }}>
              {error !== null && error}
            </Typography>
          </>
        )}
        {/* type date */}
        {type == 'date' && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onKeyDown={handleKeyDown}>
              <DatePicker
                label="Type in the right answer"
                inputFormat="dd/MM/yyyy"
                value={textAnswer}
                onChange={(e) => {
                  setTextAnswer(e)
                }}
                PopperProps={{
                  sx: popperSx,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: '100%',
                    }}
                  />
                )}
              />
            </form>
            <br />
            <Typography variant="p" sx={{ color: 'var(--color-5)' }}>
              {error !== null && error}
            </Typography>
          </LocalizationProvider>
        )}
        <Whitespace height={20} />
        <CustomButtonPrimary handleEvent={action} width="100%">
          {loading ? (
            <CircularProgress style={{ color: '#fff', marginRight: '30px' }} />
          ) : (
            // <CircularProgress style={{ color: "#fff", marginRight: "30px" }} />
            <></>
          )}
          {t(text)}
        </CustomButtonPrimary>
        <Whitespace height={20} />
      </Box>
    </Modal>
  )
}

export default ModalAnswerComponent
