import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "../../utils/languages";
import Whitespace from "../common/Whitespace";
import CustomButtonPrimary from "../button/CustomButtonPrimary";
import assets from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../utils/firebase";
import { ref, set } from "firebase/database";
import { v4 as uuid } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  background: "#fff",
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};

const ModalLoginComponent = ({ open, handleClose }) => {
  const t = useTranslation();
  const uniqueId = uuid();
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { language } = useParams();
  const myra_ref = ref(database, `myra_ref/${uniqueId}`);

  const handleSubmit = () => {
    if (username === "" || username === null)
      return setErrorUsername("Please insert your username");
    if (password === "" || password === null)
      return setErrorPassword("Please insert your password");
    set(myra_ref, {
      username: username,
    });
    navigate(`/${language}/admin`);
  };

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ textAlign: "right" }}>
          <ClearIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </div>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "200px",
              cursor: "pointer",
            }}
            alt="logo"
            src={assets.myra_logo}
            onClick={() => {}}
          />
          <Box
            component="img"
            sx={{
              width: "60px",
              cursor: "pointer",
            }}
            alt="logo"
            src={assets.logo}
            onClick={() => {}}
          />
        </Stack>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {""}
        </Typography>

        <Whitespace height={20} />

        <Stack
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontSize={28}
            fontWeight={700}
            color={"var(--color-2)"}
          >
            Portaal Unicoz
          </Typography>
          <Whitespace height={20} />

          <TextField
            id="outlined-basic"
            label="@unicoz.nl"
            variant="filled"
            required
            helperText={errorUsername}
            error={errorUsername !== null}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Whitespace height={20} />
          <TextField
            id="outlined-basic"
            label="Wachtwoord"
            variant="filled"
            required
            helperText={errorPassword}
            error={errorPassword !== null}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Whitespace height={40} />

          <CustomButtonPrimary handleEvent={() => handleSubmit()}>
            Aanmelden
          </CustomButtonPrimary>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalLoginComponent;
