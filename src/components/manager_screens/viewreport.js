import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Viewreport = () => {
  const [usersData, setUsersData] = useState([]);
  const [taskID, setTaskID] = useState("");
  const params = useParams();

  //   setAssignedId(param.id);
  useEffect(() => {
    fetch("http://localhost:3012/assigntasks")
      .then(async (response) => await response.json())
      .then(async (json) => {
        let employeesdata = json.data;
        let data = employeesdata;
        const updateDetail = await data.filter((ele) => {
          return ele.titleId === params.id;
        });
        setUsersData(updateDetail);
      });
  }, []);

  const deleteHandle = (task_id) => {
    setTaskID(task_id);
  };
  console.log(taskID);
  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white ">
          <div className="das-font p-4">
            <div className="font2 md-4">
              <div className="color2">
                <h4 className="fs-5 mt-1 ms-4  ">View Report</h4>
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
              <th scope="col">Description</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Deadline</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((assignedtasklist, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{assignedtasklist.title}</td>
                  <td>{assignedtasklist.description}</td>
                  <td>{assignedtasklist.assignTo}</td>
                  <td>{assignedtasklist.deadline}</td>
                  <td>
                    <Link to="/viewtask">
                      <button
                        type="submit"
                        className="btn btn-default btn-warning mx-2"
                        onClick={(e) =>
                          deleteHandle(assignedtasklist._id, e.preventDefault())
                        }
                      >
                        Remove
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="">
        <div className="text-end">
          <Link to={`/updatetask/${params.id}`}>
            {" "}
            <button
              type="submit"
              className="btn btn-primary mx-5"
              // onClick={submitHandle}
              id="updateUser"
              // disabled={updateDisabled}
            >
              Update Task
            </button>
          </Link>
          <button
            type="submit"
            className="btn btn-danger"
            // onClick={(e) => deleteHandle(params.id, e.preventDefault())}
          >
            Delete
          </button>
        </div>

        <Link to={`/viewtask`}>
          <button className="btn btn-default btn-dark mx-2">Back</button>
        </Link>
      </div>
    </>
  );
};

export default Viewreport;
