import React, { useState, useEffect } from 'react';
import './style.css';
import { downloadPDF } from '../../component/common/DownLoadPdf';
import { exportToExcel } from '../../component/common/ExportExcel';
import { printTable } from '../../component/common/Print';
import shopstyle from './ShopData.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import {validateOperatorNo,validateInspectorNo,validateShopNo,validateTypeOfWheel,validateWhelPressed,validateDiskSrNo,validateAxleNo,validaterReason,validateRemark} from '../../component/common/FormValidation'


const DetailedRecordOfPressedOffWheels = () => {
  const [pressedoffwheels, setPressedOffWheels] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    Date: '',
    ShoOperratorTNo: '',
    InspectorT: '',
    ShopSNo: '',
    TypeofWheel: '',
    WheelPressedofffor: '',
    DiscSrNo: '',
    AxleNo: '',
    Reason: '',
    Remarks: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [invalidInputs, setInvalidInputs] = useState({
    OperatorNo: false,
    InspectorNo: false,
    shopNo: false,
    typeWheel: false,
    wheelPressed: false,
    DiscNo: false,
    axieNo: false,
    reason: false,
    remark: false
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8081/pressedoffwheels')
      .then(res => setPressedOffWheels(res.data))

      .catch(err => console.log(err));
  }, []);


  function handleSubmit(event) {
    event.preventDefault();

    // Check if any of the inputs are invalid
    if (
      invalidInputs.OperatorNo ||
      invalidInputs.InspectorNo ||
      invalidInputs.shopNo ||
      invalidInputs.typeWheel ||
      invalidInputs.wheelPressed ||
      invalidInputs.DiscNo ||
      invalidInputs.axieNo ||
      invalidInputs.reason ||
      invalidInputs.remark
    ) {
      // If any input is invalid, do not submit the form
      console.log("Please correct the invalid inputs before submitting the form.");
      return;
    }
    axios.post('http://localhost:8081/pressedoffwheels', formData)
      .then((res) => {
        console.log(res);
        //Optionally, reset the form data
        setFormData({
          Date: '',
          ShoOperratorTNo: '',
          InspectorT: '',
          ShopSNo: '',
          TypeofWheel: '',
          WheelPressedofffor: '',
          DiscSrNo: '',
          AxleNo: '',
          Reason: '',
          Remarks: ''
        });
        setShowModal(false);

        setShowSuccessMessage(true);

        // Fetch the updated data after successful form submission
        axios.get('http://localhost:8081/pressedoffwheels')
          .then(res => setPressedOffWheels(res.data))

          .catch(err => console.log(err));
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }).catch((err) => console.log(err));




  }

  const handleLogout = () => {
    navigate('/');
    console.log("Logged out");
  };
  const handleOperatorNoChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, OperatorNo: false });
      setFormData({ ...formData, ShoOperratorTNo: value });
    } else {
      setInvalidInputs({ ...invalidInputs, OperatorNo: true });
    }
  };

  const handleInspectorNoChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, InspectorNo: false });
      setFormData({ ...formData, InspectorT: value });
    } else {
      setInvalidInputs({ ...invalidInputs, InspectorNo: true });
    }
  };

  const handleShopNoChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, shopNo: false });
      setFormData({ ...formData, ShopSNo: value });
    } else {
      setInvalidInputs({ ...invalidInputs, shopNo: true });
    }
  };

  const handleTypeWheelChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, typeWheel: false });
      setFormData({ ...formData, TypeofWheel: value });
    } else {
      setInvalidInputs({ ...invalidInputs, typeWheel: true });
    }
  };

  const handleTwheelPresseChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, wheelPressed: false });
      setFormData({ ...formData, WheelPressedofffor: value });
    } else {
      setInvalidInputs({ ...invalidInputs, wheelPressed: true });
    }
  };

  const handleDiscNoChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, DiscNo: false });
      setFormData({ ...formData, DiscSrNo: value });
    } else {
      setInvalidInputs({ ...invalidInputs, DiscNo: true });
    }
  };



  const handleAxieNoChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, axieNo: false });
      setFormData({ ...formData, AxleNo: value });
    } else {
      setInvalidInputs({ ...invalidInputs, axieNo: true });
    }
  };


  const handleReasonChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, reason: false });
      setFormData({ ...formData, Reason: value });
    } else {
      setInvalidInputs({ ...invalidInputs, reason: true });
    }
  };


  const handleTwheelRemarkChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setInvalidInputs({ ...invalidInputs, remark: false });
      setFormData({ ...formData, Remarks: value });
    } else {
      setInvalidInputs({ ...invalidInputs, remark: true });
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = dateObject.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };


  return (
    <div style={{ position: "relative", left: "300px", width: "1200px", height: "1500px", bottom: "250px" }}>
      <div id="table-container" className="table-container p-4" style={{ position: "relative", overflow: "auto" }}>

        <div>
          <button className={shopstyle.button} onClick={() => downloadPDF('shop-table', 'whelldata.pdf')}>Download as PDF</button>
          <button className={shopstyle.button} onClick={() => exportToExcel(pressedoffwheels, 'pressedoffwheels.xlsx')}>Export to Excel</button>
          <button className={shopstyle.button} onClick={printTable}>Print</button>
          <button className={shopstyle.button2} onClick={() => setShowModal(true)}>Add Data</button>
          <button className={shopstyle.button3} onClick={handleLogout}>LogOut</button>
        </div>
        <table id='shop-table' className="data-table" >

          <thead >
            <tr>
              <th colSpan={9} style={{ fontSize: "20px" }} >  Detailed Record Of Pressed Off Wheels</th>
            </tr>
            <tr>
              <th className="header-cell">Date</th>
              <th className="header-cell">Operator T.No.</th>
              <th className="header-cell">Inspector T.No.</th>
              <th className="header-cell">Shop S.No.</th>
              <th className="header-cell">Type of Wheel</th>
              <th className="header-cell">Wheel Pressed off for RA/RD/RG</th>
              <th className="header-cell">Disc Sr.No.</th>
              <th className="header-cell">General observations
                <table className="sub-table">
                  <thead>
                    <tr>
                      <th>Axie No.</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                </table>
              </th>
              <th className="header-cell">Remarks</th>
              {/* <th className="header-cell">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {
              pressedoffwheels.map((data, i) => (
                <tr key={i}>
                  <td>{data.Date}</td>
                  <td>{data.ShoOperratorTNo}</td>
                  <td>{data.InspectorT}</td>
                  <td>{data.ShopSNo}</td>
                  <td>{data.TypeofWheel}</td>
                  <td>{data.WheelPressedofffor}</td>
                  <td>{data.DiscSrNo}</td>
                  <td>
                    <table className="sub-table">
                      <tbody>
                        <tr>
                          <td>{data.AxleNo}</td>
                          <td>{data.Reason}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>{data.Remarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={shopstyle.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={shopstyle.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div style={{ backgroundColor: "blue" }} className={shopstyle.modalHeader}>
              <h3 className={shopstyle.modalTitle}>Add Data</h3>
              <button type="button" className={shopstyle.closeButton} onClick={() => setShowModal(false)}>
                <span style={{ fontWeight: "bold", fontSize: "45px", color: "black" }} aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* <div className={shopstyle.modalBody}> */}
            <form onSubmit={handleSubmit} className={shopstyle.modalBody}>
              {/* <h2>Add Data</h2> */}
              <div className={shopstyle.formGroup}>
  <label className={shopstyle.formLabel}>Date</label>
  <input
    required
    className={shopstyle.formControl}
    type='date'
    name='Date'
    value={formData.Date ? formData.Date.slice(0, 10) : ''} // Display only the date part
    onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
  />
</div>


              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel}>Operator No</label>
                <input required className={`${shopstyle.formControl} ${invalidInputs.OperatorNo ? shopstyle.invalidInput : ''}`} type='text' name='Operator No'
                  onChange={handleOperatorNoChange}
                />
                {invalidInputs.OperatorNo && <div style={{ position: "absolute" }} className="alert alert-danger" >Please enter a valid Operator No.</div>}

              </div>
              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >Inspector No</label>
                <input required className={`${shopstyle.formControl} ${invalidInputs.InspectorNo ? shopstyle.invalidInput : ''}`} type='text' name='Inspector No'
                  onChange={handleInspectorNoChange}
                />
                {invalidInputs.InspectorNo && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid Inspector No.</div>}
              </div>

              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >Shop SNo</label>
                <input required className={`${shopstyle.formControl} ${invalidInputs.shopNo ? shopstyle.invalidInput : ''}`} type='text' name='Shop SNo'
                  onChange={handleShopNoChange}
                />
                {invalidInputs.shopNo && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid shop No.</div>}
              </div>



              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >TypeofWheel</label>
                <input required className={`${shopstyle.formControl} ${invalidInputs.typeWheel ? shopstyle.invalidInput : ''}`} type='text' name='Type of Wheel'
                  onChange={handleTypeWheelChange}
                />
                {invalidInputs.typeWheel && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid TypeofWheel.</div>}
              </div>


              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >WheelPressedofffor</label>
                <input className={`${shopstyle.formControl} ${invalidInputs.wheelPressed ? shopstyle.invalidInput : ''}`} type='text' name='Wheel Pressed off for'
                  onChange={handleTwheelPresseChange}
                />
                {invalidInputs.wheelPressed && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid WheelPressedofffor.</div>}
              </div>

              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >Disc No</label>
                <input className={`${shopstyle.formControl} ${invalidInputs.DiscNo ? shopstyle.invalidInput : ''}`} type='text' name='Disc No'
                  onChange={handleDiscNoChange}
                />
                {invalidInputs.DiscNo && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid Disc No.</div>}
              </div>

              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >Axle No</label>
                <input className={`${shopstyle.formControl} ${invalidInputs.axieNo ? shopstyle.invalidInput : ''}`} type='text' name='Axle No'
                  onChange={handleAxieNoChange}
                />
                {invalidInputs.axieNo && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid axie No.</div>}
              </div>

              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >Reason</label>
                <input className={`${shopstyle.formControl} ${invalidInputs.reason ? shopstyle.invalidInput : ''}`} type='text' name='Reason'
                  onChange={handleReasonChange}
                />
                {invalidInputs.reason && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid reason .</div>}
              </div>

              <div className={shopstyle.formGroup}>
                <label className={shopstyle.formLabel} >Remarks</label>
                <input className={`${shopstyle.formControl} ${invalidInputs.remark ? shopstyle.invalidInput : ''}`} type='text' name='Remarks'
                  onChange={handleTwheelRemarkChange}
                />
                {invalidInputs.remark && <div style={{ position: "absolute" }} className="alert alert-danger">Please enter a valid remark .</div>}
              </div>
              <div className={shopstyle.formGroup}>
                <button type='submit' className='btn btn-success'>Submit</button>
              </div>

            </form>
            {/* </div> */}
          </div>
        </div>



      )}

      {/* Modal for adding data */}
      {showSuccessMessage && (
        <div className="position-fixed top-0 start-50 translate-middle-x" style={{ zIndex: 1050 }}>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Data added successfully!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessMessage(false)}></button>
          </div>
        </div>
      )}

    </div>

  );
}

export default DetailedRecordOfPressedOffWheels;
