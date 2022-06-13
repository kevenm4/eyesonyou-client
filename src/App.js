import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import NavComp from "./components/NavComp";
import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostFormPage from "./pages/CreatePostFormPage";
import CreateEventFormPage from "./pages/CreateEventFormPage";
import SearchPage from "./pages/SearchPage";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <NavComp />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/feed"
            element={
              <IsPrivate>
                <FeedPage />
              </IsPrivate>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
      
          <Route
            path="/createpost"
            element={
              <IsPrivate>
                <CreatePostFormPage />
              </IsPrivate>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <IsPrivate>
                <EditProfile />
              </IsPrivate>
            }
          />
          <Route
            path="/createevent"
            element={
              <IsPrivate>
                <CreateEventFormPage />
              </IsPrivate>
            }
          />
          <Route
            path="/search"
            element={
              <IsPrivate>
                <SearchPage />
              </IsPrivate>
            }
          />
          <Route
            path="/userprofile/:userId"
            element={
              <IsPrivate>
                <UserProfile />
              </IsPrivate>
            }
          />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
