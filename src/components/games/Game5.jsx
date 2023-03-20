import { Stack, Typography } from "@mui/material";
import { differenceInSeconds } from "date-fns";
import { increment, update } from "firebase/database";
import { useNavigate, useOutletContext } from "react-router-dom";
import CustomButtonPrimary from "../button/CustomButtonPrimary";
import Whitespace from "../common/Whitespace";

const Game5 = () => {
  const navigate = useNavigate();
  const [team, team_ref] = useOutletContext();
  const handleSubmit = () => {
    update(team_ref, {
      ...team,
      played: team?.played
        ? [...team.played, team?.playing?.roundData?.round]
        : [team?.playing?.roundData?.round],
      total_done: increment(1),
    });
    update(team_ref, {
      playing: {
        step: 1,
      },
    });
    if (team?.played?.length !== 7) return navigate("../play");
    const total_time = differenceInSeconds(Date.now(), team.start_time ?? 0);
    update(team_ref, {
      playing: {
        step: 6,
      },
      finished_time: Date.now(),
      total_time: total_time,
      calc_time:
        total_time +
        (team?.hints_penalty ?? 0) * 60 -
        (team.diffText ? 5 * 60 : 0),
    });
  };

  return (
    <Stack p={1} px={2}>
      <Whitespace height={10} />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Typography
          variant="h1"
          fontSize={30}
          fontWeight={700}
          textAlign="center"
        >
          {team?.playing?.roundData?.name}
        </Typography>
        <Typography
          variant="h1"
          fontSize={20}
          fontWeight={700}
          textAlign="center"
        >
          Goed gedaan! <br /> {team?.team_name}
        </Typography>
        <Typography variant="p" px={3} className="new-line">
          {team?.playing?.roundData?.gs5t1}
        </Typography>
        <Whitespace height={10} />
        <Stack width="100%" px={2}>
          <CustomButtonPrimary handleEvent={handleSubmit}>
            Volgende
          </CustomButtonPrimary>
        </Stack>
        <Whitespace height={10} />
      </Stack>
    </Stack>
  );
};

export default Game5;
