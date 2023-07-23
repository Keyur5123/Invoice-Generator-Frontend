import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer'
import GeneratePdf from '../Components/pdfComponents/GeneratePdf'

function DownloadPdf() {
    return (
        <div>
            <PDFDownloadLink document={<GeneratePdf />} fileName="FORM">
                {({ loading }) =>
                    loading ?
                        (<button>Loading Doc...</button>)
                        :
                        (<button>Download</button>)
                }
            </PDFDownloadLink>
        </div>
    );
}

export default DownloadPdf;