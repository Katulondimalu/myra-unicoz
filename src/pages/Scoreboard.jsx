import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { equalTo, orderByChild, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonPrimary from "../components/button/CustomButtonPrimary";
import Whitespace from "../components/common/Whitespace";
import { database, useFirebase } from "../utils/firebase";
import { sortedGamesByScore } from "../utils/helper";

const Scoreboard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [todayGames, setTodayGames] = useState([]);

  const today_games = useFirebase(
    query(
      ref(database, `games`),
      orderByChild(`date`),
      equalTo(`${format(new Date(), "dd-MM-yyyy")}`)
    )
  );

  useEffect(() => {
    if (today_games === undefined || today_games === null) return;
    setTodayGames(sortedGamesByScore(today_games));
  }, [today_games]);

  return (
    <Stack p={1} textAlign="center" px={3}>
      <Whitespace height={30} />
      <Typography
        variant="h1"
        fontSize={25}
        fontWeight={900}
        textAlign="center"
      >
        Scoreboard
      </Typography>
      <Whitespace height={30} />
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #01689B",
          borderRadius: 2,
          minHeight: 350,
          maxHeight: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ "th,tr,td": { fontWeight: "bold" } }}>
              <TableCell>Rang</TableCell>
              <TableCell align="center">Naam</TableCell>
              <TableCell align="center">Tijd</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todayGames.length > 0 &&
              todayGames?.map((game, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th, td, th": { border: 0 },
                    height: 30,
                  }}
                  hover={true}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      color: state?.team_id === game?.team_id && "#01689B",
                      fontWeight: state?.team_id === game?.team_id && "bold",
                      fontSize: state?.team_id === game?.team_id && 17,
                    }}
                  >
                    #{index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: state?.team_id === game?.team_id && "#01689B",
                      fontWeight: state?.team_id === game?.team_id && "bold",
                      fontSize: state?.team_id === game?.team_id && 17,
                    }}
                  >
                    {game?.team_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: state?.team_id === game?.team_id && "#01689B",
                      fontWeight: state?.team_id === game?.team_id && "bold",
                      fontSize: state?.team_id === game?.team_id && 17,
                    }}
                  >
                    {game?.calc_time <= 0
                      ? "00:00"
                      : format(game?.calc_time * 1000, "mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Whitespace height={50} />
      <CustomButtonPrimary handleEvent={() => navigate("/")}>
        Home
      </CustomButtonPrimary>
      <Whitespace height={30} />
    </Stack>
  );
};

export default Scoreboard;
