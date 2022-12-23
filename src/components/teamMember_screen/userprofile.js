import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import user from "../../img/user1.png";

const UserProfileTeamMember = () => {
  const [employeeId, setemployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [reportingManagerName, setReportingManagerName] = useState("");
  const [designationName, setDesignationName] = useState("");
  const [detail, setDetail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [designationId, setDesignationId] = useState("");
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
      setRoleId(object.roleId);
      setDesignationId(object.designationId);
      setEmail(object.email);
      setRoleName(object.roleName);
      setReportingManagerName(object.reportingManagerName);
      setDesignationName(object.designationName);
    }
  }, [detail]);
  return (
    <>
      <div className="profile p-3 py-5 h-100">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card py-4 my-2">
              <div className="text-center">
                <img src={user} alt="user" />
                <h5 className="color2  mt-4 font2 mb-3">{name}</h5>
                <div className="color font3">
                  <p className="mb-0">{designationName}</p>
                  <p>{email}</p>
                </div>
                <div className="cancle py-1">
                  <Link to={`/editprofile/${params.id}`}>
                    <button type="submit" className="button px-3 py-1">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="table bg-white py-4 px-4 my-2 rounded">
              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="font6 font3">Full Name</p>
                </div>

                <div className="col-md-9">
                  <p>{name}</p>
                </div>
                <hr></hr>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <p className="font6 font3">Email</p>
                </div>

                <div className="col-md-9">
                  <p>{email}</p>
                </div>
                <hr></hr>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <p className="font6 font3">Employee Id</p>
                </div>
                <div className="col-md-9">
                  <p>{employeeId}</p>
                </div>
                <hr></hr>
              </div>
              <div className="row mb-4">
                <div className="col-md-3">
                  <p className="font6 font3">Reporting Manager</p>
                </div>
                <div className="col-md-9">
                  <p>{reportingManagerName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileTeamMember;
