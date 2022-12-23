import React from "react";
import { Link } from "react-router-dom";

const DashboardManager = () => {
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
                <Link to="/viewteammembers" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-level-up"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/viewtask" className="card_links">
                            View Tasks
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-3">
                <Link to="/addtask" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-circle-plus"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/addtask" className="card_links">
                            Add Tasks
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-3">
                <Link to="/viewteammembers" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/assigntask" className="card_links">
                            Assign Tasks
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-lg-3">
                <Link to="/viewteammembers" className="card_links">
                  <div className="card p-4 h-100">
                    <div className="card-icon text-center">
                      <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <div className="card-body">
                      <div className="font3">
                        <h4 className="text-center fs-5">
                          <Link to="/viewteammembers" className="card_links">
                            View Team Members
                          </Link>
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

export default DashboardManager;
