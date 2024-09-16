import React, { useContext } from "react";
import "./Content.css";
import { Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../context/userContext";
import usericon from "../../assets/profile.png";
import { Link } from "react-router-dom";

const ContentHeader = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex ml-9">
      <div className="flex flex-row justify-between gap-5">
        <div className="search-box">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="1x"
            inverse
            className="con-icon"
          />
          <input type="text" placeholder="Search anything here..." />
        </div>

        <div className="user1-profile">
          <Tooltip
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">View Profile</div>
                <div className="text-tiny">
                  This function will view your profile information.
                </div>
              </div>
            }
          >
            <Link to={`/${user.role.toLowerCase()}Profile`}>
              <img src={usericon} alt="" className="profile-icon" />
            </Link>
          </Tooltip>
          <div className="user-details">
            {!!user && <h5>Hi {user.FirstName}!</h5>}
            {!!user && <h4>{user.role}</h4>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
