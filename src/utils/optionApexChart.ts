import { ApexOptions } from "apexcharts";
import moment from "moment";
import formatter from "./currency";

export const optionApexChart= (label:string):ApexOptions => ({
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
            position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val:number) {
            return val;
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },
        
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        position: 'top',
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        crosshairs: {
            fill: {
            type: 'gradient',
            gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                // stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
            }
            }
        },
        tooltip: {
            enabled: true,
        }
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: (val:number) => formatter.format(val)
        }
        
    },
    title: {
        text: `Data ${label} tahun ${moment().format('YYYY')}`,
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
            color: '#444'
        }
    }
})