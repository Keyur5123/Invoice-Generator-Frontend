/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React examples

// Authentication layout components
import { Box, Typography } from "@mui/material";

function CoverLayout({ color, header, title, description, image, top, children }) {
    return (
        <Box
            width="100vw"
            height="100%"
            minHeight="100vh"
            sx={{ overflowX: "hidden" }}
            background="white">
            <Grid
                container
                justifyContent="center"
                sx={{
                    minHeight: "75vh",
                    margin: 0,
                }}
            >
                <Grid item xs={11} sm={8} md={5} xl={3}>
                    <Box mt={top}>
                        <Box pt={3} px={3}>
                            {!header ? (
                                <>
                                    <Box mb={1}>
                                        <Typography className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-800" variant="h3" fontWeight="bold" color={color} textGradient>
                                            {title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight="regular" color="text">
                                        {description}
                                    </Typography>
                                </>
                            ) : (
                                header
                            )}
                        </Box>
                        <Box p={3}>{children}</Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box
                        height="100%"
                        display={{ xs: "none", md: "block" }}
                        position="relative"
                        right={{ md: "-12rem", xl: "-16rem" }}
                        mr={-16}
                        sx={{
                            transform: "skewX(-10deg)",
                            overflow: "hidden",
                            borderBottomLeftRadius: "20px",
                        }}
                    >
                        <Box
                            ml={-8}
                            height="100%"
                            sx={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                transform: "skewX(10deg)",
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
    header: "",
    title: "",
    description: "",
    color: "info",
    top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
    ]),
    header: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    top: PropTypes.number,
    children: PropTypes.node.isRequired,
};

export default CoverLayout;
