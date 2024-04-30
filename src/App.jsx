import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import SingleSpot from "./pages/SingleSpot";
import SpotsOfSingleCountry from "./pages/SpotsOfSingleCountry";
import NotFound from "./pages/NotFound";
import ShowAllSpots from "./pages/ShowAllSpots";
import AddSpot from "./pages/AddSpot";
import MyLists from "./pages/MyLists";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWithNavbar>
              <Home />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/signin"
          element={
            <LayoutWithNavbar>
              <SignIn />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/register"
          element={
            <LayoutWithNavbar>
              <Register />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <LayoutWithNavbar>
              <ForgotPassword />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/spots"
          element={
            <LayoutWithNavbar>
              <ShowAllSpots />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/profile"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          path="/mylist"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/mylist" element={<MyLists />} />
        </Route>
        <Route
          path="/addspot"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/addspot" element={<AddSpot />} />
        </Route>
        <Route
          path="/spot/:id"
          element={
            <LayoutWithNavbar>
              <PrivateRoute />
            </LayoutWithNavbar>
          }
        >
          <Route path="/spot/:id" element={<SingleSpot />} />
        </Route>
        <Route
          path="/country/:country_Name/:countryId"
          element={
            <LayoutWithNavbar>
              <SpotsOfSingleCountry />
            </LayoutWithNavbar>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const shouldShowNavbar = (pathname) => {
  // List of paths where the Navbar should not be shown
  const noNavbarPaths = ["/not-found"];

  return !noNavbarPaths.includes(pathname);
};
const LayoutWithNavbar = ({ children }) => {
  const location = useLocation();
  const showNavbar = shouldShowNavbar(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="content">{children}</div>
      {showNavbar && <Footer />}
    </>
  );
};
export default App;
