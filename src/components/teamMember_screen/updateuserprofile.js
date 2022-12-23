import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toastr from "toastr";

const UpdateUserProfileTeamMember = () => {
  const [employeeId, setemployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [detail, setDetail] = useState("");
  const [role, setRole] = useState([]);
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const [showPassword, setShowPassword] = useState(true);
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
      setEmail(object.email);
      setRoleName(object.roleName);
    }
  }, [detail]);

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

  const submitHandle = (e) => {
    e.preventDefault();
    let updateEmployeeData = { employeeId, name };
    console.log(updateEmployeeData);
    fetch("http://localhost:3012/employee/userprofileupdate", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateEmployeeData),
    }).then((result) => {
      if (result.status === 200) {
        setName("");
        setemployeeId("");
        localStorage.setItem("name", name);
        toastr.success("Data Updated Successfully");
        navigate(`/profile/${params.id}`);
      } else {
        toastr.error("Error!");
      }
    });
  };

  const updateEnabled = () => {
    setUpdateDisabled(false);
  };

  const showpassword = () => {
    if (showPassword) {
      document.getElementById("password").type = "text";
      setShowPassword(false);
    } else {
      document.getElementById("password").type = "password";
      setShowPassword(true);
    }
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
                    disabled
                  />
                </div>

                <div className="mb-3 my-4">
                  <label htmlFor="employee id">Role:</label>
                  <select name="" id="role" className="form-select" disabled>
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
                      else return "No Role Found!";
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

export default UpdateUserProfileTeamMember;
