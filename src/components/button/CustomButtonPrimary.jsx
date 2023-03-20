import { Button } from "@mui/material";
import assets from "../../assets";

const CustomButtonPrimary = ({
  handleEvent,
  children,
  width = "30%",
  background = "var(--button-color)",
  type = "filled",
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        background: type == "filled" ? background : "none",
        border: type != "filled" ? "2px solid var(--color-white)" : "none",
        width: width,
        boxShadow: 0,
        height: "60px",
        "&:hover": { backgroundColor: "var(--color-2)", boxShadow: 0 },
        marginBottom: 2,
      }}
      onClick={handleEvent}
    >
      {children}
    </Button>
  );
};

export default CustomButtonPrimary;
