import { param } from "jquery";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toastr from "toastr";

const UpdatePassword = () => {
  const [employeeId, setEmployeeId] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const [showPassword, setShowPassword] = useState(true);
  const [showNewPswd, setShowNewPswd] = useState(true);
  const [showConfirmPswd, setShowConfirmPswd] = useState(true);
  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    setEmployeeId(params.id);
  }, [params.id]);
  const submitHandle = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      let changePasswordData = {
        employeeId,
        currentPassword,
        newPassword,
      };
      console.log(changePasswordData);
      let result = await fetch(
        "http://localhost:3012/employee/updatepassword",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changePasswordData),
        }
      );
      console.log(await result.status);
      result = await result.status;
      if (result == 200) {
        alert("Password Updated Successfully");
        navigate(`/profile/${params.id}`);
      }
    } else {
      setErrorMessage("Password Not Matched");
    }
  };

  const updateEnabled = () => {
    setUpdateDisabled(false);
  };

  const showCurrentPassword = () => {
    if (showPassword) {
      document.getElementById("currentPassword").type = "text";
      setShowPassword(false);
    } else {
      document.getElementById("currentPassword").type = "password";
      setShowPassword(true);
    }
    // console.log(show);
  };
  const showNewPassword = () => {
    if (showNewPswd) {
      document.getElementById("newPassword").type = "text";
      setShowNewPswd(false);
    } else {
      document.getElementById("newPassword").type = "password";
      setShowNewPswd(true);
    }
    // console.log(show);
  };
  const showConfirmPassword = () => {
    if (showConfirmPswd) {
      document.getElementById("confirmPassword").type = "text";
      setShowConfirmPswd(false);
    } else {
      document.getElementById("confirmPassword").type = "password";
      setShowConfirmPswd(true);
    }
    // console.log(show);
  };
  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white">
          <section className="dest">
            <div className="das-font p-4">
              <div className="font2 md-4">
                <div className="color2">
                  <h4 className="fs-5 mt-1 ms-4 ">Update Profile</h4>
                </div>
              </div>
            </div>
            <div className="container mt-5 ">
              <form
                onSubmit={submitHandle}
                onChange={updateEnabled}
                autoComplete="off"
              >
                <div className="mb-3 mb-4">
                  <label htmlFor="name">Employee ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    disabled
                  />
                </div>

                <div className="mb-3 my-4 ">
                  <label htmlFor="password">Current Password:</label>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      // onKeyPress={(e) => {
                      //   if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();
                      // }}
                    />
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      onClick={showCurrentPassword}
                    >
                      {showPassword ? (
                        <div className="color">
                          <i className="fa-solid fa-eye"></i>
                        </div>
                      ) : (
                        <div className="color">
                          <i className="fa-solid fa-eye-slash"></i>
                        </div>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-3 my-4 ">
                  <label htmlFor="new_password">New Password:</label>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      name="email"
                      onChange={(e) => setNewPassword(e.target.value)}
                      // onKeyPress={(e) => {
                      //   if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();
                      // }}
                    />
                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      onClick={showNewPassword}
                    >
                      {showNewPswd ? (
                        <div className="color">
                          <i className="fa-solid fa-eye"></i>
                        </div>
                      ) : (
                        <div className="color">
                          <i className="fa-solid fa-eye-slash"></i>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-3 my-4 ">
                  <label htmlFor="confirm_password">
                    Confirm New Password:
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      name="confirm_passwordk"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      // onKeyPress={(e) => {
                      //   if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();
                      // }}
                      required
                    />

                    <span
                      className="input-group-text"
                      id="basic-addon1"
                      onClick={showConfirmPassword}
                    >
                      {showConfirmPswd ? (
                        <div className="color">
                          <i className="fa-solid fa-eye"></i>
                        </div>
                      ) : (
                        <div className="color">
                          <i className="fa-solid fa-eye-slash"></i>
                        </div>
                      )}
                    </span>
                  </div>
                  <p className="text-center text-danger my-2">{errorMessage}</p>
                </div>

                <div className="">
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-warning mx-5"
                      onClick={submitHandle}
                      id="updateUser"
                      disabled={updateDisabled}
                    >
                      Update
                    </button>
                  </div>

                  <Link to={`/profile/${params.id}`}>
                    <button className="btn btn-default btn-dark mx-2">
                      Back
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
