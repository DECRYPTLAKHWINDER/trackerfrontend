// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Users = () => {
  const [usersdata, setUsersData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3012/employee")
      .then((response) => response.json())
      .then((json) => {
        let employeesdata = json.data.map((emp) => {
          return emp;
        });
        setUsersData(employeesdata);
      });
  }, []);
  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white ">
          <div className="das-font p-4">
            <div className="font2 md-4">
              <div className="color2">
                <h4 className="fs-5 mt-1 ms-4 ">User Details</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="font2">
          <div className="color2 d-flex justify-content-between m-3">
            <Link to="/addemployee">
              <button className="btn btn-default add-employee ">
                Add Employee
              </button>
            </Link>
          </div>
        </div>

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
            {usersdata.map((EmployeeList, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{EmployeeList.name}</td>
                  <td>{EmployeeList.employeeId}</td>
                  <td>{EmployeeList.designationName}</td>
                  <td>{EmployeeList.roleName}</td>
                  <td>
                    <Link to={`/userdetails/${EmployeeList.employeeId}`}>
                      <button className="btn btn-default btn-warning mx-2">
                        More Info
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

export default Users;
