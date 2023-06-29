import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components : {
        MuiDrawer : {
            styleOverrides: {
                paperAnchorLeft : {
                    backgroundColor: "#1d3461",
                    color: "#fff"
                }
            }
        },
        MuiAppBar : {
            styleOverrides: {
                root : {
                    backgroundColor: "#fff",
                }
            }
        },
        MuiTableHead : {
            styleOverrides: {
                root : {
                    backgroundColor: "#1d3461 !important"
                }
            }
        },
        // MuiTableBody : {
        //     styleOverrides: {
        //         root : {
        //             color: "#fff", 
        //             "&:hover": {
        //                 backgroundColor: "#e1e8f8 !important"
        //             }
        //         }
        //     }
        // }
    },
    palette: {
        // mode: 'dark',
        sidebar: {
            text: {
                primary: '#fff',
            }
        },
        header: {
            text: {
                primary: '#1d3461',
            }
        },
        background: {
            primary: '#1d3461',
            secondary: '#e1e8f8',
            ternory: '#51668e',
            disable: '#ccc',
        },
        button: {
            primary: '#51668e',
            secondary: '#f2f2f2',
            ternory: '#51668e',
            ok: 'green',
            error: '#e10505',
            disable: '#ccc'
        },
        text : {
            primary : '#000000',
            secondary : '#51668f',
            primary_header : '#00c1f8',
            secondary_header : '#262d3f',
            normal : '#fff'
        },
        body : {
            main : '#f0f7ff'
        }
    },
});

// const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//     },
//   });

export default theme;