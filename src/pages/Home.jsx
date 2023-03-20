import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import assets from "../assets";
import CustomButtonPrimary from "../components/button/CustomButtonPrimary";
import { useTranslation } from "../utils/languages";
import ModalLoginComponent from "../components/modal/ModalLogin";

const Home = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const { language } = useParams();
  const handleShowModal = () => {};
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleSubmit = () => {
    navigate(`/${language}/home`);
  };
  return (
    <>
      <ModalLoginComponent open={openLogin} handleClose={handleCloseLogin} />
      <Stack
        sx={{
          backgroundColor: "#fff",
          alignItems: "space-between",
        }}
        className="main"
        padding={1}
      >
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
              cursor: "pointer",
            }}
            alt="logo"
            src={assets.myra_logo}
            onClick={() => {}}
          />
          <Typography
            variant="h5"
            fontSize={64}
            fontWeight={700}
            color={"var(--color-2)"}
          >
            School bestanden
          </Typography>
          <Box
            component="img"
            sx={{
              height: "auto",
              cursor: "pointer",
            }}
            alt="logo"
            src={assets.logo}
            onClick={() => {}}
          />
        </Stack>
        <Stack
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "left",
            margin: 10,
          }}
        >
          <Typography variant="p" fontSize={24} fontWeight={700}>
            Aanmelding ontvangen
          </Typography>
          <Typography variant="p" fontSize={24} fontWeight={300}>
            Zodra alle resultaten binnen zijn en zijn verwerkt zal het naar je
            email adres verstuurd worden.
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
