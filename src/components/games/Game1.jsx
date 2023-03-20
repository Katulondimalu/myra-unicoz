import { Box, Stack, Typography } from "@mui/material";
import Whitespace from "../common/Whitespace";
import LockIcon from "@mui/icons-material/Lock";
import { roundInfo } from "../../utils/constant";
import { update } from "firebase/database";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";

const Game1 = ({ team, team_ref, modal_invalid, modal_already }) => {
  const data = roundInfo;
  const navigate = useNavigate();
  return (
    <Stack className="bg-half" paddingTop={10}>
      <Stack
        mt={5}
        px={6}
        pb={40}
        height={"160vh"}
        sx={{
          backgroundImage: "url(" + assets.fullWafeline + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% 140px",
        }}
      >
        <Stack direction={"row"}>
          <Typography
            variant="p"
            sx={{
              fontSize: "26px",
              fontWeight: "700",
              color: "var(--color-3)",
            }}
          >
            Lets go team ‘{team.team_name}’
          </Typography>
          <Box
            component="img"
            sx={{
              height: 33,
              width: 33,
              cursor: "pointer",
            }}
            alt="logo"
            src={assets.iconInfo}
            onClick={() => navigate("../instruction", { state: -1 })}
          />
        </Stack>

        <Typography
          variant="p"
          sx={{
            color: "var(--color-3)",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Whitespace height={60} />

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="space-between"
          spacing={6.5}
        >
          {data.map((arr, key) => {
            if (team.total_done + 1 > key) {
              if (key % 2 === 0) {
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    key={key}
                  >
                    <Typography
                      variant="p"
                      fontSize={20}
                      fontWeight={700}
                      marginRight={3}
                      color={"var(--color-3)"}
                      onClick={() => {
                        if (team.total_done === key) {
                          update(team_ref, {
                            playing: {
                              round: arr.round,
                              step: 2,
                              roundData: arr,
                            },
                          });
                        } else {
                          modal_already();
                        }
                      }}
                    >
                      {arr.name}
                    </Typography>
                    <Box
                      key={key}
                      sx={{
                        height: 60,
                        width: "60px",
                        borderRadius: 28,
                        background: "none",
                        backgroundImage: "url(" + assets.btn_clear + ")",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                        color: "#000000",
                      }}
                      onClick={() => {
                        if (team.total_done === key) {
                          update(team_ref, {
                            playing: {
                              round: arr.round,
                              step: 2,
                              roundData: arr,
                            },
                          });
                        } else {
                          modal_already();
                        }
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "32px",
                          fontWeight: "700",
                          align: "center",
                          marginLeft: "11%",
                          marginTop: "15%",
                          color: "var(--color-9)",
                        }}
                      >
                        {key + 1}
                      </Typography>
                    </Box>
                  </Stack>
                );
              } else {
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                    key={key}
                  >
                    <Box
                      key={key}
                      sx={{
                        height: "60px",
                        width: "60px",
                        background: "none",
                        backgroundImage: "url(" + assets.btn_clear + ")",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 20px",
                        color: "#000000",
                      }}
                      onClick={() => {
                        if (team.total_done === key) {
                          update(team_ref, {
                            playing: {
                              round: arr.round,
                              step: 2,
                              roundData: arr,
                            },
                          });
                        } else {
                          modal_already();
                        }
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "32px",
                          fontWeight: "700",
                          align: "center",
                          marginLeft: "11%",
                          marginTop: "15%",
                          color: "var(--color-9)",
                        }}
                      >
                        {key + 1}
                      </Typography>
                    </Box>

                    <Typography
                      variant="p"
                      fontSize={20}
                      fontWeight={700}
                      marginLeft={3}
                      color={"var(--color-3)"}
                      onClick={() => {
                        if (team.total_done === key) {
                          update(team_ref, {
                            playing: {
                              round: arr.round,
                              step: 2,
                              roundData: arr,
                            },
                          });
                        } else {
                          modal_already();
                        }
                      }}
                    >
                      {arr.name}
                    </Typography>
                  </Stack>
                );
              }
            } else {
              if (key % 2 === 0) {
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    key={key}
                  >
                    <Typography
                      variant="h1"
                      marginRight={3}
                      textAlign={"right"}
                      fontSize={20}
                      fontWeight={700}
                      color={"var(--color-3)"}
                      sx={{ opacity: "50%" }}
                      onClick={() => {
                        modal_invalid();
                      }}
                    >
                      {arr.name}
                    </Typography>
                    <Box
                      key={key}
                      sx={{
                        height: 60,
                        width: "60px",
                        borderRadius: 28,
                        background: "none",
                        backgroundImage: "url(" + assets.btn_locked + ")",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                        color: "black",
                      }}
                      onClick={() => {
                        modal_invalid();
                      }}
                    ></Box>
                  </Stack>
                );
              } else {
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                    key={key}
                  >
                    <Box
                      key={key}
                      sx={{
                        height: 60,
                        width: "60px",
                        borderRadius: 28,
                        background: "none",
                        backgroundImage: "url(" + assets.btn_locked + ")",
                        backgroundSize: "cover",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 20px",
                        color: "black",
                      }}
                      onClick={() => {
                        modal_invalid();
                      }}
                    ></Box>

                    <Typography
                      variant="h1"
                      marginLeft={3}
                      fontSize={20}
                      fontWeight={700}
                      color={"var(--color-3)"}
                      sx={{ opacity: "50%" }}
                      onClick={() => {
                        modal_invalid();
                      }}
                    >
                      {arr.name}
                    </Typography>
                  </Stack>
                );
              }
            }
          })}
          <Whitespace height={10} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Game1;
