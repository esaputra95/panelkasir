import Chart from "react-apexcharts";
import { useMemo } from 'react'
import useDashboard from "../../hooks/slices/useDashboard";
import { ApexOptions } from "apexcharts";
import { optionApexChart } from "../../utils/optionApexChart";

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
            <div id="chart">
                <Chart options={dataSalesYear.options} series={dataSalesYear.series} type="bar" height={350} />
            </div>
            <div id="chart">
                <Chart options={dataMarginYear.options} series={dataMarginYear.series} type="bar" height={350} />
            </div>
        </div>
    )
}

export default Dashboard