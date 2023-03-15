import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "pages/home/home.page";
import LoginPage from "pages/login/login.page";
import ProfilePage from "pages/profile/profile.page";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {themeSettings} from "./config/theme";

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode] );
  return (
    <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage/>} />
              <Route path="*" element={<h1>Page Not Found 404</h1>} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
