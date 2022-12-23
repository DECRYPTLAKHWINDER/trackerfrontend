import React from "react";
import { Link } from "react-router-dom";

const DashboardTeamMember = () => {
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
                <div className="card p-4 h-100">
                  <div className="card-icon text-center">
                    <i className="fa-solid fa-eye"></i>
                  </div>
                  <div className="card-body">
                    <div className="font3">
                      <h4 className="text-center fs-5">
                        <Link to="/viewtaskteammember"> View Tasks</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card p-4 h-100">
                  <div className="card-icon text-center">
                    <i className="fa-solid fa-check-to-slot"></i>
                  </div>
                  <div className="card-body">
                    <div className="font3">
                      <h4 className="text-center fs-5">
                        <Link to="/adddesignation"> Completed Tasks</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card p-4 h-100">
                  <div className="card-icon text-center">
                    <i className="fa-solid fa-bell"></i>
                  </div>
                  <div className="card-body">
                    <div className="font3">
                      <h4 className="text-center fs-5">
                        <Link to="/addemployee">Notifications</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTeamMember;
