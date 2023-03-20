import { Button } from "@mui/material";
import assets from "../../assets";

const CustomButtonSecondary = ({ handleEvent, children }) => {
  return (
    <Button
      variant="contained"
      sx={{
        background: "none",
        backgroundImage: "url(" + assets.btn_secondary + ")",
        backgroundSize: "cover",
        boxShadow: 0,
        height: "60px",
        color: "#E87070",
        "&:hover": { backgroundColor: "transparent", boxShadow: 0 },
      }}
      onClick={handleEvent}
    >
      {children}
    </Button>
  );
};

export default CustomButtonSecondary;
