import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const AppBar = () => {
  const Links = [
    { name: "MOVIES", link: "/movies" },
    { name: "TRENDING", link: "/trending" },
    { name: "FAVOURITE", link: "/" },
    { name: "SEARCH", link: "/search" },
  ];
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  const [open, setOpen] = useState(false);
  return user ? (
    <div className=" text-white sticky top-0 z-50 shadow-md w-full relative top-0 left-0">
      <div className=" md:flex items-center justify-between bg-white py-4 md:px-10 px-7 ">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2"></span>
          <span onClick={() => window.scroll(0, 0)}>BEST MOVIES INC</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <LogoutIcon
            onClick={handleLogout}
            className=" md:ml-8 text-xl md:my-0 my-7 text-gray-800 hover:text-gray-400 duration-500"
          >
            Logout
          </LogoutIcon>
        </ul>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AppBar;
