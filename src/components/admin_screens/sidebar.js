import React from "react";
import { Link } from "react-router-dom";
import img from "../../img/TRACKER-D.png";
import logo from "../../img/decrypt.png";

const Sidebar = (props) => {
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
            <ul className="nav nav-pills d-block w-100 p-auto">
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
                  <i className="fa-solid fa-user me-2"></i>
                  <span className="ms-1 d-none d-sm-inline pe-2">
                    Designations{" "}
                  </span>
                  <i className="fa-solid fa-angle-right icon"></i>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu2"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/viewdesignation" className="nav-link px-0 links">
                      <i className="fa-solid fa-eye me-2"></i>
                      <span className="d-none d-sm-inline">
                        View Designation
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/adddesignation" className="nav-link px-0 links">
                      <i className="fa-solid fa-plus me-2"></i>
                      <span className="d-none d-sm-inline">
                        Add Designation
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle links"
                >
                  <i className="fa fa-users me-2"></i>
                  <span className="ms-1 d-none d-sm-inline pe-2">
                    Employees
                  </span>
                  <i className="fa-solid fa-angle-right icon"></i>
                </a>
                <ul
                  className="collapse nav flex-column ms-1"
                  id="submenu3"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/userslist" className="nav-link px-0 links">
                      <i className="fa-solid fa-eye me-2"></i>
                      <span className="d-none d-sm-inline">View Employees</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/addemployee" className="nav-link px-0 links">
                      <i className="fa-solid fa-plus me-2"></i>
                      <span className="d-none d-sm-inline">Add Employee</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <hr />
            <footer className="px-2 mb-3 position-absolute bottom-0">
              <img src={logo} alt="" />
            </footer>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Sidebar;
