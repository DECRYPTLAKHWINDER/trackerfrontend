import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Designation from "./adddesignation";

const Viewdesignation = () => {
  const [role, setRole] = useState([]);
  const [roleId, setRoleId] = useState("");
  const [designation, setDesignation] = useState([]);
  const [disabledDesignation, setDisabledDesignation] = useState(true);
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

  const selectRole = async (e) => {
    setRoleId(e.target.value);
  };
  const EnableDesignation = () => {
    setDisabledDesignation(false);
  };

  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white">
          <section className="dest">
            <div className="das-font p-4">
              <div className="font2 md-4">
                <div className="color2">
                  <h4 className="fs-5 mt-1">Designations</h4>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-0 ">
              <div className="text-end m-3">
                <Link to="/adddesignation">
                  <button type="submit" className="button p-2">
                    Add Designation
                  </button>
                </Link>
              </div>
              <div className="px-3">
                <form onChange={EnableDesignation} autoComplete="off">
                  <div className="mb-3 my-4">
                    <label htmlFor="employee id">Role:</label>
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
                            className="form-control w-100"
                            value={rolelist._id}
                            key={index}
                          >
                            {rolelist.role}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3" id="designation">
                    <label htmlFor="employee id">Designation:</label>

                    <table className="table text-center">
                      <thead className="show-users">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Designations</th>
                          {/* <th scope="col">Operations</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {designation.map((Designation, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>

                              <td>{Designation.designation}</td>

                              {/* <td>
                                <Link
                                  to={`/userdetails/${Designation.employeeId}`}
                                >
                                  <button className="btn btn-default btn-warning ">
                                    Update Designation
                                  </button>
                                </Link>
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Viewdesignation;
