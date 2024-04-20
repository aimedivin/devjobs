import "./Header.css";
import { useEffect, useState } from "react";

import profilePhoto from '../assets/profile.png'

interface hearderProps {
  addRemoveDarkMode: () => void;
  setJobsPage: () => void;
  setProfilePage: () => void;
}

const Header = (props: hearderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState(false);

  const onSetDarkModeHandler = () => {
    props.addRemoveDarkMode();
    setDarkMode((prevData) => {
      if (prevData) return false;
      return true;
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      setProfile(() => token ? true: false);
    }
    fetchJobs();
  })

  const headerLogoHandler = () => {
    props.setJobsPage();
  }

  return (
    <div className="header">
      <div className="header__title">
        <img src={require("../assets/desktop/logo.svg").default} alt="" onClick={headerLogoHandler} />
      </div>
      <div className="header__left">
        <div className="header__actions">
          <figure>
            <img src={require("../assets/desktop/icon-sun.svg").default} alt="" />
          </figure>
          <div
            className={"light--dark-switch " + (darkMode && "dark--on")}
            onClick={onSetDarkModeHandler}
          >
            <span></span>
          </div>
          <figure>
            <img
              src={require("../assets/desktop/icon-moon.svg").default}
              alt=""
            />
          </figure>
        </div>
        {profile && <figure className="profile-photo" onClick={() => {props.setProfilePage()}}>
          <img src={profilePhoto} alt="" title="Profile" />
        </figure>
        }
      </div>
    </div>
  );
};

export default Header;
