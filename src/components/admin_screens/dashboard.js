import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white ">
          <div className="das-font p-4">
            <div className="font2">
              <div className="color2">
                <h4 className="fs-4">Dashboard</h4>
              </div>
            </div>
          </div>
          <div className="home p-4 pb-5">
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <Link to="/viewdesignation" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-level-up"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/viewdesignation">View Designation</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-3">
                <Link to="/adddesignation" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-circle-plus"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/adddesignation"> Add Designation</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-3">
                <Link to="/addemployee" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/addemployee">Add Employee</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-3">
                <Link to="/userslist" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-users"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/userslist">View Employees</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
