import React, { useState, useEffect } from "react";
import img from "../../img/TRACKER-D.png";
import image from "../../img/TRACKER-D3.png";
import { useNavigate, Link } from "react-router-dom";
import eventEmitter from "../Event/Event";
// import toastr from "toastr";
// import api from "";
const Login = () => {
  // States
  const [loginId, setloginId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  useEffect(() => {
    fetch("http://localhost:3012/role")
      .then((response) => response.json())
      .then((json) => {
        let Roledata = json.data.map((type) => {
          return type;
        });
        setRole(Roledata);
      });
  }, []);
  const selectRole = async (e) => {
    setRoleId(e.target.value);
    const d = e.target.children;
    setRoleName(d[e.target.selectedIndex].innerText);
  };
  // fatch data from api

  // loginId and Password
  // useEffect(() => {
  //   const auth = localStorage.getItem("user");
  //   if (auth) {
  //     navigate("/");
  //   }
  // });
  const handleloginId_Userid = (e) => {
    let getloginId_Userid = e.target.value;
    // const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    setloginId(getloginId_Userid);
  };

  const handlePassword = (e) => {
    let getPassword = e.target.value;

    setPassword(getPassword);
  };

  // Login

  const login = async (e) => {
    e.preventDefault();

    if (loginId.length < 2 || password.length < 2) {
      alert("Type Correct Login Details");
    } else {
      let logindata = { loginId, password, roleId, roleName };
      let result = await fetch("http://localhost:3012/admin/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindata),
      });

      if (result.status === 200) {
        alert("Login Successfully");
        result = await result.json();
        // console.log(result[0]);
        localStorage.setItem("token", JSON.stringify(result.data.token));
        localStorage.setItem("user", result.data.name);
        localStorage.setItem("name", result.data.loggedInBy);
        localStorage.setItem("LogginId", result.data.roleId);
        navigate("/");

        // window.location.reload();
        eventEmitter.emit("reloadHeader", true);
      } else {
        alert("Login Error");
      }
    }
  };
  return (
    <>
      <div className="login bg-light p-0">
        <div className="row g-0 p-0 m-0">
          <div className="col-md-6">
            <div className="img-box vh-100 d-flex justify-content-center align-items-center">
              <div className="p-5 my-5">
                <img src={image} alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="page text-align-center bg-white d-flex justify-content-center align-items-center  vh-100">
              <form onSubmit={login}>
                <div className="color2">
                  <div className="font2">
                    <h2 className="mb-4 mt-5">Login Page</h2>
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <div className="color" htmlFor="selectUser">
                        <i className="fa-solid fa-user-tie"></i>
                      </div>
                    </span>

                    <select
                      name=""
                      onChange={selectRole}
                      id="role"
                      className="form-select text-center"
                    >
                      <option className="form-control" value="" hidden>
                        Select Role
                      </option>
                      {role.map((rolelist, index) => {
                        return (
                          <option
                            className="form-control"
                            value={rolelist._id}
                            key={index}
                          >
                            {rolelist.role}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <div className="color">
                        <i className="fa-solid fa-user"></i>
                      </div>
                    </span>

                    <input
                      type="text"
                      value={loginId}
                      id="user_name"
                      placeholder="Enter Email"
                      onChange={handleloginId_Userid}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <div className="color">
                        <i className="fa-solid fa-lock"></i>
                      </div>
                    </span>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      placeholder="Enter Here"
                      onChange={handlePassword}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="log d-flex justify-content-between align-items-center text-white mt-4 mb-5">
                  <button className="width p-1 px-3" type="submit">
                    Login
                  </button>
                  <Link
                    href="/"
                    className="text-decoration-none text-secondary"
                  >
                    Forgot Password
                  </Link>
                </div>
                <div>
                  <h6 className="text-danger">
                    <label htmlFor="" className="width"></label>
                    {/* {msg} */}
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
