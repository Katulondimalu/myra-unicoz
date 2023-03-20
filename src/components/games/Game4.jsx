import { Stack, TextField, Typography } from "@mui/material";
import { increment, update } from "firebase/database";
import { differenceInSeconds } from "date-fns";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import CustomButtonPrimary from "../button/CustomButtonPrimary";
import Whitespace from "../common/Whitespace";
import { useTranslation } from "../../utils/languages";
import CustomButtonSecondary from "../button/CustomButtonSecondary";
import {
  sweetAlertPopup,
  sweetAlertPopupAlternative,
} from "../../utils/helper";
import { DevButton } from "../button/DevButton";
import { useDate } from "../../utils/use";

const Game4 = () => {
  const navigate = useNavigate();
  const t = useTranslation();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [team, team_ref] = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "" || input === null)
      return setError(t("pleaseEnterTheAnswer"));

    if (team?.diffText) {
      if (team?.played?.length >= 7) {
        sweetAlertPopupAlternative(
          "7Wat goed! Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Als beloning heb ik wat minuten van jullie tijd afgehaald. Maar jullie hebben zeker nog niet alle ingrediënten verzameld..."
        );
        update(team_ref, {
          playing: {
            step: 6,
          },
          finished_time: Date.now(),
          total_time:
            differenceInSeconds(Date.now(), team.start_time ?? 0) +
            (team.hints_penalty ?? 0) * 60,
          calc_time:
            differenceInSeconds(Date.now(), team.start_time ?? 0) +
            (team?.hints_penalty ?? 0) * 60 -
            (team.diffText ? 5 * 60 : 0),
        });
      } else {
        sweetAlertPopupAlternative(
          "8Wat goed! Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Als beloning heb ik wat minuten van jullie tijd afgehaald. Maar jullie hebben zeker nog niet alle ingrediënten verzameld..."
        );
        update(team_ref, {
          ...team,
          gs4Answers: team?.gs4Answers
            ? [
                ...team?.gs4Answers,
                { round: team?.playing?.roundData?.round, answer: input },
              ]
            : [{ round: team?.playing?.roundData?.round, answer: input }],
          played: team?.played
            ? [...team.played, team?.playing?.roundData?.round]
            : [team?.playing?.roundData?.round],
          total_done: increment(1),
        });
        update(team_ref, {
          playing: {
            ...team.playing,
            step: 1,
          },
        });
        if (team?.played?.length !== 7) return navigate("../play");
      }
    } else {
      if (team?.played?.length >= 7) {
        if (input.toLowerCase() === "nieuwsgierigheid") {
          sweetAlertPopup(
            "Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Grootmoeders succes is te danken aan haar nieuwsgierigheid..",
            "mooi",
            "Super!",
            "succes"
          );
          update(team_ref, {
            ...team,
            diffText: true,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        } else {
          sweetAlertPopup(
            "Helaas, het hoofd ingedrient van grootmoeder is “nieuwsgierigheid”.",
            "Helaas pindakaas",
            "Helaas!",
            "warning"
          );
          update(team_ref, {
            ...team,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        }
        update(team_ref, {
          playing: {
            step: 6,
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
      } else {
        if (input.toLowerCase() === "nieuwsgierigheid") {
          sweetAlertPopup(
            "Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Als beloning heb ik wat minuten van jullie tijd afgehaald. Maar jullie hebben zeker nog niet alle ingrediënten verzameld. ..",
            "Dan gaan we verder",
            "Helemaal goed!",
            "success"
          );
          update(team_ref, {
            ...team,
            diffText: true,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        } else {
          sweetAlertPopup(
            "Helaas. Dat is niet het hoofdingredient, maar goeie poging! Jullie hebben nog wat extra kennis nodig om te raden wat het hoofdingredient is. Dus blijf spelen en luister goed!",
            "Aan de slag",
            "Helaas!",
            "warning"
          );
          update(team_ref, {
            ...team,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        }
        update(team_ref, {
          playing: {
            ...team.playing,
            step: 1,
          },
        });
        if (team?.played?.length !== 7) return navigate("../play");
      }
    }
  };

  const handleDev = (e) => {
    e.preventDefault();

    if (team?.diffText) {
      if (team?.played?.length >= 7) {
        sweetAlertPopupAlternative(
          "7Wat goed! Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Als beloning heb ik wat minuten van jullie tijd afgehaald. Maar jullie hebben zeker nog niet alle ingrediënten verzameld..."
        );
        update(team_ref, {
          playing: {
            step: 6,
          },
          finished_time: Date.now(),
          total_time:
            differenceInSeconds(Date.now(), team.start_time ?? 0) +
            (team.hints_penalty ?? 0) * 60,
          calc_time:
            differenceInSeconds(Date.now(), team.start_time ?? 0) +
            (team?.hints_penalty ?? 0) * 60 -
            (team.diffText ? 5 * 60 : 0),
        });
      } else {
        sweetAlertPopupAlternative(
          "8Wat goed! Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Als beloning heb ik wat minuten van jullie tijd afgehaald. Maar jullie hebben zeker nog niet alle ingrediënten verzameld..."
        );
        update(team_ref, {
          ...team,
          gs4Answers: team?.gs4Answers
            ? [
                ...team?.gs4Answers,
                { round: team?.playing?.roundData?.round, answer: input },
              ]
            : [{ round: team?.playing?.roundData?.round, answer: input }],
          played: team?.played
            ? [...team.played, team?.playing?.roundData?.round]
            : [team?.playing?.roundData?.round],
          total_done: increment(1),
        });
        update(team_ref, {
          playing: {
            ...team.playing,
            step: 1,
          },
        });
        if (team?.played?.length !== 7) return navigate("../play");
      }
    } else {
      if (team?.played?.length >= 7) {
        if (input.toLowerCase() === "nieuwsgierigheid") {
          sweetAlertPopup(
            "Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Grootmoeders succes is te danken aan haar nieuwsgierigheid..",
            "mooi",
            "Super!",
            "succes"
          );
          update(team_ref, {
            ...team,
            diffText: true,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        } else {
          sweetAlertPopup(
            "Helaas, het hoofd ingedrient van grootmoeder is “nieuwsgierigheid”.",
            "Helaas pindakaas",
            "Helaas!",
            "warning"
          );
          update(team_ref, {
            ...team,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        }
        update(team_ref, {
          playing: {
            step: 6,
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
      } else {
        if (input.toLowerCase() === "nieuwsgierigheid") {
          sweetAlertPopup(
            "Jullie hebben het meest belangrijke ingrediënt van grootmoeder helemaal door. Als beloning heb ik wat minuten van jullie tijd afgehaald. Maar jullie hebben zeker nog niet alle ingrediënten verzameld. ..",
            "Dan gaan we verder",
            "Helemaal goed!",
            "success"
          );
          update(team_ref, {
            ...team,
            diffText: true,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        } else {
          sweetAlertPopup(
            "Helaas. Dat is niet het hoofdingredient, maar goeie poging! Jullie hebben nog wat extra kennis nodig om te raden wat het hoofdingredient is. Dus blijf spelen en luister goed!",
            "Aan de slag",
            "Helaas!",
            "warning"
          );
          update(team_ref, {
            ...team,
            gs4Answers: team?.gs4Answers
              ? [
                  ...team?.gs4Answers,
                  { round: team?.playing?.roundData?.round, answer: input },
                ]
              : [{ round: team?.playing?.roundData?.round, answer: input }],
            played: team?.played
              ? [...team.played, team?.playing?.roundData?.round]
              : [team?.playing?.roundData?.round],
            total_done: increment(1),
          });
        }
        update(team_ref, {
          playing: {
            ...team.playing,
            step: 1,
          },
        });
        if (team?.played?.length !== 7) return navigate("../play");
      }
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    update(team_ref, {
      playing: {
        ...team?.playing,
        step: 3,
      },
    });
  };

  return (
    <Stack p={1} px={2}>
      <DevButton onClick={handleDev} />
      <Whitespace height={10} />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <Stack alignItems="center" spacing={3}>
          <Typography variant="h1" fontSize={24} fontWeight={900}>
            {team?.playing?.roundData?.name}
          </Typography>
          {team.diffText ? (
            <Typography
              variant="h1"
              fontSize={23}
              fontWeight={700}
              textAlign="center"
            >
              Welke ingredient voor duurzame inzetbaarheid staan volgens jullie
              nog meer in het recept?
            </Typography>
          ) : (
            <Typography
              variant="h1"
              fontSize={23}
              fontWeight={700}
              textAlign="center"
            >
              Wat denken jullie dat grootmoeders hoofdingrediënt kan zijn voor
              een stressloos leven?
            </Typography>
          )}

          <Stack width="100%">
            <TextField
              sx={{
                background: "white",
                borderRadius: 5,
                border: "none",
                padding: 2,
              }}
              fullWidth
              placeholder={t("insertAnswer")}
              onChange={(e) => setInput(e.target.value)}
              error={error !== null}
              helperText={error}
              InputProps={{
                disableUnderline: true,
              }}
              variant="standard"
            />
          </Stack>
        </Stack>
        <Stack width="100%">
          <CustomButtonPrimary handleEvent={handleSubmit}>
            {team.diffText ? t("addToReceipt") : t("isRight")}
          </CustomButtonPrimary>
          <Whitespace height={20} />
          <CustomButtonSecondary handleEvent={handleBack}>
            {t("back")}
          </CustomButtonSecondary>
          <Whitespace height={40} />
          <Whitespace height={10} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Game4;
