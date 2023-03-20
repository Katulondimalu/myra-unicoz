import { Button } from "@mui/material";
import assets from "../../assets";
import LockIcon from "@mui/icons-material/Lock";

const CustomButtonLeft = ({ handleEvent, type, children }) => {
  return (
    <button
      className="btn-left"
      style={{
        backgroundImage:
          type === "unlock"
            ? "url(" + assets.rectangle_enable + ")"
            : "url(" + assets.rectangle_disable + ")",
      }}
      onClick={handleEvent}
    >
      {type === "unlock" ? children : <LockIcon />}
    </button>
  );
};

export default CustomButtonLeft;
