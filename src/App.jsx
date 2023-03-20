import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GameLayout from "./components/layout/GameLayout";
import SuspenseFallback from "./components/SuspenseFallback";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import NoGame from "./pages/NoGame";
import NotFound from "./pages/NotFound";

const theme = createTheme({
  typography: {
    fontFamily: "fira-sans",
  },

  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ".MuiInputLabel-root": {
            color: "var(--color-white)",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          "& .MuiInputLabel-root.Mui-focused": {
            color: "var(--color-white)",
          },

          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-white)",
            },
            "& fieldset": {
              borderColor: "var(--color-white)",
            },
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<SuspenseFallback />}>
        <Stack>
          <Routes>
            <Route path="/">
              <Route index element={<NoGame />} />
              <Route path=":language">
                <Route index element={<LandingPage />} />
                <Route path="admin">
                  <Route index element={<Home />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Stack>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
