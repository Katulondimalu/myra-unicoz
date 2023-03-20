import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "../utils/languages";
import { child, set } from "firebase/database";

const HintButton = ({ hint, number, team_ref, team }) => {
  let t = useTranslation();

  const [clickHint, setClickHint] = useState(false);
  return (
    <Stack
      style={{
        background: "var(--color-1)",
        borderRadius: 5,
        width: "100%",
        height: clickHint ? "130px" : "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        marginBottom: -20,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        style={{
          fontSize: "1.5em",
          color: "var(--color-white)",
          width: "100%",
        }}
        onClick={(e) => {
          setClickHint(!clickHint);
        }}
      >
        <LockIcon style={{ marginRight: 10 }} />
        {clickHint ? "Are you sure ? " : `Hint ${number}`}
      </Stack>
      {clickHint && (
        <Stack
          direction={"row"}
          bgcolor={"var(--color-white)"}
          width={"100%"}
          height={40}
          marginTop={3}
        >
          <Button
            onClick={() => {
              set(
                child(team_ref, "hints_penalty"),
                (team.hints_penalty ?? 0) + hint.penalty_minutes
              );
              hint.onBuy();
            }}
            sx={{
              borderRadius: "0px 0px 5px 5px",
              background: "filled",
              color: "var(--color-white)",
              backgroundColor: "var(--color-2)",
              boxShadow: 0,
              height: "60px",
              "&:hover": {
                backgroundColor: "var(--color-1)",
                boxShadow: 0,
              },
              marginBottom: 2,
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setClickHint(!clickHint);
            }}
            sx={{
              borderRadius: "0px 0px 5px 5px",
              background: "filled",
              color: "var(--color-1)",
              backgroundColor: "var(--color-3)",
              boxShadow: 0,
              height: "60px",
              "&:hover": {
                backgroundColor: "var(--color-1)",
                color: "var(--color-white)",
                boxShadow: 0,
              },
              marginBottom: 2,
            }}
          >
            No
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default HintButton;
