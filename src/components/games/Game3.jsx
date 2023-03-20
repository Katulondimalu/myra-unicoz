import { Box, Stack, TextField, Typography } from "@mui/material";
import { increment, update } from "firebase/database";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import assets from "../../assets";
import { checkAnswersValidation } from "../../utils/helper";
import Answer from "../answer/Answer";
import Audio from "../audio/Audio";
import CustomButtonPrimary from "../button/CustomButtonPrimary";
import Whitespace from "../common/Whitespace";
import { useTranslation } from "../../utils/languages";
import CustomButtonSecondary from "../button/CustomButtonSecondary";
import { DevButton } from "../button/DevButton";
import { differenceInSeconds } from "date-fns";

const Game3 = () => {
  const navigate = useNavigate();
  const [team, team_ref] = useOutletContext();
  const [errors, setErrors] = useState({});
  // const [input, setInput] = useState("");
  const [openText, setOpenText] = useState(false);
  const t = useTranslation();
  const {
    Game3AudioRound1,
    Game3AudioRound2,
    Game3AudioRound3,
    Game3AudioRound4,
    Game3AudioRound5,
    Game3AudioRound6,
    Game3AudioRound7,
    Game3AudioRound8,
  } = assets.audio;

  const [answers, setAnswers] = useState([
    { name: "q1", answer: "" },
    { name: "q2", answer: "" },
    { name: "q3", answer: "" },
  ]);

  const getAudio = () => {
    if (team?.playing?.round === 1) return Game3AudioRound1;
    if (team?.playing?.round === 2) return Game3AudioRound2;
    if (team?.playing?.round === 3) return Game3AudioRound3;
    if (team?.playing?.round === 4) return Game3AudioRound4;
    if (team?.playing?.round === 5) return Game3AudioRound5;
    if (team?.playing?.round === 6) return Game3AudioRound6;
    if (team?.playing?.round === 7) return Game3AudioRound7;
    if (team?.playing?.round === 8) return Game3AudioRound8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      answers[0].answer === "" ||
      answers[1].answer === "" ||
      answers[2].answer === ""
    )
      return setErrors({
        q1: answers[0].answer === "",
        q2: answers[1].answer === "",
        q3: answers[2].answer === "",
      });
    if (!checkAnswersValidation(answers))
      return setErrors({
        customError: "Elke keuze moet 1 keer gebruikt worden",
      });

    if (team?.played?.length >= 6) {
      update(team_ref, {
        ...team,
        gs3Answers: team?.gs3Answers
          ? [
              ...team?.gs3Answers,
              {
                round: team?.playing?.roundData?.round,
                answer: [
                  answers[0].answer,
                  answers[1].answer,
                  answers[2].answer,
                ],
              },
            ]
          : [
              {
                round: team?.playing?.roundData?.round,
                answer: [
                  answers[0].answer,
                  answers[1].answer,
                  answers[2].answer,
                ],
              },
            ],
        total_done: increment(1),
      });
      update(team_ref, {
        playing: {
          step: 5,
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
      update(team_ref, {
        ...team,
        gs3Answers: team?.gs3Answers
          ? [
              ...team?.gs3Answers,
              {
                round: team?.playing?.roundData?.round,
                answer: [
                  answers[0].answer,
                  answers[1].answer,
                  answers[2].answer,
                ],
              },
            ]
          : [
              {
                round: team?.playing?.roundData?.round,
                answer: [
                  answers[0].answer,
                  answers[1].answer,
                  answers[2].answer,
                ],
              },
            ],
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
  };

  const handleDev = (e) => {
    e.preventDefault();
    if (team?.playing?.round === 8) {
      update(team_ref, {
        ...team,
        gs3Answers: team?.gs4Answers
          ? [
              ...team?.gs4Answers,
              { round: team?.playing?.roundData?.round, answer: input },
            ]
          : [{ round: team?.playing?.roundData?.round, answer: input }],
        playing: {
          ...team.playing,
          step: 6,
        },
        finished_time: Date.now(),
        total_time: differenceInSeconds(Date.now(), team.start_time ?? 0),
        calc_time:
          differenceInSeconds(Date.now(), team.start_time ?? 0) +
          (team?.hints_penalty ?? 0) * 60 -
          (team.diffText ? 5 * 60 : 0),
      });
    } else {
      update(team_ref, {
        ...team,
        gs3Answers: team?.gs4Answers
          ? [
              ...team?.gs4Answers,
              { round: team?.playing?.roundData?.round, answer: input },
            ]
          : [{ round: team?.playing?.roundData?.round, answer: input }],
        playing: {
          ...team.playing,
          step: 4,
        },
      });
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    update(team_ref, {
      playing: {
        ...team?.playing,
        step: 2,
      },
    });
  };

  return (
    <Stack className="bg-full" paddingTop={10}>
      <Whitespace height={15} />
      <Stack direction="column" justifyContent="center" padding={5} spacing={3}>
        <DevButton onClick={handleDev} />

        <Typography
          textAlign={"left"}
          variant="h1"
          fontSize={30}
          marginBottom={-2}
          fontWeight={900}
          color={"var(--color-2)"}
        >
          Well done!
        </Typography>
        <Typography
          textAlign={"left"}
          variant="p"
          fontSize={16}
          fontWeight={900}
          color={"var(--color-2)"}
        >
          Luister dit audiofragment
        </Typography>
        <Stack alignItems="center" justifyContent={"center"}>
          <Audio audio={getAudio()} />
          {!openText && (
            <Typography
              variant="p"
              color="black"
              onClick={() => setOpenText(true)}
              sx={{
                cursor: "pointer",
                color: "var(--color-5)",
                textDecoration: "underline",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              {t("preferToRead")}
            </Typography>
          )}
          {openText && (
            <Stack pt={2.5}>
              <Typography
                variant="p"
                onClick={() => setOpenText(false)}
                sx={{
                  cursor: "pointer",
                  color: "var(--color-5)",
                  textDecoration: "underline",
                }}
                textAlign="center"
              >
                {t("hideText")}
              </Typography>
              <Typography
                variant="p"
                textAlign="left"
                pt={2}
                whiteSpace="pre-line"
                color={"var(--color-3)"}
              >
                {team?.playing?.roundData?.game3t1}
              </Typography>
            </Stack>
          )}
        </Stack>

        <Typography
          variant="h1"
          fontSize={20}
          color={"var(--color-2)"}
          fontWeight={900}
        >
          Put those in the right order
        </Typography>
        {[1, 2, 3].map((questionNo) => (
          <Answer
            key={questionNo}
            setAnswers={setAnswers}
            answers={answers}
            qasheet={team?.playing?.roundData?.gs3answer}
            questionNo={questionNo}
            errors={errors}
          />
        ))}
        {errors?.customError && (
          <Typography color="#ef5350" px={3}>
            {errors.customError}
          </Typography>
        )}
        <Stack width="100%">
          <Whitespace height={20} />
          <CustomButtonPrimary handleEvent={handleSubmit}>
            {t("send")}
          </CustomButtonPrimary>
          <Whitespace height={20} />
          <CustomButtonSecondary handleEvent={handleBack}>
            {t("back")}
          </CustomButtonSecondary>
          <Whitespace height={40} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Game3;
