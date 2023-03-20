import { Box } from "@mui/material";
import { useState } from "react";
import assets from "../../assets";

const Audio = ({ audio }) => {
  const [player, setplayer] = useState(false);
  return (
    <div>
      {player ? (
        <audio controls autoPlay src={audio} onEnded={() => setplayer(false)} />
      ) : (
        <Box
          component="img"
          sx={{
            cursor: "pointer",
          }}
          alt="logo"
          src={assets.audio_play}
          onClick={() => setplayer(!player)}
        />
      )}
    </div>
  );
};

export default Audio;
