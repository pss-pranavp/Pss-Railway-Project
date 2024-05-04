import React, { useEffect, useState } from 'react';
import styles from './WheelSheet.module.css';
import axios from 'axios';
import { downloadPDF } from '../../component/common/DownLoadPdf';
import { exportToExcelWithFlatData } from '../../component/common/ExportExcel';
import { printTable } from '../../component/common/Print';


const WheelSheet = () => {
 const [wheeldata, setWheelData] = useState([]);

 useEffect(() => {
  fetchData();
 }, []);

 const fetchData = () => {
  axios.get("http://localhost:8888/WheelData")
   .then((res) => {
    setWheelData(res.data);
   })
   .catch((error) => {
    console.error('Error fetching data:', error);
   });
 };

 console.log(wheeldata);

 return (
  <div className={styles.container}>
   <h2 className={styles.heading}>Wheel Pre-Inspection Sheet "Vande Bharat"</h2>
   <div className={styles.tableContainer}>
    <div>

     <button className={styles.button} onClick={() => downloadPDF('wheel-table', 'wheeldata.pdf')}>Download as PDF</button>
     <button className={styles.button} onClick={() => exportToExcelWithFlatData(wheeldata, 'wheeldata.xlsx')}>Export to Excel</button>
     <button className={styles.button} onClick={printTable}>Print</button>
    </div>
    <table id="wheel-table" className={styles.table}>

    <tr>
         
          </tr>
     <tbody>
      {wheeldata.map((data, index) => (
       <React.Fragment key={index}>
        <tr>
         <th>Shop Sr No</th>
         <td>{data.shopsr}</td>
         <td rowSpan={2}>Diameter {data.axieData.axieDiameter}</td>
         <td rowSpan={2}>Road Gauge {data.axieData.axieRodGauge}</td>
         <td rowSpan={2}>BD Make {data.axieData.axieBDmake}</td>
         <td rowSpan={2}>BD Condition {data.axieData.axieBDcondition}</td>
         <td rowSpan={2}>Type Of Repair</td>
         <td colSpan={5} rowSpan={2} align='center'>CTRB Details</td>
         <td rowSpan={2}>Matunga Remark</td>
        </tr>
        <tr>
         <th>Axis No</th>
         <td>{data.axieData.axieNo}</td>
        </tr>
      
        {data.wheelPositionData.map((wheel, wheelIndex) => (
         <React.Fragment key={wheelIndex}>
          <tr>
           <th rowSpan={2}>Wheel Position</th>
           <td>{wheel.wheelPositionDataOne.wheelName}</td>
           <td>{wheel.wheelPositionDataOne.wheelDiameter}</td>
           <td rowSpan={2}>{wheel.wheelPositionDataOne.wheelRodGauge}</td>
           <td>{wheel.wheelPositionDataOne.wheelBDmake}</td>
           <td>{wheel.wheelPositionDataOne.wheelBDcondition}</td>
           <td rowSpan={2}>{wheel.wheelPositionDataOne.wheelTypeOfRepaire}</td>
           <td colSpan={5}>{wheel.wheelPositionDataOne.wheelCTRBdetail}</td>
           <td rowSpan={2}>{wheel.wheelPositionDataOne.wheelmatugaRemark}</td>
          </tr>
          <tr>
           <td>{wheel.wheelPositionDataTwo.wheelName}</td>
           <td>{wheel.wheelPositionDataTwo.wheelDiameter}</td>
           <td>{wheel.wheelPositionDataTwo.wheelBDmake}</td>
           <td>{wheel.wheelPositionDataTwo.wheelCTRBdetail}</td>
           <td>{wheel.wheelPositionDataTwo.wheelmatugaRemark}</td>

           
          </tr>
          

          
         </React.Fragment>
        ))}
       </React.Fragment>
      ))}
     </tbody>
     
    </table>
   </div>
  </div>
 );
}

export default WheelSheet;
