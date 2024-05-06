
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();


    const navigatePage = (path) => {
        navigate(path)
    }
    return (

       
            <div>
            <div style={{ position: 'sticky', top: '0', width: '300px', height: "700px",}} className="d-flex flex-column flex-shrink-0 p-2 bg-body-tertiary homepage" >
                <a href="/" className="d-flex align-items-center mb-0 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg className="bi pe-none me-0" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4"><h1> Reports </h1></span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item" style={{ fontSize: "25px", marginTop: "5px", color: "black" }} >
                        <a onClick={() => navigatePage("/dashboard")} href="#" className={`nav-link  $`} aria-current="page">
                            <svg className="bi pe-none me-2" width="16" height="16">
                                <use xlinkHref="#home" />
                            </svg>
                            PressedOffWheels
                        </a>
                    </li>
                    <li onClick={() => navigatePage("/dashboard/wheelSheet")} className="nav-item" style={{ fontSize: "25px", marginTop: "5px", color: "black" }}
                    >
                        <a href="#" className={`nav-link  `} style={{ color: "black" }}>
                            <svg className="bi pe-none me-2" width="16" height="16">
                                <use xlinkHref="#speedometer2" />
                            </svg>
                            VandeBharat
                        </a>
                    </li>
                </ul>
                <hr />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
