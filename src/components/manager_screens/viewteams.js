// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ViewTeamMember = () => {
  const [usersData, setUsersData] = useState([]);
  const [reportingManagerId, setReportingManagerId] = useState(
    localStorage.getItem("LogginId")
  );

  useEffect(() => {
    // if (reportingManagerId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportingManagerId }),
    };
    fetch("http://localhost:3012/myteammember", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        let employees = json.data;
        setUsersData(employees);
      });

    // }
  }, []);

  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white ">
          <div className="das-font p-4">
            <div className="font2 md-4">
              <div className="color2">
                <h4 className="fs-5 mt-1 ms-4  ">Team Members</h4>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="font2">
          <div className="color2 d-flex justify-content-between m-3">
            <Link to="/addemployee">
              <button className="btn btn-default add-employee ">
                Add Employee
              </button>
            </Link>
          </div>
        </div> */}

        <table className="table text-center">
          <thead className="show-users">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Designation</th>
              <th scope="col">Role</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((EmployeeList, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{EmployeeList.name}</td>
                  <td>{EmployeeList.employeeId}</td>
                  <td>{EmployeeList.designationName}</td>
                  <td>{EmployeeList.roleName}</td>
                  <td>
                    <Link to={`/asigntask/${EmployeeList.employeeId}`}>
                      <button className="btn btn-default btn-warning mx-2">
                        Task Report
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewTeamMember;
