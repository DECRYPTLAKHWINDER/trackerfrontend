// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Viewtask = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3012/tasks")
      .then((response) => response.json())
      .then((json) => {
        let employees = json.data;
        setUsersData(employees);
      });
  }, []);

  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white ">
          <div className="das-font p-4">
            <div className="font2 md-4">
              <div className="color2">
                <h4 className="fs-5 mt-1 ms-4  ">View Tasks</h4>
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
              <th scope="col">Task Title</th>
              <th scope="col">Descriptions</th>
              <th scope="col">Deadline</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((EmployeeList, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{EmployeeList.title}</td>
                  <td>{EmployeeList.description}</td>
                  <td>{EmployeeList.deadline}</td>
                  <td>
                    <Link to={`/viewreport/${EmployeeList._id}`}>
                      <button className="btn btn-default btn-warning mx-2">
                        View Report
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

export default Viewtask;
