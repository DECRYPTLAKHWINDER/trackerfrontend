import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
const Designation = () => {
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [roleId, setRoleId] = useState();
  const [disabledAddDesignation, setDisabledAddDesignation] = useState(true);
  const navigate = useNavigate();

  useEffect((e) => {
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
    if (designation !== "" && role !== "") {
      let designationdata = { designation, roleId };
      fetch("http://localhost:3012/designation", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(designationdata),
      }).then((result) => {
        if (result.status === 200) {
          toastr.success("Submitted Successfully");
          navigate("/viewdesignation");
        } else {
          toastr.warning("Fill Designation First");
        }
        result.json().then((res) => {});
      });
    } else {
      setErrorMessage(
        <span className="text-danger">Please Fille The Details First</span>
      );
    }
  };
  const EnableAddDesignation = () => {
    setDisabledAddDesignation(false);
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
            <div className="p-4">
              <form onSubmit={submitHandle} onChange={EnableAddDesignation}>
                <div className="mb-3 my-4">
                  <label htmlFor="name" className="me-2 fs-6">
                    Role :
                  </label>
                  <select
                    className="form-select text-center"
                    id=""
                    onChange={(eve) => setRoleId(eve.target.value)}
                  >
                    <option value="">Select Role</option>
                    {role.map((roletype, index) => {
                      return (
                        <option value={roletype._id} key={index}>
                          {roletype.role}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className=" my-3 mt-4">
                  <label htmlFor="name">Designation:</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    id="name"
                    value={designation}
                    placeholder="Enter Designation"
                    name="name"
                    autoComplete="off"
                    onChange={(e) => setDesignation(e.target.value)}
                    onKeyPress={(e) => {
                      if (!/^[a-z A-Z]*$/.test(e.key)) e.preventDefault();
                    }}
                    disabled={disabledAddDesignation}
                  />
                </div>

                {/* <!--button--> */}
                <div className="d-flex  justify-content-between">
                  <button type="submit" className="button px-2">
                    Save
                  </button>
                </div>
              </form>
            </div>
            <p>{errorMessage}</p>
            {/* <!--button--> */}
          </section>
        </div>
      </div>
      {/* <!--dashbord end--> */}
    </>
  );
};
export default Designation;
