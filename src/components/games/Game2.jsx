import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  child,
  orderByChild,
  query,
  ref,
  set,
  update,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import assets from "../../assets";
import CustomButtonPrimary from "../button/CustomButtonPrimary";
import Whitespace from "../common/Whitespace";
import { useTranslation } from "../../utils/languages";
import { useDialogRef } from "../../utils/use";
import { HintsDialog } from "../Dialog";
import { hintsInfo, roundInfo } from "../../utils/constant";
import { Link, animateScroll as scroll } from "react-scroll";
import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HelpIcon from "@mui/icons-material/Help";
import CustomButtonLeft from "../button/CustomBottonLeft";
import ModalAnswerComponent from "../modal/ModalAnswer";
import moment from "moment/moment";
import { height } from "@mui/system";
import { differenceInSeconds, format } from "date-fns";
import { database, useFirebase } from "../../utils/firebase";
import { sortedGamesByScore } from "../../utils/helper";

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite;
`;

const Game2 = () => {
  const { round1image, round2image, round3image } = assets.roundImages;
  const {
    round1clue1,
    round2clue1,
    round3clue1,
    round4clue1,
    round5clue1,
    round6clue1,
    round7clue1,
    round8clue1,
  } = assets.images;

  const {
    Game2AudioRound1,
    Game2AudioRound2,
    Game2AudioRound3,
    Game2AudioRound4,
    Game2AudioRound5,
    Game2AudioRound6,
    Game2AudioRound7,
  } = assets.audio;
  const {
    hints_1,
    hints_2,
    hints_3,
    hints_4,
    hints_5,
    hints_6,
    hints_7,
    hints_8,
  } = hintsInfo;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [team, team_ref] = useOutletContext();
  const [allGames, setAllGames] = useState([]);
  const [openText, setOpenText] = useState(false);
  const [gameHint, setGameHint] = useState({});
  const [textAnswer, setTextAnswer] = useState("");
  const { language } = useParams();
  const { state } = useLocation();
  const t = useTranslation();
  // let dialog_1 = useDialogRef();
  const [openAnswer, setOpenAnswer] = useState(false);
  const [openHint, setOpenHint] = useState(false);

  const all_games = useFirebase(
    query(ref(database, `games`), orderByChild(`date`))
  );

  const handleClickAnswer = () => setOpenAnswer(!openAnswer);
  const handleClickHint = () => setOpenHint(!openHint);

  const handleLogout = (e) => {
    e.preventDefault();
    navigate(`/${language}`);
  };

  const nextRound = (roundID) => {
    console.log(roundID);
    const anchor = document.querySelector(`#${roundID}`);
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let value = textAnswer;
    if (value instanceof Date) {
      value = moment(value).format("YYYY-MM-DD");
    }
    if (value === "" || value === null) return setError("insert answer first");
    const answers = [];
    team?.playing?.roundData?.gs2answer.map((answer) => {
      answers.push(answer.trim().toLowerCase());
    });
    if (answers.includes(value.trim().toLowerCase()) === false)
      return setError("wrong answer");
    // if (
    //   value.trim().toLowerCase() !==
    //   (team?.playing?.roundData?.gs2answer).trim().toLowerCase()
    // )
    //   return setError("wrong answer");
    let roundComplete = team?.playing?.roundComplete;

    if (roundComplete !== undefined) {
      if (roundInfo.length != roundComplete.length) {
        roundComplete.push(roundInfo[team?.playing?.round - 1]);
      }
    }

    // cek if zero length
    if (roundComplete === undefined) {
      update(team_ref, {
        playing: {
          ...team?.playing,
          roundData: roundInfo[team?.playing?.round],
          roundComplete:
            roundComplete === undefined
              ? [roundInfo[team?.playing?.round - 1]]
              : roundComplete,
          round: team?.playing?.round + 1,
        },
      });
    } else {
      if (roundInfo.length === roundComplete.length) {
        update(team_ref, {
          complete: true,
          playing: {
            ...team?.playing,
            roundComplete:
              roundComplete === undefined
                ? [roundInfo[team?.playing?.round - 1]]
                : roundComplete,
            round: team?.playing?.round + 1,
          },
          finished_time: Date.now(),
          total_time:
            differenceInSeconds(Date.now(), team?.start_time ?? 0) +
            (team.hints_penalty ?? 0) * 60,
          calc_time:
            differenceInSeconds(Date.now(), team?.start_time ?? 0) +
            (team?.hints_penalty ?? 0) * 60 -
            (team.diffText ? 5 * 60 : 0),
        });

        handleClickAnswer();
      } else {
        update(team_ref, {
          playing: {
            ...team?.playing,
            roundData: roundInfo[team?.playing?.round],
            roundComplete:
              roundComplete === undefined
                ? [roundInfo[team?.playing?.round - 1]]
                : roundComplete,
            round: team?.playing?.round + 1,
          },
        });
      }
    }

    setError("");
    handleClickAnswer();
  };

  useEffect(() => {
    if (team?.playing?.round === 1) return setGameHint(hints_1);
    if (team?.playing?.round === 2) return setGameHint(hints_2);
    if (team?.playing?.round === 3) return setGameHint(hints_3);
    if (team?.playing?.round === 4) return setGameHint(hints_4);
    if (team?.playing?.round === 5) return setGameHint(hints_5);
    if (team?.playing?.round === 6) return setGameHint(hints_6);
    if (team?.playing?.round === 7) return setGameHint(hints_7);
  }, [team?.playing?.roundComplete]);

  useEffect(() => {
    if (team?.playing?.roundComplete !== undefined) {
      if (team?.playing?.roundComplete.length > 0) {
        if (roundInfo.length === team?.playing?.roundComplete.length) {
          nextRound("finish");
        } else {
          nextRound(`round-${team?.playing?.round}`);
        }
      }
    }
  }, [team?.playing?.roundComplete]);

  useEffect(() => {
    if (all_games === undefined || all_games === null) return;
    setAllGames(sortedGamesByScore(all_games));
  }, [all_games]);

  const getAudio = () => {
    if (team?.playing?.round === 1) return Game2AudioRound1;
    if (team?.playing?.round === 2) return Game2AudioRound2;
    if (team?.playing?.round === 3) return Game2AudioRound3;
    if (team?.playing?.round === 4) return Game2AudioRound4;
    if (team?.playing?.round === 5) return Game2AudioRound5;
    if (team?.playing?.round === 6) return Game2AudioRound6;
    if (team?.playing?.round === 7) return Game2AudioRound7;
  };

  const getClueImage = () => {
    if (team?.playing?.round === 1) return round1clue1;
    if (team?.playing?.round === 2) return round2clue1;
    if (team?.playing?.round === 3) return round3clue1;
    if (team?.playing?.round === 4) return round4clue1;
    if (team?.playing?.round === 5) return round5clue1;
    if (team?.playing?.round === 6) return round6clue1;
    if (team?.playing?.round === 7) return round7clue1;
  };

  const getRoundImage = () => {
    if (team?.playing?.round === 1) return round1image;
    if (team?.playing?.round === 2) return round2image;
  };

  const getTypeRound = () => {
    if (team?.playing?.round === 1) return team?.playing?.round;
    if (team?.playing?.round === 2) return;
    if (team?.playing?.round === 3) return round3clue1;
    if (team?.playing?.round === 4) return round4clue1;
    if (team?.playing?.round === 5) return round5clue1;
    if (team?.playing?.round === 6) return round6clue1;
    if (team?.playing?.round === 7) return round7clue1;
  };

  const getBoughtHint1 = () => {
    if (team?.playing?.round === 1) return team?.bought_hints?.hint_1a;
    if (team?.playing?.round === 2) return team?.bought_hints?.hint_2a;
    if (team?.playing?.round === 3) return team?.bought_hints?.hint_3a;
    if (team?.playing?.round === 4) return team?.bought_hints?.hint_4a;
    if (team?.playing?.round === 5) return team?.bought_hints?.hint_5a;
    if (team?.playing?.round === 6) return team?.bought_hints?.hint_6a;
    if (team?.playing?.round === 7) return team?.bought_hints?.hint_7a;
  };

  const getBoughtHint2 = () => {
    if (team?.playing?.round === 1) return team?.bought_hints?.hint_1b;
    if (team?.playing?.round === 2) return team?.bought_hints?.hint_2b;
    if (team?.playing?.round === 3) return team?.bought_hints?.hint_3b;
    if (team?.playing?.round === 4) return team?.bought_hints?.hint_4b;
    if (team?.playing?.round === 5) return team?.bought_hints?.hint_5b;
    if (team?.playing?.round === 6) return team?.bought_hints?.hint_6b;
    if (team?.playing?.round === 7) return team?.bought_hints?.hint_7b;
  };

  const getBoughtHint3 = () => {
    if (team?.playing?.round === 1) return team?.bought_hints?.hint_1c;
    if (team?.playing?.round === 2) return team?.bought_hints?.hint_2c;
    if (team?.playing?.round === 3) return team?.bought_hints?.hint_3c;
    if (team?.playing?.round === 4) return team?.bought_hints?.hint_4c;
    if (team?.playing?.round === 5) return team?.bought_hints?.hint_5c;
    if (team?.playing?.round === 6) return team?.bought_hints?.hint_6c;
    if (team?.playing?.round === 7) return team?.bought_hints?.hint_7c;
  };

  useEffect(() => {
    console.log(team);
  }, []);

  return (
    <>
      {Object.keys(gameHint).length != 0 && (
        <HintsDialog
          open={openHint}
          handleClose={handleClickHint}
          hints={[
            {
              bought: getBoughtHint1(),
              penalty_minutes: 2,
              onBuy: () => {
                set(
                  child(team_ref, `bought_hints/hint_${team?.playing?.round}a`),
                  true
                );
              },
              text: gameHint.hint_1,
            },
            {
              bought: getBoughtHint2(),
              penalty_minutes: 4,
              onBuy: () => {
                set(
                  child(team_ref, `bought_hints/hint_${team?.playing?.round}b`),
                  true
                );
              },
              text: gameHint.hint_2,
            },
            {
              bought: getBoughtHint3(),
              penalty_minutes: 6,
              onBuy: () => {
                set(
                  child(team_ref, `bought_hints/hint_${team?.playing?.round}c`),
                  true
                );
              },
              text: gameHint.hint_3,
            },
          ]}
        />
      )}
      <ModalAnswerComponent
        open={openAnswer}
        handleClose={handleClickAnswer}
        title={t("Ready to put in the right answer?")}
        desc={t("The answer is ...")}
        text={t("Submit correct")}
        action={handleSubmit}
        type={team?.playing?.roundData?.type}
        setTextAnswer={setTextAnswer}
        textAnswer={textAnswer}
        error={error}
      />
      <Stack className="bg-normal" id="top">
        <Stack direction={"row"} justifyContent={"space-between"} margin={2}>
          <Box
            component="img"
            sx={{
              height: 100,
              width: 160,
              cursor: "pointer",
            }}
            alt="logo"
            src={assets.logo}
            onClick={() => {}}
          />
          <a
            href="https://expinc.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              sx={{
                height: 55,
                width: 160,
                cursor: "pointer",
              }}
              alt="logo"
              src={assets.logo2}
            />
          </a>
          {/* <CustomButtonPrimary
            background="var(--color-white)"
            width="10%"
            type="outline"
            handleEvent={handleLogout}
          >
            Logout
          </CustomButtonPrimary> */}
        </Stack>

        <div className="bodyGame">
          <Typography variant="h1" color={"white"}>
            Welcome {team.team_name}
          </Typography>
          <Stack
            width={"50%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="p" color={"white"} sx={{ width: "100%" }}>
              Hi,
              <br />
              We are happy to celebrate this special event which each other. We
              make it possible to really do this together. <br />
              You will soon participate in an Escape room. This Escape room is
              specially designed for EAS.
              <br />
              The goal is to make a fantastic shared memory where we have fun,
              you are challenged and cooperation is important.
              <br />
              Which team will be the first to go through all the games and
              answer them correctly?
              <br />
              So time is an important element. How fast are you? Can we travel
              in time?
              <br />
              <br />
              We wish you a lot of fun!
              <br />
              Anika, Thierry and Vincent
              <br />
              <br />
              <br />
              <b>
                “Back to the Future: <i>the real story</i>”
              </b>
              <br />
              <br />
              <i>Featuring: Harm Nijzink </i>
              <br />
              <i>Also starring: Hero Marggrander & Cliff Drake </i>
              <br />
              <i>Special appearances: Anika, Thierry & Vincent </i>
              <br />
              <br />
              The coming 60 minutes you will see the history of EAS through the
              eyes of Harm himself. But to let history repeat itself, you will
              find some challenges on the way, which will be yours to solve now!
              Some helpful instructions:
              <br />
              <br />
              <ul style={{ marginLeft: "20px" }}>
                <li>You can play alone, or as a team.</li>
                <li>
                  Use the secret envelope which you already have received,
                  starting with the big brown envelope.
                </li>
                <li>Keep pen and paper close to make notes.</li>
              </ul>
            </Typography>
          </Stack>

          <Whitespace height={100}></Whitespace>

          <Link
            // activeClass="active"
            to="round-1"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            style={{ cursor: "pointer" }}
          >
            <Bounce>
              <Stack alignItems={"center"}>
                <Typography
                  variant="h5"
                  color={"white"}
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  Scroll Down
                </Typography>
                <ArrowDownwardIcon sx={{ color: "#ffffff" }} />
              </Stack>
            </Bounce>
          </Link>
        </div>

        <Stack direction={"row"}>
          {/* Menu  */}
          <Stack
            width={"5%"}
            height={"100vh"}
            bgcolor={"white"}
            justifyContent={"space-between"}
            style={{ position: "sticky", top: 0 }}
          >
            <Link
              activeClass="active"
              to="top"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 80,
                  cursor: "pointer",
                  marginTop: "30px",
                }}
                alt="logo"
                src={assets.logo}
              />
            </Link>
            <div
              className="customLeftSidebar"
              style={{ marginBottom: "150px" }}
            >
              {roundInfo.map((val, key) => {
                if (team?.playing?.round < key + 1) {
                  return (
                    <CustomButtonLeft type="lock" key={key}></CustomButtonLeft>
                  );
                } else {
                  return (
                    <Link
                      key={key}
                      activeClass="active"
                      to={`round-${key + 1}`}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      style={{ cursor: "pointer" }}
                    >
                      <CustomButtonLeft type="unlock">
                        {key + 1}
                      </CustomButtonLeft>
                    </Link>
                  );
                }
              })}
            </div>
          </Stack>
          {/* Game */}
          <Stack direction={"column"} width={"95%"}>
            {/* game  */}
            {roundInfo.map((arr, key) => {
              if (team?.playing?.round < key + 1) {
              } else {
                if (team?.playing?.round == key + 1) {
                  return (
                    <Stack
                      key={key}
                      sx={{ height: "100vh" }}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      direction={"row"}
                    >
                      <Stack
                        id={`round-${key + 1}`}
                        width={"95%"}
                        height={"95vh"}
                        sx={{ marginX: "60px", position: "relative" }}
                        bgcolor={"white"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <a
                          href="https://expinc.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={assets.logo2}
                            style={{
                              width: 160,
                              height: 55,
                              position: "absolute",
                              right: 20,
                              bottom: 20,
                            }}
                          />
                        </a>
                        <a rel="noopener noreferrer">
                          <img
                            src={assets.logo}
                            style={{
                              width: 160,
                              height: 55,
                              position: "absolute",
                              left: 0,
                              bottom: 20,
                            }}
                          />
                        </a>
                        <Typography
                          variant="h3"
                          sx={{ color: "var(--color-1)" }}
                        >
                          Game {key + 1}
                        </Typography>
                        <Stack
                          direction={"row"}
                          sx={{ justifyContent: "center", width: "80%" }}
                          className="container-image"
                        >
                          <img
                            className="imageRound"
                            alt="comic_img"
                            src={getClueImage()}
                          />
                        </Stack>
                        <Typography
                          variant="p"
                          sx={{ fontWeight: 700 }}
                          padding={"10px"}
                          margin={"10px"}
                        >
                          {team?.playing?.roundData?.gs3q1}
                        </Typography>
                        {!team.complete && (
                          <>
                            <CustomButtonPrimary
                              handleEvent={handleClickAnswer}
                            >
                              {t("Put in answer")}
                            </CustomButtonPrimary>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              sx={{
                                marginTop: "20px",
                                color: "var(--color-1)",
                              }}
                              style={{ cursor: "pointer" }}
                              onClick={handleClickHint}
                            >
                              <HelpIcon />
                              <Typography
                                variant="p"
                                sx={{
                                  fontWeight: 700,
                                  textDecoration: "underline",
                                }}
                                padding={"10px"}
                                margin={"10px"}
                              >
                                Need a hint?
                              </Typography>
                            </Stack>
                          </>
                        )}
                      </Stack>
                    </Stack>
                  );
                } else {
                  return (
                    <Stack
                      key={key}
                      sx={{ height: "100vh" }}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      direction={"row"}
                    >
                      <Stack
                        id={`round-${key + 1}`}
                        width={"95%"}
                        height={"90vh"}
                        sx={{ marginX: "60px", position: "relative" }}
                        bgcolor={"white"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <a
                          href="https://expinc.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={assets.logo2}
                            style={{
                              width: 160,
                              height: 55,
                              position: "absolute",
                              right: 20,
                              bottom: 20,
                            }}
                          />
                        </a>
                        <a rel="noopener noreferrer">
                          <img
                            src={assets.logo}
                            style={{
                              width: 160,
                              height: 55,
                              position: "absolute",
                              left: 0,
                              bottom: 20,
                            }}
                          />
                        </a>
                        <Typography
                          variant="h3"
                          sx={{ color: "var(--color-1)" }}
                        >
                          Game {key + 1}
                        </Typography>
                        <Stack
                          direction={"row"}
                          sx={{ justifyContent: "center", width: "80%" }}
                          className="container-image2"
                        >
                          <img
                            className="imageRound"
                            alt="comic_img"
                            src={
                              key + 1 === 1
                                ? assets.images.round1clue1
                                : key + 1 === 2
                                ? assets.images.round2clue1
                                : key + 1 === 3
                                ? assets.images.round3clue1
                                : key + 1 === 4
                                ? assets.images.round4clue1
                                : key + 1 === 5
                                ? assets.images.round5clue1
                                : key + 1 === 6
                                ? assets.images.round6clue1
                                : assets.images.round7clue1
                            }
                          />
                        </Stack>
                        <Typography
                          variant="p"
                          sx={{ fontWeight: 700 }}
                          padding={"10px"}
                          margin={"10px"}
                          //{team?.playing?.roundData?.gs3q1}
                        ></Typography>
                      </Stack>
                    </Stack>
                  );
                }
              }
            })}
          </Stack>
        </Stack>

        {/* footer  */}
        {team.complete && (
          <Stack sx={{ height: "100vh" }}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              margin={2}
              sx={{ height: "10vh" }}
            >
              <Link
                activeClass="active"
                to="top"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 160,
                    cursor: "pointer",
                  }}
                  alt="logo"
                  src={assets.logo}
                  // onClick={() => navigate("../instruction", { state: -1 })}
                />
              </Link>
              <a
                href="https://expinc.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  component="img"
                  sx={{
                    height: 55,
                    width: 160,
                    cursor: "pointer",
                  }}
                  alt="logo"
                  src={assets.logo2}
                  // onClick={() => navigate("../instruction", { state: -1 })}
                />
              </a>
            </Stack>

            <Stack
              id="finish"
              px={3}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ height: "auto" }}
            >
              <Typography variant="h1" color={"white"}>
                Well done!
              </Typography>

              <Stack
                width={"30%"}
                direction={"column"}
                sx={{ alignItems: "center" }}
              >
                <Typography variant="h6" color={"white"}>
                  You solved it good job!
                </Typography>
              </Stack>
              <Stack
                width={"80%"}
                direction={"column"}
                sx={{ alignItems: "center", paddingTop: 5, paddingBottom: 5 }}
              >
                <img
                  className="imageRound"
                  alt="comic_img"
                  src={assets.images.round8clue1}
                />
              </Stack>
              <Stack
                width={"30%"}
                direction={"column"}
                sx={{ alignItems: "center" }}
              >
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  width={"70%"}
                >
                  <Typography variant="h6" color={"white"}>
                    Hints used :
                  </Typography>
                  <Typography variant="h6" color={"white"}>
                    {team?.bought_hints
                      ? Object.keys(team?.bought_hints).length
                      : 0}
                  </Typography>
                </Stack>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  width={"70%"}
                >
                  <Typography variant="h6" color={"white"}>
                    Time Penalty :
                  </Typography>
                  <Typography variant="h6" color={"white"}>
                    {team?.hints_penalty
                      ? (() => {
                          const timeInMinutes = team.hints_penalty;
                          const hours = Math.floor(timeInMinutes / 60)
                            .toString()
                            .padStart(2, "0");
                          const minutes = Math.floor(timeInMinutes % 60)
                            .toString()
                            .padStart(2, "0");
                          const seconds = Math.floor((timeInMinutes * 60) % 60)
                            .toString()
                            .padStart(2, "0");
                          return `${hours}:${minutes}:${seconds}`;
                        })()
                      : "00:00:00"}{" "}
                    Hour
                  </Typography>
                </Stack>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  width={"70%"}
                >
                  <Typography variant="h6" color={"white"}>
                    Play Time :
                  </Typography>
                  <Typography variant="h6" color={"white"}>
                    {(() => {
                      console.log(team?.total_time);
                      const timeInMinutes2 =
                        team?.total_time / 60 -
                        (team?.hints_penalty ? team?.hints_penalty : 0);
                      const hours = Math.floor(timeInMinutes2 / 60)
                        .toString()
                        .padStart(2, "0");
                      const minutes = Math.floor(timeInMinutes2 % 60)
                        .toString()
                        .padStart(2, "0");
                      const seconds = Math.floor((timeInMinutes2 * 60) % 60)
                        .toString()
                        .padStart(2, "0");
                      return `${hours}:${minutes}:${seconds}`;
                    })()}{" "}
                    Hour
                  </Typography>
                </Stack>
                <Stack
                  justifyContent={"space-between"}
                  direction={"row"}
                  width={"70%"}
                >
                  <Typography variant="h6" color={"white"}>
                    Time Score :
                  </Typography>
                  <Typography variant="h6" color={"white"}>
                    {(() => {
                      console.log(team?.total_time);
                      const timeInMinutes2 = team?.total_time / 60;
                      const hours = Math.floor(timeInMinutes2 / 60)
                        .toString()
                        .padStart(2, "0");
                      const minutes = Math.floor(timeInMinutes2 % 60)
                        .toString()
                        .padStart(2, "0");
                      const seconds = Math.floor((timeInMinutes2 * 60) % 60)
                        .toString()
                        .padStart(2, "0");
                      return `${hours}:${minutes}:${seconds}`;
                    })()}{" "}
                    Hour
                  </Typography>
                </Stack>
              </Stack>

              <Whitespace height={100}></Whitespace>
              <Stack width={"30%"}>
                <TableContainer
                  component={Paper}
                  sx={{
                    border: "1px solid #01689B",
                    borderRadius: 2,
                    minHeight: 250,
                    maxHeight: "auto",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ "th,tr,td": { fontWeight: "bold" } }}>
                        <TableCell>Rank</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allGames.length > 0 &&
                        allGames?.map((game, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th, td, th": {
                                border: 0,
                              },
                              height: 30,
                            }}
                            hover={true}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                color:
                                  state?.team_id === game?.team_id && "#01689B",
                                fontWeight:
                                  state?.team_id === game?.team_id && "bold",
                                fontSize:
                                  state?.team_id === game?.team_id && 17,
                              }}
                            >
                              #{index + 1}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                color:
                                  state?.team_id === game?.team_id && "#01689B",
                                fontWeight:
                                  state?.team_id === game?.team_id && "bold",
                                fontSize:
                                  state?.team_id === game?.team_id && 17,
                              }}
                            >
                              {game?.team_name}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                color:
                                  state?.team_id === game?.team_id && "#01689B",
                                fontWeight:
                                  state?.team_id === game?.team_id && "bold",
                                fontSize:
                                  state?.team_id === game?.team_id && 17,
                              }}
                            >
                              {game?.calc_time <= 0
                                ? "00:00:00"
                                : (() => {
                                    const timeInMinutes3 =
                                      game?.total_time / 60;
                                    const hours = Math.floor(
                                      timeInMinutes3 / 60
                                    )
                                      .toString()
                                      .padStart(2, "0");
                                    const minutes = Math.floor(
                                      timeInMinutes3 % 60
                                    )
                                      .toString()
                                      .padStart(2, "0");
                                    const seconds = Math.floor(
                                      (timeInMinutes3 * 60) % 60
                                    )
                                      .toString()
                                      .padStart(2, "0");
                                    return `${hours}:${minutes}:${seconds}`;
                                  })()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
              <Whitespace height={100}></Whitespace>
              <Link
                activeClass="active"
                to="top"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                <Bounce>
                  <Stack alignItems={"center"}>
                    <ArrowUpwardIcon sx={{ color: "#ffffff" }} />

                    <Typography
                      variant="h5"
                      color={"white"}
                      sx={{ width: "100%", textAlign: "center" }}
                    >
                      Go Back Up
                    </Typography>
                  </Stack>
                </Bounce>
              </Link>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Game2;
