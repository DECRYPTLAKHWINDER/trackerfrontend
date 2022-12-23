import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toastr from "toastr";

const Userdetails = () => {
  const [employeeId, setemployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [reportingManagerName, setReportingManagerName] = useState("");
  const [designationName, setDesignationName] = useState("");
  const [detail, setDetail] = useState("");
  const [role, setRole] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [designation, setDesignation] = useState([]);
  const [designationId, setDesignationId] = useState("");
  const [reportingManagerId, setReportingManagerId] = useState("");
  const [reportingManager, setReportingManager] = useState([]);
  const [updateDisabled, setUpdateDisabled] = useState(true);
  const [disabledReportingManager, setDisabledReportingManager] =
    useState(true);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:3012/employee")
      .then(async (response) => await response.json())
      .then(async (json) => {
        let employeesdata = json.data;
        let data = employeesdata;
        const updateDetail = await data.filter((ele) => {
          return ele.employeeId === params.id;
        });
        setDetail(updateDetail);
      });
  }, [params.id]);

  useEffect(() => {
    if (detail && detail !== undefined) {
      let object = detail[0];
      setemployeeId(object.employeeId);
      setName(object.name);
      setRoleId(object.roleId);
      setDesignationId(object.designationId);
      setEmail(object.email);
      setRoleName(object.roleName);
      setReportingManagerName(object.reportingManagerName);
      setDesignationName(object.designationName);
    }
  }, [detail]);

  const selectRole = async (e) => {
    console.log(e.target.selectedIndex);
    setRoleId(e.target.value);
    const d = e.target.children;
    setRoleName(d[e.target.selectedIndex].innerText);
    // eslint-disable-next-line
    if (e.target.selectedIndex == "0") await hideDesignationAndManager(e);
    // eslint-disable-next-line
    else if (e.target.selectedIndex == "1") await disable(e);
    // eslint-disable-next-line
    else if (e.target.selectedIndex == "2") await enable(e);
    // console.log(e.target.selectedIndex);
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (roleName === "Manager") {
      setDisabledReportingManager(true);
      const hide = document.getElementById("reportingManagerblock");
      hide.style.display = "none";
      setReportingManagerId("");
      setReportingManagerName("");
    }
    // eslint-disable-next-line
    else if (roleName === "Team Member") {
      setDisabledReportingManager(false);
      const showReportingManager = document.getElementById(
        "reportingManagerblock"
      );
      showReportingManager.style.display = "block";
    }
  }, [roleName]);

  const disable = async (e) => {
    const dropdown = document.getElementById("reportingManager");
    dropdown.removeAttribute("disabled");
    const showReportingManager = document.getElementById(
      "reportingManagerblock"
    );
    showReportingManager.style.display = "block";
    const showDesignation = document.getElementById("designation");
    showDesignation.style.display = "block";
  };

  const enable = async (e) => {
    const dropdown = document.getElementById("reportingManager");
    dropdown.setAttribute("disabled", "disabled");
    const hide = document.getElementById("reportingManagerblock");
    hide.style.display = "none";
    const showDesignation = document.getElementById("designation");
    showDesignation.style.display = "block";
    setReportingManagerId("");
    setReportingManagerName("");
    setDesignationId("");
    setDesignationName("");
  };

  useEffect(() => {
    if (roleId === "636b800c06674b3f78ce3627") {
      fetch("http://localhost:3012/teammember/designation")
        .then((response) => response.json())
        .then((json) => {
          let designationdata = json.data.map((type) => {
            return type;
          });
          setDesignation(designationdata);
        });
    } else if (roleId === "636b805a06674b3f78ce3628") {
      fetch("http://localhost:3012/manager/designation")
        .then((response) => response.json())
        .then((json) => {
          let designationdata = json.data.map((type) => {
            return type;
          });
          setDesignation(designationdata);
        });
    }
  }, [roleId]);

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

  useEffect(() => {
    fetch("http://localhost:3012/manager")
      .then((response) => response.json())
      .then((json) => {
        let Managerdata = json.data.map((type) => {
          return type;
        });
        setReportingManager(Managerdata);
      });
  }, [roleName]);

  const deleteHandle = () => {
    let deleteEmployeeData = {
      employeeId,
    };
    // console.log("Hello i'm Employee Id------------->", hello);
    fetch("http://localhost:3012/employee", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteEmployeeData),
    }).then((result) => {
      if (result.status === 200) {
        setemployeeId("");
        toastr.success("Data Deleted Successfully");
        navigate("/userslist");
      } else {
        toastr.error("Error!");
      }
    });
  };
  const submitHandle = (e) => {
    e.preventDefault();
    let updateEmployeeData = {
      name,
      email,
      roleId,
      employeeId,
      roleName,
      designationId,
      designationName,
      reportingManagerId,
      reportingManagerName,
    };
    console.log(updateEmployeeData);
    fetch("http://localhost:3012/employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateEmployeeData),
    }).then((result) => {
      if (result.status === 200) {
        setName("");
        setEmail("");
        setRoleId("");
        setemployeeId("");
        setDesignationName("");
        setReportingManagerName("");
        setRoleName("");
        setReportingManagerId("");
        setDesignationId("");
        toastr.success("Data Updated Successfully");
        navigate("/userslist");
      } else {
        toastr.error("Error!");
      }
    });
  };

  const updateEnabled = () => {
    setUpdateDisabled(false);
  };
  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white">
          <section className="dest">
            <div className="das-font p-4">
              <div className="font2 md-4">
                <div className="color2">
                  <h4 className="fs-5 mt-1 ms-4 ">Employee Details</h4>
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
                    disabled
                  />
                </div>

                <div className="mb-3 mb-4">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder=""
                    name="name"
                    value={name}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => {
                      if (!/^[a-z A-Z]*$/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>
                <div className="mb-3 my-4 ">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    placeholder="Enter email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => {
                      if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>

                <div className="mb-3 my-4">
                  <label htmlFor="employee id">Role:</label>
                  <select
                    name=""
                    id="role"
                    className="form-select"
                    onChange={(e) => {
                      selectRole(e);
                    }}
                    onSelect={(e) => {
                      selectRole(e);
                    }}
                  >
                    <option className="form-control" value="" hidden>
                      Select Role
                    </option>
                    {role.map((roledata, index) => {
                      // eslint-disable-next-line
                      if (roledata.role == roleName)
                        return (
                          <option
                            className="form-control"
                            defaultValue={roledata._id}
                            key={index}
                            selected
                          >
                            {roledata.role}
                          </option>
                        );
                      else
                        return (
                          <option
                            className="form-control"
                            value={roledata._id}
                            key={index}
                          >
                            {roledata.role}
                          </option>
                        );
                    })}
                  </select>
                </div>

                <div className="mb-3" id="reportingManagerblock">
                  <label htmlFor="employee id">Reporting Manager:</label>

                  <select
                    name=""
                    id="reportingManager"
                    onChange={(event) => {
                      setReportingManagerId(event.target.value);
                      const d = event.target.children;
                      setReportingManagerName(
                        d[event.target.selectedIndex].innerText
                      );
                    }}
                    disabled={disabledReportingManager}
                  >
                    <option className="form-control" value="">
                      Select Reporting Manager
                    </option>

                    {reportingManager.map((reportingManagers, index) => {
                      // eslint-disable-next-line
                      if (reportingManagers.name === reportingManagerName)
                        return (
                          <option
                            className="form-control"
                            defaultValue={reportingManagers.employeeId}
                            key={index}
                            selected
                          >
                            {reportingManagers.name}
                          </option>
                        );
                      else
                        return (
                          <option
                            className="form-control"
                            value={reportingManagers.employeeId}
                            key={index}
                          >
                            {reportingManagers.name}
                          </option>
                        );
                    })}
                  </select>
                </div>

                <div className="mb-3" id="designation">
                  <label htmlFor="employee id">Designation:</label>

                  <select
                    className="text-center"
                    onChange={(e) => {
                      setDesignationId(e.target.value);
                      const d = e.target.children;
                      setDesignationName(d[e.target.selectedIndex].innerText);
                    }}
                  >
                    <option className="form-control" value="">
                      Select Designation
                    </option>
                    {designation.map((designationtype, index) => {
                      // eslint-disable-next-line
                      if (designationtype.designation == designationName)
                        return (
                          <option
                            className="form-control"
                            defaultValue={designationtype._id}
                            key={index}
                            selected
                          >
                            {designationtype.designation}
                          </option>
                        );
                      else
                        return (
                          <option
                            className="form-control"
                            value={designationtype._id}
                            key={index}
                          >
                            {designationtype.designation}
                          </option>
                        );
                    })}
                  </select>
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
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={(e) =>
                        deleteHandle(params.id, e.preventDefault())
                      }
                    >
                      Delete
                    </button>
                  </div>

                  <Link to={`/userslist`}>
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

export default Userdetails;
