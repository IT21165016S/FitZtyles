import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import BreakfastPage from "./components/BreakfastPage";
import DinnerPage from "./components/DinnerPage";
import FreshfruitPage from "./components/FreshfruitPage";
import LunchPage from "./components/LunchPage";
import Navbar from "./components/Navbar";
import NavbarLogin from "./components/NavbarLogin";
import NavbarMUI from "./components/NavbarMUI";
import RecipePost from "./components/RecipePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyRecipes from "./pages/MyRecipes";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import Recipe from "./pages/Recipe";
import Signup from "./pages/Signup";
import WorkoutPage from "./pages/WorkoutPage";
import Workouts from "./pages/Workouts";
import { getUser } from "./store/actions/user.action";
import "./styles/breakfast.css";
import "./styles/home.css";
import "./styles/navbar.css";
import "./styles/recipe.css";
import { themeSettings } from "./theme";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const mode = "light";

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {user.isLogin ? <NavbarMUI /> : <NavbarLogin />}
          <div className="body">
            <Routes>
              <Route
                path="/"
                element={user.isLogin ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={!user.isLogin ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user.isLogin ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={user.isLogin ? <Profile /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/update"
                element={user.isLogin ? <ProfileUpdate /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/myRecipes"
                element={user.isLogin ? <MyRecipes /> : <Navigate to="/" />}
              />
              <Route
                path="/recipe"
                element={user.isLogin ? <Recipe /> : <Navigate to="/login" />}
              />
              <Route
                path="/breakfast"
                element={
                  user.isLogin ? <BreakfastPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/lunch"
                element={
                  user.isLogin ? <LunchPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/dinner"
                element={
                  user.isLogin ? <DinnerPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/freshfruitsandhealthydrinks"
                element={
                  user.isLogin ? <FreshfruitPage /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/recipepost"
                element={
                  user.isLogin ? <RecipePost /> : <Navigate to="/recipepost" />
                }
              />
              <Route
                path="/workouts"
                element={user.isLogin ? <Workouts /> : <Navigate to="/login" />}
              />
              <Route
                path="/workouts/create"
                element={
                  user.isLogin ? <WorkoutPage /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
