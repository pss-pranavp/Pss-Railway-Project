import axios from 'axios';
import React, { useEffect, useState } from 'react';
import shopstyle from './ShopData.module.css';
import { downloadPDF } from '../../component/common/DownLoadPdf';
import { exportToExcel } from '../../component/common/ExportExcel';
import { printTable } from '../../component/common/Print';

const ShopData = () => {
    const [shopdata, setShopData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        axios.get("http://localhost:8888/Shopdata")
            .then((res) => {
                setShopData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
    const printTable = () => {
        window.print();
    };

    return (
        <div className={shopstyle.container}>
            <h2 className={shopstyle.heading}>Shop Data</h2>
            <div>
                <button className={shopstyle.button} onClick={() => downloadPDF('shop-table', 'shopdata.pdf')}>Download as PDF</button>
                <button className={shopstyle.button} onClick={() => exportToExcel(shopdata, 'shopdata.xlsx')}>Export to Excel</button>
                <button className={shopstyle.button} onClick={ printTable}>Print</button>
            </div>
            <table id="shop-table" className={shopstyle.table}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Date</th>
                        <th>Shop No</th>
                        <th>Structure (Dachha)</th>
                        <th>Structure (Dachha) No</th>
                        <th>Roadgauge</th>
                        <th>pro_s</th>
                        <th>ESK Name</th>
                    </tr>
                </thead>
                <tbody>
                    {shopdata.map((value, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.Date}</td>
                            <td>{value.ShopNo}</td>
                            <td>{value.Structure}</td>
                            <td>{value.StructureNo}</td>
                            <td>{value.Roadgauge}</td>
                            <td>{value.pro_s}</td>
                            <td>{value.ESKName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShopData;
