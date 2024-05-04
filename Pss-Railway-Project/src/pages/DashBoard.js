import React from 'react';

const Dashboard = ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-2 bg-body-tertiary" style={{ width: '300px' , height:"700px"}}>
            <a href="/" className="d-flex align-items-center mb-0 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <svg className="bi pe-none me-0" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                <span className="fs-4"><h1> Assignment </h1></span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item" style={{fontSize:"25px" , marginTop:"5px" , color:"black"}} onClick={()=>{
                    setSelectedTab("home")
                }}> 
                    <a href="#" className={`nav-link  ${selectedTab === "home" && "active"}`} style={{color:"black"}}aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#home" />
                        </svg>
                        Assignment-1
                    </a>
                </li>
                <li className="nav-item" style={{fontSize:"25px" , marginTop:"5px" , color:"black"}}
                onClick={()=>{
                    setSelectedTab("createpost")
                }}>
                    <a href="#" className={`nav-link  ${selectedTab === "createpost" && "active"}`} style={{color:"black"}}>
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#speedometer2" />
                        </svg>
                        Assignment-2
                    </a>
                </li>
            </ul>
            <hr />
        </div>
    );
};

export default Dashboard;
