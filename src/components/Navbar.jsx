import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { routeLists } from "../utils";
import logo from "/logo.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

export default function Navbar() {
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  const logoutHandler = () => {
    logout();
  };
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="navbar bg-primary px-[20px] md:px-[100px] py-[18px]  font-poppins ">
      <Tooltip id="avatar" />
      <div className="navbar-start">
        <div className="dropdown z-50">
          <div
            tabIndex={0}
            role="button"
            className="pl-0 btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {routeLists?.map((route) => (
              <li key={route.path}>
                <NavLink to={route.path} className={`btn btn-ghost ${
                  !currentUser && (route.path === "/add-spot" || route.path === "/my-list") && "hidden"
                }`}>
                  {route.routeName}
                </NavLink>
              </li>
            ))}
            {currentUser ? (<li>
              <button
                onClick={logoutHandler}
                className="w-full py-2 px-[13px] bg-primary text-white rounded-[8px] font-semibold text-base flext justify-center mt-3"
              >
                Logout
              </button>
              </li>) : null}
          </ul>
        </div>
        <Link to="/" className=" text-xl ml-0 flex items-center gap-3">
          <img src={logo} alt="brand-logo" />
          <span className="text-white mt-[9px] font-extrabold">TRAVEL</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex items-center ">
        <div className="flex flex-row gap-8 px-1">
          {routeLists?.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={`${
                pathMatchRoute(route.path)
                  ? "text-white font-medium  border-b-[2px] border-b-[#4f1410c8]"
                  : ""
              } ${
                !currentUser && (route.path === "/add-spot" || route.path === "/my-list") && "hidden"
              } leading-[120%] text-white`}
            >
              {route.routeName}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="navbar-end">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="avatar dropdown dropdown-end">
              <div
                className="w-10 rounded-full ring-2 ring-[#FEFEFF] "
                tabIndex={0}
                data-tooltip-id="avatar"
                data-tooltip-content={currentUser?.displayName}
                data-tooltip-place="left-start"
                data-tooltip-class-name="custom-tooltip"
              >
                <img src={currentUser?.photoURL} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[99999] menu py-2 px-8 shadow bg-base-100 rounded-box  mt-4 flex flex-col gap-2 font-poppins"
              >
                <li className="font-bold whitespace-nowrap">
                  {currentUser?.displayName}
                </li>
                <Link to="/profile" className="py-2 px-[13px] bg-primary text-white rounded-[8px] font-semibold  ">
                  Update Profile
                </Link>
              </ul>
            </div>
            <button
              onClick={logoutHandler}
              className="py-2 px-[13px] bg-[#FEFEFF] text-primary rounded-[8px] font-semibold text-xl max-md:hidden"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavLink
              to="/signin"
              className={`${
                pathMatchRoute("/signin")
                  ? " border-[1px] border-[#4f1410c8]"
                  : ""
              } py-2 px-[13px] bg-[#FEFEFF] text-primary rounded-[8px] font-semibold text-xl`}
            >
              Login ➝
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
