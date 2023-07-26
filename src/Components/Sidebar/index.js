import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { Avatar, Button, Container, Divider } from '@mui/material';
import logo from '../../assets/images/logos/logo.png';
import ConverImg from '../../assets/images/ConverImg.jpg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { SvgIcon } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useInvoiceContext } from "../../Context/InvoiceContext";

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ children }) {

    const navigate = useNavigate();
    const { userData } = useInvoiceContext();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogOut = () => {
        localStorage.removeItem("invoice_dc_token");
        localStorage.removeItem("userData");
        navigate('/login');
    }

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'body.main', height: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className='d-flex justify-between'>
                    <div>
                        <IconButton
                            aria-label="open drawer"
                            onClick={open ? handleDrawerClose : handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, color: 'header.text.primary' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div>
                        <Button
                            onClick={handleLogOut}
                            variant="text"
                            startIcon={<SvgIcon><Logout /></SvgIcon>}
                        >
                            Logout
                        </Button>
                    </div>
                </Toolbar>

            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader className='shadow-sm shadow-blue-200'>
                    <div className='flex justify-start h-2/3'>
                        <img src={logo} />
                    </div>
                </DrawerHeader>
                <div className='h-full flex flex-col justify-between'>
                    <div>
                        <List>
                            <Link to="/dashboard" className='no-underline text-white hover:text-white hover:no-underline'>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: 'sidebar.text.primary' }}>
                                            <DashboardIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='DashBoard' />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <Link to="/invoice-list" className='no-underline text-white hover:text-white hover:no-underline'>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: 'sidebar.text.primary' }}>
                                            <DescriptionIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Invoices' />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <Link to="/manage-product-and-party" className='no-underline text-white hover:text-white hover:no-underline'>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: 'sidebar.text.primary' }}>
                                            <CategoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary='Product & Party' />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: 'sidebar.text.primary' }}>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <ListItemText primary='Abount Me' />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </div>
                    <div>
                        <Divider light sx={{ backgroundColor: '#fff' }} variant='middle' />
                        <Container>
                            <div className='flex items-center mb-5 mt-3'>
                                <div>
                                    <Avatar src={ConverImg} />
                                </div>
                                <div className='ml-3'>
                                    <Typography variant='p' noWrap component={"div"}>
                                        {userData?.userName}
                                    </Typography>
                                </div>
                            </div>
                        </Container>
                    </div>
                    {/* <Divider /> */}
                </div>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <div className='flex flex-col justify-between'>
                    <div className='main-body min-h-[80vh]'>
                        {children}
                    </div>
                    <div class="bg-[#51668f] relative h-16 mb-5 mt-10 rounded">
                        <div class="absolute inset-x-0 bottom-0 h-16 flex items-center justify-center text-white">
                            <h6>Copyright © 2023 Darshan Creation. All rights reserved.</h6>
                        </div>
                    </div>
                </div>
            </Main>
        </Box >
    );
}