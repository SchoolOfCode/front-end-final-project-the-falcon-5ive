//React
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Hoc
import AuthGuard from "../../Hoc/authGuard";
import ProfilePage from "../Profile/profile";

//Pages
import SignIn from "../SignInUser/signin";
import Homepage from "../Homepage/homepage";
import CreateEvent from "../CreateEvent/createEvent.js";
import Maps from "../../Components/Maps/maps.js";
import MapTwo from "../../Components/Map/map.js";
import GetAllEvents from "../Events/events.js";
import BootcamperProfilePage from "../BootcamperProfile/Bootcamper";

import Resources from "../Resources/resources.js";

import Landing from "../Landing/landing";

import Signup from "../../Components/Signup/signup";

import Event from "../../Components/Event/event.js";

import Contact from "../Contact/contact";

import Alumni from "../Alumni/Alumni";

import ReactUploadImage from "../../Components/Upload/upload.js";

import MyEvents from "../../Pages/MyEvents/myEvents.js";

//Components
import { user } from "../../Components/userData";
import NavBar from "../../Components/NavBar/nav";
import CloudinaryImage from "../../Components/CloudinaryImage/cloudinaryImage.js";

//styling
import style from "./index.module.css";

export default function Index() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <AuthGuard component={Homepage} path={"/"} props={user} exact />
        <Route path="/login" component={SignIn}></Route>
        <AuthGuard
          component={ProfilePage}
          path={"/profile"}
          props={user}
          exact
        />
        <AuthGuard
          component={CreateEvent}
          path={"/CreateEvent"}
          props={user}
          exact
        />
        <AuthGuard
          component={GetAllEvents}
          path={"/events"}
          props={user}
          exact
        />
        <AuthGuard component={BootcamperProfilePage} path={"/bootcamper/:id"} />
        {/* <Route path={"/bootcamper/:id"} exact>
          <BootcamperProfilePage />
        </Route> */}

        <Route path={"/landing"} exact>
          <Landing />
        </Route>

        <AuthGuard component={Event} path={"/event"} props={user} exact />

        <AuthGuard component={Contact} path={"/contact"} exact />

        <AuthGuard component={ReactUploadImage} path={"/uploadimage"} exact />

        <AuthGuard component={CloudinaryImage} path={"/image"} exact />

        <AuthGuard component={MyEvents} path={"/myevents"} exact />

        <AuthGuard component={Alumni} path={"/alumni"} exact />

        <AuthGuard
          component={Resources}
          path={"/resources"}
          props={user}
          exact
        />

        {/* For Development Purposes */}

        {/* <AuthGuard component={MapTwo} path={"/mapTwo"} props={user} exact /> */}
      </Switch>
    </Router>
  );
}
