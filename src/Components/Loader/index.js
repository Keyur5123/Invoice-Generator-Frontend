// import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';

// export default function SimpleBackdrop() {
//     //   const [open, setOpen] = React.useState(true);
//     //   const handleClose = () => {
//     //     setOpen(false);
//     //   };
//     //   const handleOpen = () => {
//     //     setOpen(true);
//     //   };

//     return (
//         <div>
//             <Backdrop
//                 sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                 open={true}
//             >
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//         </div>
//     );
// }


import React from "react";
import "./index.css";

const Index = () => {

    return (
        <body className="loader-main">
            <div class="loader">
                <div class="locus">
                    <div class="point"></div>
                </div>
                <div class="locus">
                    <div class="point"></div>
                </div>
                <div class="locus">
                    <div class="point"></div>
                </div>
            </div>
        </body>
    );
};

export default Index;