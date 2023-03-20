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
            Text over de school bestanden log in om je op de mail lijst te
            zetten
          </Typography>
          <Typography variant="p" fontSize={24} fontWeight={300}>
            Digitalisering is niet meer weg te denken uit het onderwijs. Scholen
            en besturen die willen weten hoe ze ervoor staan met digitalisering,
            kunnen van 9 januari tot en met 24 maart 2023 meedoen met de nieuwe
            Monitor Digitalisering Funderend Onderwijs MYRA. Na je aanmelding
            via dit formulier krijg je de link naar MYRA toegestuurd van
            Kohnstamm Instituut. Zo kun je direct aan de slag met het invullen
            van de monitor. Hoe meer deelnemers, hoe beter we inzicht krijgen in
            digitalisering in het onderwijs. Want MYRA biedt scholen en besturen
            waardevolle inzichten waarmee ze hun digitalisering goed en veilig
            kunnen organiseren. Meedoen draagt bij aan professioneel en
            toekomstgericht funderend onderwijs. MYRA is een gezamenlijk
            initiatief van Kennisnet, de PO-Raad en de VO-raad. MYRA geeft
            eenvoudig en volledig inzicht in de stand van digitalisering op
            scholen én de gehele sector.
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
