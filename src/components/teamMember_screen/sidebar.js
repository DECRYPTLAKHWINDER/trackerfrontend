import React from "react";
import { Link } from "react-router-dom";
import img from "../../img/TRACKER-D.png";
import logo from "../../img/decrypt.png";

const SidebarTeamMember = (props) => {
  return (
    <>
      {props.hidden === true ? (
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar bg-dark "
          id="sidebar"
        >
          <div className=" d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none mt-3 "
            >
              <img src={img} alt="" width={180} />
            </Link>
            <ul className="nav nav-pills d-block w-100 p-auto" id="menu">
              <li className="nav-item">
                <Link to="/" className="nav-link align-middle px-0 links">
                  <i className="fa-solid fa-house me-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li>
                <a
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle links"
                >
                  <i className="fa-solid fa-tasks me-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Tasks</span>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link
                      to="/viewtaskteammember"
                      className="nav-link px-0 links"
                    >
                      <i className="fa-solid fa-eye me-2"></i>
                      <span className="d-none d-sm-inline">View Tasks</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/viewemployeelist"
                      className="nav-link px-0 links"
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      <span className="d-none d-sm-inline">
                        Completed Tasks
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <hr />
            <footer className="p-2 mt-5">
              <img src={logo} alt=""></img>
              <p className="text-center color-3 p-2">Made by Decrypt Block</p>
            </footer>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default SidebarTeamMember;
