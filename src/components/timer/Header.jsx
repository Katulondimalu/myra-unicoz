import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Stack, Typography } from "@mui/material";
import { differenceInSeconds } from "date-fns";
import { update } from "firebase/database";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import { secondsToMinutes } from "../../utils/helper";
import { useDate } from "../../utils/use";

const Header = ({ onPrev, team, team_ref }) => {
  if (team?.start_time === null || team?.start_time === undefined) {
    return null;
  }
  let date = useDate();
  let remainTime = differenceInSeconds(
    team?.start_time,
    team?.finished_time ?? date
  );

  useEffect(() => {
    if (team?.playing?.step === 3) {
      let time_freezed = remainTime;
      if (team?.playing?.status !== "paused") {
        update(team_ref, {
          ...team,
          playing: {
            ...team.playing,
            status: "paused",
            time_freezed: time_freezed,
            date_freezed: date,
            updated: false,
          },
        });
      }
    }
    if (team?.playing?.step === 1) {
      const startDate = new Date(team?.start_time);
      let diff_time = (remainTime - team?.playing?.time_freezed) * -1;
      if (!team?.playing?.updated) {
        update(team_ref, {
          ...team,
          playing: {
            ...team.playing,
            status: "started",
            updated: true,
          },
          start_time: startDate.setSeconds(startDate.getSeconds() + diff_time),
        });
      } else {
        update(team_ref, {
          ...team,
          playing: {
            ...team.playing,
            status: "started",
            updated: true,
          },
        });
      }
    }
  }, [team?.playing?.step]);

  return (
    <div
      id="floating-component"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: "100",
        left: "50%",
        top: "20px",
        // top: "100px",
        // right: "3%",
        transform: "translate(-50%, 40%)",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: "5px 5px ",
        padding: "0 20px",
      }}
    >
      <Typography
        variant="p"
        ml={1}
        fontSize={24}
        color={team?.playing?.step == 1 ? "var(--color-9)" : "var(--color-2)"}
      >
        {team?.playing?.status === "paused"
          ? secondsToMinutes(team?.playing?.time_freezed * -1)
          : secondsToMinutes(remainTime * -1)}
      </Typography>

      <div style={{ minWidth: 8 }} />
      {team?.hints_penalty && (
        <span style={{ color: "red" }}>
          {"+ "}
          {team?.hints_penalty} min
        </span>
      )}
    </div>
  );
};

export default Header;
