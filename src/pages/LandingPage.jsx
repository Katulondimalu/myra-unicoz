import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import assets from "../assets";
import CustomButtonPrimary from "../components/button/CustomButtonPrimary";
import { useTranslation } from "../utils/languages";
import ModalLoginComponent from "../components/modal/ModalLogin";

const LandingPage = () => {
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
          {/*}
          <Typography
            variant="h5"
            fontSize={64}
            fontWeight={700}
            color={"var(--color-2)"}
          >
            Monitor Digitalisering Funderend Onderwijs
          </Typography>
          */}
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
            Monitor Digitalisering Funderend Onderwijs
          </Typography>
          <Typography variant="p" fontSize={24} fontWeight={300}>
          Digitalisering is niet meer weg te denken uit het onderwijs. Scholen en besturen die willen weten hoe ze ervoor staan met digitalisering, konden meedoen met de nieuwe Monitor Digitalisering Funderend Onderwijs MYRA. 
          <br/>
          Na de eerste aanmeldingen zijn we nu in staat om de resultaten binnen twee tot drie weken met u te delen. Via deze portal kunt u inloggen met uw Unicoz gegevens, zodat de voor u relevante data als PDF wordt opgestuurd zodra deze gereed is. 
          <br/>
          MYRA is een gezamenlijk initiatief van Kennisnet, de PO-Raad en de VO-raad. MYRA geeft eenvoudig en volledig inzicht in de stand van digitalisering op scholen én de gehele sector.

          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            margin: 10,
          }}
        >
          <CustomButtonPrimary handleEvent={() => handleOpenLogin()}>
            Aanmelden
          </CustomButtonPrimary>
        </Stack>
      </Stack>
    </>
  );
};

export default LandingPage;
