import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [employeeId, setEmployeeId] = useState(
    localStorage.getItem("LogginId")
  );
  const [updateDisabled, setUpdateDisabled] = useState(true);
  const [usersData, setUsersData] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const taskId = params.id;
  useEffect(() => {
    return async () => {
      let result = await fetch("http://localhost:3012/tasks");
      result = await result.json();
      let data = await result.data;
      const updateDetail = await data.filter((ele) => {
        return ele._id === params.id;
      });
      setUsersData(updateDetail);
    };
  }, []);
  useEffect(() => {
    if (usersData && usersData !== undefined) {
      let object = usersData[0];
      setTitle(object.title);
      setDescription(object.description);
      setDeadline(object.deadline);
    }
  }, [usersData]);

  const submitHandle = async (e) => {
    e.preventDefault();
    let taskDetail = { title, description, deadline, employeeId, taskId };

    let result = await fetch("http://localhost:3012/tasks", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskDetail),
    });
    if (result.status == 200) {
      alert("Data Saved Successfully");
    } else if (result.status == 406) {
      alert("Incomplete Data in Fields. Please Check!");
    } else {
      alert("Database Error");
    }
    console.log(await result.json());
    console.log(taskDetail);
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
                  <h4 className="fs-5 mt-1 ms-4 ">Add Task</h4>
                </div>
              </div>
            </div>
            <form onSubmit={submitHandle} onChange={updateEnabled}>
              <div className="p-3">
                <div className="mb-3 my-4">
                  <label htmlFor="name">Title:</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    id="name"
                    value={title}
                    placeholder="Enter Title of Task"
                    name="name"
                    autoComplete="off"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3 my-4">
                  <label htmlFor="name">Description:</label>
                  <textarea
                    type="text"
                    className="form-control p-2"
                    rows={4}
                    id="name"
                    placeholder="Enter Description of Task"
                    name="name"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyPress={(e) => {
                      if (!/^[a-z A-Z 0-9 . ' " : () , ! ` | / ]*$/.test(e.key))
                        e.preventDefault();
                    }}
                  ></textarea>
                </div>
                <div className="mb-3 my-4">
                  <label htmlFor="name">Deadline:</label>
                  <input
                    type="date"
                    className="form-control p-2"
                    id="name"
                    value={deadline}
                    placeholder="Enter Description of Task"
                    name="name"
                    autoComplete="off"
                    onChange={(e) => setDeadline(e.target.value)}
                    onKeyPress={(e) => {
                      if (!/^[a-z A-Z]*$/.test(e.key)) e.preventDefault();
                    }}
                  />
                </div>

                {/* <!--button--> */}
                <div className="save mt-4">
                  <button
                    type="submit"
                    className="btn button-2 px-5"
                    disabled={updateDisabled}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
            {/* <!--button--> */}
          </section>
        </div>
      </div>
      {/* <!--dashbord end--> */}
    </>
  );
};

export default UpdateTask;
