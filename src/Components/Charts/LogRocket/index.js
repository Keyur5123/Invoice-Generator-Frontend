import React, { useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from './PieChart';
import BarChart from './BarChart';
import { Grid } from '@mui/material';

const Data = [
    {
        id: 1,
        year: 2016,
        userGain: 80000,
        userLost: 823
    },
    {
        id: 2,
        year: 2017,
        userGain: 45677,
        userLost: 345
    },
    {
        id: 3,
        year: 2018,
        userGain: 78888,
        userLost: 555
    },
    {
        id: 4,
        year: 2019,
        userGain: 90000,
        userLost: 4555
    },
    {
        id: 5,
        year: 2020,
        userGain: 4300,
        userLost: 234
    }
];

function LogRocket() {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained ",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    return (
        <div className="App">
            {/* <PieChart chartData={chartData} />
            <BarChart chartData={chartData} /> */}

            <Grid sx={{ marginTop: "0px" }} container spacing={3}>
                <Grid item xs={12} sm={12} xl={6}>
                    <PieChart chartData={chartData} />
                </Grid>
                <Grid item xs={12} sm={12} xl={6}>
                    <BarChart chartData={chartData} />
                </Grid>
            </Grid>
        </div>
    );
}

export default LogRocket