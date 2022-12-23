import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

import AddEmployee from "./components/admin_screens/addemployee";
import AddDesignation from "./components/admin_screens/adddesignation";
import Header from "./components/admin_screens/header";
import Sidebar from "./components/admin_screens/sidebar";
import Dashboard from "./components/admin_screens/dashboard";
import Users from "./components/admin_screens/users";
import Viewdesignation from "./components/admin_screens/viewdesignation";
import Userdetails from "./components/admin_screens/userdetails";
import PrivateComponent from "./components/privateComponent/privateComponent";
import eventEmitter from "./components/Event/Event";
import SidebarManager from "./components/manager_screens/sidebar";
import SidebarTeamMember from "./components/teamMember_screen/sidebar";
import DashboardManager from "./components/manager_screens/dashboard";
import HeaderManager from "./components/manager_screens/header";
import HeaderTeamMember from "./components/teamMember_screen/header";
import DashboardTeamMember from "./components/teamMember_screen/dashboard";
import ViewTeamMember from "./components/manager_screens/viewteams";
import AssignTask from "./components/manager_screens/assigntask";
import AddTask from "./components/manager_screens/addtask";
import UserProfile from "./components/admin_screens/userprofile";
import UserProfileManager from "./components/manager_screens/userprofile";
import UserProfileTeamMember from "./components/teamMember_screen/userprofile";
import Login from "./components/Login/login";
import ViewTasks from "./components/manager_screens/viewtasks.js";
import Viewreport from "./components/manager_screens/viewreport";
import ViewTaskTeamMember from "./components/teamMember_screen/viewtasks";
import UpdateTask from "./components/manager_screens/updatetask";
import UpdateUserProfile from "./components/manager_screens/updateuserprofile";
import UpdatePassword from "./components/manager_screens/updatepassword";
import UserProfileAdmin from "./components/admin_screens/userprofile";
import UpdateUserProfileAdmin from "./components/admin_screens/updateuserprofile";
import UpdateUserProfileManager from "./components/manager_screens/updateuserprofile";
import UpdateUserProfileTeamMember from "./components/teamMember_screen/updateuserprofile";

function App() {
  const [hide, setHide] = useState(false);
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  useEffect(() => {
    setAuth(localStorage.getItem("token"));
    setUser(localStorage.getItem("user"));
    setUserName(localStorage.getItem("name"));
  }, [UpdateUserProfile]);

  const sidebar = () => {
    if (hide === false) {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  eventEmitter.removeAllListeners("reloadHeader");
  eventEmitter.on("reloadHeader", (isUser) => {
    if (isUser) {
      setAuth(localStorage.getItem("token"));
      setUser(localStorage.getItem("user"));
      setUserName(localStorage.getItem("name"));
    } else {
      setAuth("");
    }
  });

  return (
    <>
      <BrowserRouter>
        {user === "Admin" ? (
          <div className="container-fluid">
            <div className="row">
              {auth ? <Sidebar hidden={hide} /> : ""}

              <div className="col">
                {auth ? (
                  <Header
                    sidebarhide={sidebar}
                    hide={hide}
                    logginBy={userName}
                  />
                ) : (
                  ""
                )}
                <div className="row">
                  <Routes>
                    <Route element={<PrivateComponent />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/addemployee" element={<AddEmployee />} />
                      <Route
                        path="/adddesignation"
                        element={<AddDesignation />}
                      />
                      <Route
                        path="/viewdesignation"
                        element={<Viewdesignation />}
                      />
                      <Route
                        path="/profile/:id"
                        element={<UserProfileAdmin />}
                      />
                      <Route path="/userslist" element={<Users />} />
                      <Route
                        path="/userdetails/:id"
                        element={<Userdetails />}
                      />
                      <Route
                        path="/editprofile/:id"
                        element={<UpdateUserProfileAdmin />}
                      />
                      <Route
                        path="/updatepassword/:id"
                        element={<UpdatePassword />}
                      />
                    </Route>
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {user === "Manager" ? (
          <div className="container-fluid">
            <div className="row">
              {auth ? <SidebarManager hidden={hide} /> : ""}

              <div className="col">
                {auth ? (
                  <HeaderManager
                    sidebarhide={sidebar}
                    hide={hide}
                    logginBy={userName}
                  />
                ) : (
                  ""
                )}
                <div className="row">
                  <Routes>
                    <Route element={<PrivateComponent />}>
                      <Route path="/" element={<DashboardManager />} />
                      <Route
                        path="/viewteammembers"
                        element={<ViewTeamMember />}
                      />
                      <Route
                        path="/profile/:id"
                        element={<UserProfileManager />}
                      />
                      <Route path="/assigntask" element={<AssignTask />} />
                      <Route path="/addtask" element={<AddTask />} />
                      <Route path="/viewtask" element={<ViewTasks />} />
                      <Route path="/updatetask/:id" element={<UpdateTask />} />
                      <Route path="/viewreport/:id" element={<Viewreport />} />
                      <Route
                        path="/editprofile/:id"
                        element={<UpdateUserProfileManager />}
                      />
                      <Route
                        path="/updatepassword/:id"
                        element={<UpdatePassword />}
                      />
                    </Route>
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {user === "Team Member" ? (
          <div className="container-fluid">
            <div className="row">
              {auth ? <SidebarTeamMember hidden={hide} /> : ""}

              <div className="col">
                {auth ? (
                  <HeaderTeamMember
                    sidebarhide={sidebar}
                    hide={hide}
                    logginBy={userName}
                  />
                ) : (
                  ""
                )}
                <div className="row">
                  <Routes>
                    <Route element={<PrivateComponent />}>
                      <Route path="/" element={<DashboardTeamMember />} />
                      <Route
                        path="/profile/:id"
                        element={<UserProfileTeamMember />}
                      />
                      <Route
                        path="/viewtaskteammember"
                        element={<ViewTaskTeamMember />}
                      />
                      <Route
                        path="/editprofile/:id"
                        element={<UpdateUserProfileTeamMember />}
                      />
                      <Route
                        path="/updatepassword/:id"
                        element={<UpdatePassword />}
                      />
                    </Route>
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {user === null ? (
          <div className="container-fluid">
            <div className="row">
              {auth ? <Sidebar hidden={hide} /> : ""}

              <div className="col">
                {auth ? (
                  <Header
                    sidebarhide={sidebar}
                    hide={hide}
                    logginBy={userName}
                  />
                ) : (
                  ""
                )}
                <div className="row">
                  <Routes>
                    <Route element={<PrivateComponent />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/addemployee" element={<AddEmployee />} />
                      <Route
                        path="/adddesignation"
                        element={<AddDesignation />}
                      />

                      <Route
                        path="/viewdesignation"
                        element={<Viewdesignation />}
                      />
                      <Route path="/profile/:id" element={<UserProfile />} />
                      <Route path="/userslist" element={<Users />} />
                      <Route
                        path="/userdetails/:id"
                        element={<Userdetails />}
                      />
                      <Route path="/" element={<DashboardTeamMember />} />
                      <Route
                        path="/profile/:id"
                        element={<UserProfileTeamMember />}
                      />
                      <Route
                        path="/viewtaskteammember"
                        element={<ViewTaskTeamMember />}
                      />
                    </Route>
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
