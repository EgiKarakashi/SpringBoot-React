import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    EmployeeService.getEmployeeById(id).then((response) => {
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmailId(response.data.emailId);
    }).catch(error => console.log(error));
  }, [id]);

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  }

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  }

  const emailHandler = (event) => {
    setEmailId(event.target.value);
  }

  const saveOrUpdateEmployee = (event) => {
    event.preventDefault();

    const employee = {firstName, lastName, emailId};

    if (id) {
      EmployeeService.updateEmployee(id, employee).then((response) => {
        history.push('/employees')
      }).catch(error => console.log(error));
    } else {
      EmployeeService
          .createEmployee(employee)
          .then((response) => {
            console.log(response.data);

            history.push('/employees');
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }

  const onClickHandler = (event) => {
    saveOrUpdateEmployee(event);
    setFirstName('');
    setLastName('');
    setEmailId('');
  }

  const title = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>
    } else {
      return <h2 className="text-center">Add Employee</h2>
    }
  }

  return (
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {title()}
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={firstNameHandler}>
                    </input>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={lastNameHandler}>
                    </input>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        name="emailId"
                        className="form-control"
                        value={emailId}
                        onChange={emailHandler}>
                    </input>
                  </div>
                  <button className="btn btn-success" onClick={onClickHandler}>Add Employee</button>
                  <Link to="/employees" className="btn btn-danger" style={{marginLeft: '15px'}}>Cancel</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AddEmployeeComponent;
