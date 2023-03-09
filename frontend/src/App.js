import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "pages/home/home.page";
import LoginPage from "pages/login/login.page";
import ProfilePage from "pages/profile/profile.page";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage/>} />
            <Route path="*" element={<h1>Page Not Found 404</h1>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
