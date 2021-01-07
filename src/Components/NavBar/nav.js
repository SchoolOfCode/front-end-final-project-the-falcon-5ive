import React, { useState } from "react";

//images
import soc from "../../Images/soc.png";

//components
import { logout } from "../../Components/Firebase/auth";

//Context
import { useUserContext } from "../../Context/userContext";

//styling
import style from "./nav.module.css";
import "./burgerStyle.css";
import "./hamburger/dist/hamburgers.css";

//router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useUserContext();
  const [hide, setHide] = useState("hide");
  const [burger, setBurger] = useState("");
  const [hideCog, setHideCog] = useState("hide");

  function signOut() {
    logout();
    setUser(null);
  }

  function changeBurger() {
    burger === "" ? setBurger("is-active") : setBurger("");
    hide === "hide" ? setHide("") : setHide("hide");

    hideCog === "hide" ? setHideCog("hide") : setHideCog("hide");
  }

  function changeHide() {
    hideCog === "hide" ? setHideCog("") : setHideCog("hide");

    burger === "is-active" ? setBurger("") : setBurger("");
    hide === "hide" ? setHide("hide") : setHide("hide");
  }

  return (
    <div className={style.navDiv}>
      <nav className={style.nav}>
        <div className="container">
          {/* Search Bar */}
          <div className={style.navContainer}>
            <ul>
              <li>
                <Link to="/">
                  <img
                    className={style.img}
                    src={soc}
                    alt="School of Code Logo"
                    height="100"
                    width="100"
                  />
                </Link>
              </li>

              <div className="menuContainer">
                {user && (
                  <Link to="/contact">
                    <li>
                      <span>Logout</span>
                    </li>
                  </Link>
                )}
                <button
                  class={`hamburger hamburger--spring ${burger} cog`}
                  type="button"
                  onClick={changeBurger}
                >
                  <span class="hamburger-box ">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>

                {/* <li onClick={changeHide}>
                  <img
                    src="https://www.flaticon.com/svg/static/icons/svg/3601/3601082.svg"
                    className={style.cog}
                  />
                </li> */}
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`burgerContent ${hide}`}>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/events">
          <p>Events</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
        <Link to="/alumni">
          <p>Alumni</p>
        </Link>
        <Link to="/resources">
          <p>Resources</p>
        </Link>
        <Link to="/contact">
          <p>Contact</p>
        </Link>
      </div>
      <div className={`burgerContent ${hideCog}`}>
        {user && (
          <p className="links" onClick={signOut}>
            Log Out
          </p>
        )}
      </div>
    </div>
  );
}
