import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from './PieChart';
import BarChart from './BarChart';
import { Grid } from '@mui/material';

// const array = [
//     {
//         id: 1,
//         year: 2016,
//         pcs: 80000,
//         userLost: 823
//     },
//     {
//         id: 2,
//         year: 2017,
//         pcs: 45677,
//         userLost: 345
//     },
//     {
//         id: 3,
//         year: 2018,
//         pcs: 78888,
//         userLost: 555
//     },
//     {
//         id: 4,
//         year: 2019,
//         pcs: 90000,
//         userLost: 4555
//     },
//     {
//         id: 5,
//         year: 2020,
//         pcs: 4300,
//         userLost: 234
//     },
//     {
//         id: 1,
//         year: 2016,
//         pcs: 80000,
//         userLost: 823
//     },
//     {
//         id: 2,
//         year: 2017,
//         pcs: 45677,
//         userLost: 345
//     },
//     {
//         id: 3,
//         year: 2018,
//         pcs: 78888,
//         userLost: 555
//     },
//     {
//         id: 4,
//         year: 2019,
//         pcs: 90000,
//         userLost: 4555
//     },
//     {
//         id: 5,
//         year: 2020,
//         pcs: 4300,
//         userLost: 234
//     }
// ];
function sortFunction(a, b) {
    var dateA = new Date(a._id.date_created).getTime();
    var dateB = new Date(b._id.date_created).getTime();
    return dateB > dateA ? 1 : -1;
};

function Index({ invoiceList, setTotalPcs }) {
    const [chartData, setChartData] = useState({
        labels: '',
        datasets: [
            {
                label: "Pcs ",
                data: 0,
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

    function arrangeChartData() {
        let array = [];
        invoiceList.forEach(element => {
            var obj = {};
            obj.year = Number(element._id.date_created.split('-')[0])
            obj.pcs = element.billItems.reduce((prev, next) => (
                prev + next.pcs
            ), 0)

            if (array[array.length - 1]?.year == obj.year && array.length < 5) {
                array[array.length - 1].pcs = array[array.length - 1].pcs + obj.pcs
            }
            else if (array.length < 5) {
                array.push(obj)
            }
        });

        let totalPcs = array.reduce((prev, next) => prev + next.pcs, 0);
        setTotalPcs(totalPcs);

        setChartData({
            labels: array.map((data) => data.year),
            datasets: [
                {
                    label: "Pcs ",
                    data: array.map((data) => data.pcs),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#f3ba3f",
                        "#ecf0f1",
                        "#50AF95",
                        "#2a71d0"
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }
            ]
        })
    }

    useEffect(() => {
        invoiceList?.sort(sortFunction);
        invoiceList && arrangeChartData();
    }, [invoiceList])

    return (
        <div className="App flex justify-items-center">
            <Grid sx={{ marginTop: "0px" }} container spacing={3}>
                <Grid item xs={12} sm={6} lg={6}>
                    <PieChart chartData={chartData} />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <BarChart chartData={chartData} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Index;