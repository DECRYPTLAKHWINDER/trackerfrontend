import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssignTask = () => {
  const [usersData, setUsersData] = useState([]);
  const [reportingManagerId, setReportingManagerId] = useState(
    localStorage.getItem("LogginId")
  );
  const [taskData, setTaskData] = useState([]);
  const [taskTitleId, setTaskTitleId] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [taskTitle, setTaskTitle] = useState([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignFrom, setAssignFrom] = useState(
    localStorage.getItem("LogginId")
  );
  const navigate = useNavigate();

  const taskHandler = (event) => {
    setTaskTitleId(event.target.value);
    const d = event.target.children;
    setTaskTitle(d[event.target.selectedIndex].innerText);
  };
  const employeeHandle = (eve) => {
    if (employeeId.includes(eve.target.value)) {
      var index = employeeId.indexOf(eve.target.value);
      if (index !== -1) {
        employeeId.splice(index, 1);
        setEmployeeId([...employeeId]);
      }
    } else {
      setEmployeeId([...employeeId, eve.target.value]);
    }
  };

  useEffect(() => {
    console.log(employeeId);
    console.log(taskTitle);
  });
  useEffect(() => {
    fetch("http://localhost:3012/tasks")
      .then((response) => response.json())
      .then((json) => {
        let employees = json.data;
        setTaskData(employees);
      });
  }, []);

  useEffect(() => {
    taskData.map((task, index) => {
      if (task._id === taskTitleId) {
        setDescription(task.description);
        setDeadline(task.deadline);
      }
    });
  }, [taskTitleId]);

  useEffect(() => {
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
  }, []);
  console.log(description);
  const submitHandler = async (e) => {
    e.preventDefault();

    for (let index = 0; index < employeeId.length; index++) {
      const EmployeeId = employeeId[index];
      let data = {
        taskTitle,
        taskTitleId,
        EmployeeId,
        assignFrom,
        description,
        deadline,
      };
      console.log(data);
      let result = await fetch("http://localhost:3012/assigntasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (result.status == 200) {
        navigate("/viewtask");
      } else if (result.status == 406) {
        console.log("Incomplete Data in Fields. Please Check!");
      } else {
        console.log("Database Error");
      }
    }
  };

  return (
    <>
      <div className="col-md-12 p-0">
        <div className="dashbord bg-white">
          <form onSubmit={submitHandler}>
            <section className="dest">
              <div className="das-font p-4">
                <div className="font2 md-4">
                  <div className="color2">
                    <h4 className="fs-5 mt-1 ms-4 ">Assign Task</h4>
                  </div>
                </div>
              </div>
              <div className="mb-3 px-3 mt-5" id="designation">
                <label htmlFor="employee id">Tasks :</label>

                <select
                  className="text-center form-select mt-3 w-100"
                  onChange={taskHandler}
                >
                  <option className="form-control" value="" hidden>
                    Select Task
                  </option>
                  {taskData.map((task, index) => {
                    return (
                      <option
                        className="form-control"
                        value={task._id}
                        key={index}
                      >
                        {task.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3 px-3 mt-4" id="designation">
                <label htmlFor="employee id">Assign To :</label>
                <div className="form-control d-flex flex-wrap">
                  {usersData.map((member, index) => {
                    return (
                      <div
                        className=""
                        role="group"
                        aria-label="Basic checkbox toggle button group"
                        key={index}
                      >
                        <div className=" form-control border-0 ">
                          <input
                            type="checkbox"
                            className="btn-check "
                            value={member.employeeId}
                            onClick={employeeHandle}
                            id={member.employeeId}
                          />
                          <label
                            className="btn btn-outline-custom mx-auto "
                            htmlFor={member.employeeId}
                          >
                            {member.name}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="save mt-4">
                <button type="submit" className="button mx-3 ps-4 pe-4 my-4">
                  Send
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssignTask;
