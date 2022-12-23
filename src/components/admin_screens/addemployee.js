import React, { useState, useEffect } from "react";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [reportingManager, setReportingManager] = useState([]);
  const [reportingManagerId, setReportingManagerId] = useState("");
  const [designation, setDesignation] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [reportingManagerName, setReportingManagerName] = useState("");
  const [designationName, setDesignationName] = useState("");
  const navigate = useNavigate();
  let Ename = document.getElementById("name");
  let Email = document.getElementById("email");
  let ERole = document.getElementById("role");
  toastr.options.timeOut = 5000;
  const submithandle = (e) => {
    e.preventDefault();
    const regx = /[a-zA-Z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (name !== "" && email !== "" && roleId !== "" && designationId !== "") {
      if (!regx.test(email)) {
        toastr.warning("Email Not Valid");
        return;
      }

      let addEmployeeData = {
        name,
        email,
        roleId,
        roleName,
        designationId,
        designationName,
        reportingManagerId,
        reportingManagerName,
      };
      console.log(addEmployeeData);
      fetch("http://localhost:3012/employee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addEmployeeData),
      }).then((result) => {
        if (result.status === 200) {
          setName("");
          setEmail("");
          setRoleId("");
          setDesignationName("");
          setReportingManagerName("");
          setRoleName("");
          setReportingManagerId("");
          setDesignationId("");
          navigate("/userslist");
          toastr.success("Data Submitted Successfully");
        } else if (result.status === 400) {
          toastr.error("Email Already Exist");
        } else {
          toastr.error("DatabaseError");
        }
      });
    } else if (name === "") {
      Ename.style.border = "3px solid #FFCC00";
    } else if (email === "") {
      Email.style.border = "3px solid #FFCC00";
    } else if (roleId === "") {
      ERole.style.border = "3px solid #FFCC00";
    } else if (roleId === "636b800c06674b3f78ce3627") {
      if (reportingManagerId === "") {
        toastr.warning("Error! Please Select Reporting Manager");
      } else if (designationId === "") {
        toastr.warning("Error! Please Select Designation");
      }
    } else if (roleId === "636b805a06674b3f78ce3628") {
      if (designationId === "") {
        toastr.warning("Error! Please Select Designation");
      }
    }

    return;
  };

  const selectRole = async (e) => {
    setRoleId(e.target.value);
    const d = e.target.children;
    setRoleName(d[e.target.selectedIndex].innerText);
    // eslint-disable-next-line
    if (e.target.selectedIndex == "0") await hideDesignationAndManager(e);
    // eslint-disable-next-line
    else if (e.target.selectedIndex == "1") await disable(e);
    // eslint-disable-next-line
    else if (e.target.selectedIndex == "2") await enable(e);
    else if (e.target.selectedIndex == "3") await hideDesignationAndManager(e);
    console.log(e.target.value);
  };

  const hideDesignationAndManager = async (e) => {
    const hide = document.getElementById("reportingManagerblock");
    hide.style.display = "none";
    const hideDesignation = document.getElementById("designation");
    hideDesignation.style.display = "none";
    setReportingManagerId("");
    setDesignationId("");
    setDesignationName("");
    setReportingManagerName("");
  };
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
  };

  useEffect(() => {
    const hideReportingManager = document.getElementById(
      "reportingManagerblock"
    );
    hideReportingManager.style.display = "none";
    const hideDesignation = document.getElementById("designation");
    hideDesignation.style.display = "none";
  }, []);

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
  }, [reportingManagerName][roleName]);

  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white ">
          <div className="das-font p-4">
            <div className="font2 md-4">
              <div className="color2">
                <h4 className="fs-5 mt-1">Add Employee</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="dashbord bg-white p-0 mb-0 pt-0">
          <section className="dest">
            <div className="container mt-0 ">
              <div className="px-3">
                <form onSubmit={submithandle} autoComplete="off">
                  <div className="mb-3 my-4">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      id="name"
                      placeholder=""
                      name="name"
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
                      value={email}
                      className="form-control"
                      id="email"
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
                      onChange={selectRole}
                      id="role"
                      className="form-select"
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

                  <div className="mb-3" id="reportingManagerblock">
                    <label htmlFor="employee id">Reporting Manager:</label>

                    <select
                      name=""
                      id="reportingManager"
                      onChange={(e) => {
                        setReportingManagerId(e.target.value);
                        const d = e.target.children;
                        setReportingManagerName(
                          d[e.target.selectedIndex].innerText
                        );
                      }}
                      disabled
                    >
                      <option className="form-control" defaultValue="">
                        Select Reporting Manager
                      </option>
                      {reportingManager.map((reportingManagerType, index) => {
                        return (
                          <option
                            className="form-control"
                            value={reportingManagerType.employeeId}
                            key={index}
                          >
                            {reportingManagerType.name}
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
                        return (
                          <option
                            className="form-control"
                            value={designationtype._id}
                            name={designation.designation}
                            key={index}
                            onSelect={(e) => setDesignationName(e.target.name)}
                          >
                            {designationtype.designation}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="d-flex  justify-content-between">
                    <button type="submit" className="button px-2">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
