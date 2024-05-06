import React, { useEffect, useState } from 'react';
import './LoginPage.css'; 
import { FaLock, FaUser } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userdata, setUserData] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:8081/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = e.target.elements.email.value;
    const userPassword = e.target.elements.password.value;
    const role = e.target.elements.userType.value;

    const user = userdata.find(user => user.username === userEmail && user.password === userPassword);

    if (user) {
      if (user.role === role) {
        if (role === "admin") {
          navigate('/dashboard' );
        } else if (role === "mechanical") {
          navigate('/DashboardMechanical');
        } else {
          setAlertMessage('Invalid user type');
          setShowAlert(true);
        }
      } else {
        setAlertMessage('Invalid user type');
        setShowAlert(true);
      }
    } else {
      setAlertMessage('Invalid email or password');
      setShowAlert(true);
    }
  }

  setTimeout(() => {
    setShowAlert(false);
  }, 5000);

  const handleCloseAlert = () => {
    setShowAlert(false);
  }

  return (
    <div>
      <div style={{ backgroundColor: "blue", padding: "15px" }}>
        <h2>Header</h2>
      </div>
      <div className="login-container">
        <main className="form-signin">
          <form onSubmit={handleSubmit}>
            <div className='icon'><FaLock /></div>
            <h1 className="h3 mb-3 fw-normal">Log in</h1>

            <div className="form-floating">
              <input type="text" className="form-control" id="email" name="email" placeholder="name@example.com" />
              <label htmlFor="email"> user Email </label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
              <label htmlFor="password">Password</label>
            </div>

            <div className="input-group" style={{ marginTop: "15px" }}>
              <span className="input-group-text">
                <FaUser />
              </span>
              <select className="form-select" id="userType" name="userType" label="user type">
                <option value="">User Type</option>
                <option value="admin">Admin</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
          </form>
        </main>
      </div>
      <div style={{ backgroundColor: "blue", padding: "15px", marginTop: "80px" }}>
        <h2>Footer</h2>
      </div>

      {showAlert && 
        <div style={{backgroundColor:"white" ,color:"red" , fontWeight:"bold" , padding:"5px"}} className="position-fixed top-0 start-50 translate-middle-x" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCloseAlert}></button>
        </div>
      }
    </div>
  );
};

export default LoginPage;
