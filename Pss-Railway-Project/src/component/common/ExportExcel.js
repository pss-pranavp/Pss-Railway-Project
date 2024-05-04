// File: ExportExcel.js
import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAsExcelFile(excelBuffer, fileName);
};

const saveAsExcelFile = (buffer, fileName) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
};



// import * as XLSX from 'xlsx';

export const exportToExcelWithFlatData = (data, fileName) => {
    const flattenedData = flattenData(data);
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAsExcelFiles(excelBuffer, fileName);
};

const saveAsExcelFiles = (buffer, fileName) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
};

const flattenData = (data) => {
    const flattenedData = [];
    data.forEach(item => {
        item.wheelPositionData.forEach(wheel => {
            const wheelOne = wheel.wheelPositionDataOne;
            const wheelTwo = wheel.wheelPositionDataTwo;
            flattenedData.push({
                'Shop Sr No': item.shopsr,
                'Axis No': wheelOne.wheelName,
                'Diameter': wheelOne.wheelDiameter,
                'Road Gauge': wheelOne.wheelRodGauge,
                'BD Make': wheelOne.wheelBDmake,
                'BD Condition': wheelOne.wheelBDcondition,
                'Type Of Repair': wheelOne.wheelTypeOfRepaire,
                'CTRB Details': wheelOne.wheelCTRBdetail,
                'Matunga Remark': wheelOne.wheelmatugaRemark
            });
            flattenedData.push({
                'Shop Sr No': item.shopsr,
                'Axis No': wheelTwo.wheelName,
                'Diameter': wheelTwo.wheelDiameter,
                'BD Make': wheelTwo.wheelBDmake,
                'CTRB Details': wheelTwo.wheelCTRBdetail,
                'Matunga Remark': wheelTwo.wheelmatugaRemark
            });
        });
    });
    return flattenedData;
};
