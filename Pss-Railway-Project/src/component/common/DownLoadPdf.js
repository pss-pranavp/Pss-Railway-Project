
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPDF = (elementId, fileName) => {
    const input = document.getElementById(elementId);

    html2canvas(input)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(fileName);
        })
        .catch((error) => {
            console.error('Error converting table to canvas:', error);
        });
};
