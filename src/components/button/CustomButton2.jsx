import { Button } from '@mui/material'

const CustomButton2 = ({ handleEvent, children }) => {
  return (
    <Button variant="outlined" onClick={handleEvent}>
      {children}
    </Button>
  )
}

export default CustomButton2
