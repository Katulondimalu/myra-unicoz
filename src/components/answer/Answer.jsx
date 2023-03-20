import { Stack, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useTranslation } from "../../utils/languages";

const Answer = ({ setAnswers, answers, qasheet, questionNo, errors }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslation();
  const handleChange = (event) => {
    const { value, name } = event.target;
    const newAnswers = answers.map((answer) => {
      if (answer.name === name) {
        return { ...answer, answer: value };
      }
      return answer;
    });
    setAnswers(newAnswers);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={2}
      px={3}
    >
      <Typography
        variant="h1"
        fontSize={20}
        fontWeight={900}
        color="var(--color-5)"
      >
        {questionNo}.
      </Typography>
      <FormControl sx={{ width: 250 }}>
        <InputLabel id="demo-controlled-open-select-label">
          {t("selectCorrectAnswer")}
        </InputLabel>
        <Select
          // labelId="demo-controlled-open-select-label"
          // id="demo-controlled-open-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={answers[questionNo - 1].answer}
          label="Select Correct Answer"
          onChange={handleChange}
          name={answers[questionNo - 1].name}
          error={errors[answers[questionNo - 1].name]}
        >
          <MenuItem value="">
            <em>{t("none")}</em>
          </MenuItem>
          {qasheet?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Answer;
