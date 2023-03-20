import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButtonPrimary from "../button/CustomButtonPrimary";
import Whitespace from "../common/Whitespace";

const Timeout = () => {
  const navigate = useNavigate();
  return (
    <Stack p={1} px={4}>
      <Whitespace height={50} />
      <Typography variant="p" textAlign={"center"}>
        Helaas is het niet gelukt om de game binnen de tijd te halen. <br />{" "}
        volgende keer beter
      </Typography>
      <Whitespace height={100} />
      <CustomButtonPrimary handleEvent={() => navigate("/")}>
        Go To Home
      </CustomButtonPrimary>
      <Whitespace height={50} />
    </Stack>
  );
};

export default Timeout;
