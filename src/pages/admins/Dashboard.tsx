import Chart from "react-apexcharts";
import { useMemo } from 'react'
import useDashboard from "../../hooks/slices/useDashboard";
import { ApexOptions } from "apexcharts";
import { optionApexChart } from "../../utils/optionApexChart";
import { StatCard } from "../../components/dashboard/StatCard";
import { 
  HiCurrencyDollar, 
  HiTrendingUp, 
  HiShoppingCart, 
  HiStar 
} from "react-icons/hi";

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
                chart: {
                    ...optionApexChart('Penjualan').chart,
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: false
                        }
                    }
                },
                colors: ['#3b82f6'],
                plotOptions: {
                    bar: {
                        borderRadius: 8,
                        columnWidth: '60%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    borderColor: '#f1f5f9',
                    strokeDashArray: 4,
                }
            },
        }
    },[data]);

    const dataMarginYear = useMemo<{
        series: { name: string; data: number[] }[];
        options: ApexOptions;
    }>(() => {
        return {
            series: [{
            name: 'Margin',
                data: dataMargin ?? []
            }],
            options: {
                ...optionApexChart('Margin Penjualan'),
                chart: {
                    ...optionApexChart('Margin Penjualan').chart,
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false,
                            reset: false
                        }
                    }
                },
                colors: ['#10b981'],
                plotOptions: {
                    bar: {
                        borderRadius: 8,
                        columnWidth: '60%',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                grid: {
                    borderColor: '#f1f5f9',
                    strokeDashArray: 4,
                }
            },
        }
    },[dataMargin]);

    // Calculate totals for stat cards
    const totalSales = useMemo(() => {
        if (!data || data.length === 0) return 0;
        return data.reduce((sum: number, val: number) => sum + val, 0);
    }, [data]);

    const totalMargin = useMemo(() => {
        if (!dataMargin || dataMargin.length === 0) return 0;
        return dataMargin.reduce((sum: number, val: number) => sum + val, 0);
    }, [dataMargin]);

    const formatCurrency = (value: number) => {
        // For large numbers, use compact notation
        if (value >= 1000000) {
            const millions = value / 1000000;
            return `Rp ${millions.toFixed(1)} Jt`;
        }
        if (value >= 1000) {
            const thousands = value / 1000;
            return `Rp ${thousands.toFixed(0)} Rb`;
        }
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const isLoading = !data && !dataMargin;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Ringkasan performa bisnis Anda</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Penjualan"
                    value={formatCurrency(totalSales)}
                    icon={HiCurrencyDollar}
                    color="blue"
                    trend={{ value: 12.5, isPositive: true }}
                    loading={isLoading}
                />
                <StatCard
                    title="Total Margin"
                    value={formatCurrency(totalMargin)}
                    icon={HiTrendingUp}
                    color="green"
                    trend={{ value: 8.2, isPositive: true }}
                    loading={isLoading}
                />
                <StatCard
                    title="Total Transaksi"
                    value={data?.length || 0}
                    icon={HiShoppingCart}
                    color="purple"
                    trend={{ value: 3.1, isPositive: false }}
                    loading={isLoading}
                />
                <StatCard
                    title="Rata-rata Per Bulan"
                    value={formatCurrency(totalSales / (data?.length || 1))}
                    icon={HiStar}
                    color="orange"
                    loading={isLoading}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Penjualan Tahunan</h3>
                        <p className="text-sm text-gray-500">Grafik penjualan per bulan</p>
                    </div>
                    <div id="chart">
                        <Chart 
                            options={dataSalesYear.options} 
                            series={dataSalesYear.series} 
                            type="bar" 
                            height={320} 
                        />
                    </div>
                </div>

                {/* Margin Chart */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Margin Penjualan</h3>
                        <p className="text-sm text-gray-500">Grafik margin per bulan</p>
                    </div>
                    <div id="chart-margin">
                        <Chart 
                            options={dataMarginYear.options} 
                            series={dataMarginYear.series} 
                            type="bar" 
                            height={320} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard