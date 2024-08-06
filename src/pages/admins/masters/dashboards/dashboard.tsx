import CardDashboard from "../../../../components/ui/cardDashboard"
import { BsBarChart } from "react-icons/bs";
import useDashboard from "../../../../hooks/fetch/masters/useDashboard";
import formatter from "../../../../utils/currency";

const Dashboard = () => {
  const {
    totalSales,
    totalPackage,
    totalPoint,
    totalSaleStockist
  } = useDashboard()
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4">
        <CardDashboard
          bgColor="blue"
          label="Penjualan"
          textColor="white"
          value={formatter.format(totalSales)}
          description="Rekap total Penjualan Satu Bulan"
          children={<BsBarChart size={32} color="white" />}
        />
        <CardDashboard
          bgColor="green"
          label="Penjualan"
          textColor="white"
          value={formatter.format(totalSaleStockist)}
          description="Rekap total Penjualan Satu Bulan Stockist"
          children={<BsBarChart size={32} color="white" />}
        />
        <CardDashboard
          bgColor="purple"
          label="Point"
          textColor="white"
          value={formatter.format(totalPoint)}
          description="Rekap total Point Satu Bulan Stockist"
          children={<BsBarChart size={32} color="white" />}
        />
        <CardDashboard
          bgColor="lime"
          label="Point"
          textColor="white"
          value={formatter.format(totalPackage)}
          description="Rekap total Paket Penjualan Satu Bulan"
          children={<BsBarChart size={32} color="white" />}
        />
      </div>
    </div>
  )
}

export default Dashboard