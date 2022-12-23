import React from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../img/user1.png";
import eventEmitter from "../Event/Event";

const HeaderManager = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");

    // window.location.reload();
    eventEmitter.emit("reloadHeader", false);
  };

  return (
    <>
      <div>
        <nav className="col-md-12 d-flex justify-content-between justify-content-center p-0 py-3 ">
          <button
            className="btn btn-default btn-dark mb-1"
            onClick={props.sidebarhide}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="user d-flex align-items-baseline profile-area">
            <div className="user-img me-2">
              <img src={user} alt="" />
            </div>
            <h6 className="color admin">
              {props.logginBy}
              <div className="dropdown profile-area">
                <button
                  className="btn  dropdown-toggle"
                  data-bs-toggle="dropdown"
                ></button>
                <ul
                  className="dropdown-menu header-profile bg-light text-center w-100"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link
                      className="px-4 header-profile-inner"
                      to={`/profile/${localStorage.getItem("LogginId")}`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="my-2 ">
                    <Link
                      to={`/updatepassword/${localStorage.getItem("LogginId")}`}
                      className="px-0 header-profile-inner my-5"
                    >
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={logout}
                      to="/login"
                      className="px-4 header-profile-inner"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </h6>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HeaderManager;
