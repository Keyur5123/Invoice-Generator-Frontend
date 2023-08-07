import React, { useEffect, useState } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { Grid } from '@mui/material';
import { registerables, Chart, CategoryScale } from "chart.js";

Chart.register(...registerables);    // for solving error :- linear undefined
Chart.register(CategoryScale);    // for solving error :- category undefined

function sortFunction(a, b) {
    var dateA = new Date(a._id.date_created).getTime();
    var dateB = new Date(b._id.date_created).getTime();
    return dateB > dateA ? 1 : -1;
};

function Index({ invoiceList, setTotalPcs }) {
    const [pieChartData, setPieChartData] = useState({
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

    const [barChartData, setBarChartData] = useState({
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

    function arrangePieChartData() {
        let array = [];
        invoiceList.forEach(element => {
            var obj = {};
            obj.year = Number(element._id.date_created.split('-').reverse()[0])
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

        setPieChartData({
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

    function arrangeBarChartData() {
        let array = [];
        invoiceList.forEach(element => {
            var obj = {};
            obj.year = Number(element._id.date_created.split('-').reverse()[1])
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

        setBarChartData({
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
        invoiceList && arrangePieChartData();
        invoiceList && arrangeBarChartData();
    }, [invoiceList])

    return (
        <div className="App flex justify-items-center">
            <Grid sx={{ marginTop: "0px" }} container spacing={3}>
                <Grid item xs={12} sm={6} lg={6}>
                    <PieChart chartData={pieChartData} />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <BarChart chartData={barChartData} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Index;