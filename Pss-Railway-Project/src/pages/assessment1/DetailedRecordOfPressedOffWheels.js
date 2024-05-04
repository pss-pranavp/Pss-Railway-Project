import React, { useState, useEffect } from 'react';
import './style.css';
import { downloadPDF } from '../../component/common/DownLoadPdf';
import { exportToExcel } from '../../component/common/ExportExcel';
import { printTable } from '../../component/common/Print';
import shopstyle from './ShopData.module.css';
import axios from 'axios';

const DetailedRecordOfPressedOffWheels = () => {
  const [pressedoffwheels, setPressedOffWheels] = useState([]);
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

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setPressedOffWheels(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:8081/', formData)
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
      // Fetch the updated data after successful form submission
      axios.get('http://localhost:8081/')
        .then(res => setPressedOffWheels(res.data))
        .catch(err => console.log(err));
    }).catch((err) => console.log(err));
  }

  
  return (
    <div>
      <div id="table-container" className="table-container p-4">
        <h1 className="centered-header pb-2">Detailed Record Of Pressed Off Wheels</h1>
        <div>
          <button className={shopstyle.button} onClick={() => downloadPDF('shop-table', 'whelldata.pdf')}>Download as PDF</button>
          <button className={shopstyle.button} onClick={() => exportToExcel(pressedoffwheels, 'pressedoffwheels.xlsx')}>Export to Excel</button>
          <button className={shopstyle.button} onClick={printTable}>Print</button>
          <button className={shopstyle.button2} onClick={() => setShowModal(true)}>Add Data</button>
        </div>
        <table id='shop-table' className="data-table">
          <thead>
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
                        <th>Axle No.</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                  </table>
              </th>
              <th className="header-cell">Remarks</th>
              <th className="header-cell">Action</th>
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
          <div className={shopstyle.modalHeader}>
            <h5 className={shopstyle.modalTitle}>Add Data</h5>
            <button type="button" className={shopstyle.closeButton} onClick={() => setShowModal(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className={shopstyle.modalBody}>
          <form onSubmit={handleSubmit}>
            <h2>Add Data</h2>
            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel}>Date</label>
              <input type='date' name='Date'
              required onChange={(e)=> setFormData({...formData, Date: e.target.value})} 
              />
            </div>
            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel}>Operator No</label>
              <input type='text' name='Operator No'
              required onChange={(e)=> setFormData({...formData, ShoOperratorTNo: e.target.value})} 
              />
            </div>
            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >Inspector No</label>
              <input type='text' name='Inspector No'
              required onChange={(e)=> setFormData({...formData, InspectorT: e.target.value})} 
              />
            </div>

            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >Shop SNo</label>
              <input type='text' name='Shop SNo'
              required onChange={(e)=> setFormData({...formData, ShopSNo: e.target.value})} 
              />
            </div>
            
            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >TypeofWheel</label>
              <input type='text' name='Type of Wheel'
              required onChange={(e)=> setFormData({...formData, TypeofWheel: e.target.value})} 
              />
            </div>

            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >WheelPressedofffor</label>
              <input type='text' name='Wheel Pressed off for'
              required onChange={(e)=> setFormData({...formData, WheelPressedofffor: e.target.value})} 
              />
            </div>

            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >Disc No</label>
              <input type='text' name='Disc No'
              required onChange={(e)=> setFormData({...formData, DiscSrNo: e.target.value})} 
              />
            </div>

            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >Axle No</label>
              <input type='text' name='Axle No'
              required onChange={(e)=> setFormData({...formData, AxleNo: e.target.value})} 
              />
            </div>
            
            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >Reason</label>
              <input type='text' name='Reason'
              required onChange={(e)=> setFormData({...formData, Reason: e.target.value})} 
              />
            </div>

            <div className={shopstyle.formGroup}>
              <label className={shopstyle.formLabel} >Remarks</label>
              <input type='text' name='Remarks'
              required onChange={(e)=> setFormData({...formData, Remarks: e.target.value})} 
              />
            </div>
            <div className={shopstyle.formGroup}>
            <button type='submit' className='btn btn-success'>Submit</button>
            </div>
            
          </form>
          </div>
          </div>
          </div>
       

      
      )}

      {/* Modal for adding data */}
      
    </div>
  );
}

export default DetailedRecordOfPressedOffWheels;
