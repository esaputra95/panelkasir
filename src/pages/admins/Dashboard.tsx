import Chart from "react-apexcharts";
import { useMemo } from 'react'
import useDashboard from "../../hooks/slices/useDashboard";
import { ApexOptions } from "apexcharts";
import { optionApexChart } from "../../utils/optionApexChart";
// import { Pie, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import PieChart from "./Dh";

// const data = {
//   labels: ['Red', 'Blue', 'Yellow'],
//   datasets: [
//     {
//       label: 'Jumlah Produk',
//       data: [300, 50, 100],
//       backgroundColor: ['#f87171', '#60a5fa', '#facc15'],
//       borderWidth: 1,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'bottom' as const,
//     },
//   },
// };

const Dashboard = () => {
    const {
        data,
        dataMargin,
    } = useDashboard();

    const dataSalesYear = useMemo<{
        series: { name: string; data: number[] }[];
        options: ApexOptions;
    }>(() => {
        return {
            series: [{
            name: 'Penjualan',
                data: data ?? []
            }],
            options: {
                ...optionApexChart('Penjualan'),
            },
        }
    },[data]);

    const dataMarginYear = useMemo<{
        series: { name: string; data: number[] }[];
        options: ApexOptions;
    }>(() => {
        return {
            series: [{
            name: 'Penjualan',
                data: dataMargin ?? []
            }],
            options: {
                ...optionApexChart('Margin Penjualan'),
            },
        }
    },[dataMargin]);

    return (
        <div>
            {/* <div className="grid grid-cols-3">
                <div className="flex flex-col items-center justify-center">
                    <div className="h-52 w-52">
                    <PieChart /></div>
                    <label className="text-sm text-gray-700">Product Terlaris Hari ini</label>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="h-52 w-52">
                    <PieChart /></div>
                    <label className="text-sm text-gray-700">Product Terlaris Hari ini</label>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="h-52 w-80">
                    <PieChart /></div>
                    <label className="text-sm text-gray-700">Product Terlaris Hari ini</label>
                </div>
            </div> */}
            <div className="flex flex-col lg:flex-row w-full">
                <div id="chart" className="w-full">
                    <Chart options={dataSalesYear.options} series={dataSalesYear.series} type="bar" height={350} />
                </div>
                <div id="chart-margin" className="w-full">
                    <Chart options={dataMarginYear.options} series={dataMarginYear.series} type="bar" height={350} />
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard