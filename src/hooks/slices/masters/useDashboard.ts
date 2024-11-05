import { useQuery } from "@tanstack/react-query";
import { getTotalPackage, getTotalPoint, getTotalSales, getTotalSaleStockist } from "../../models/masters/DashboardModel";

const useDashboard = () => {
    const {
        data: totalSales
    } = useQuery({
        queryKey: ['get-total-sale'],
        queryFn: async () => {
            return await getTotalSales()
        },
    });

    const {
        data: totalSaleStockist
    } = useQuery({
        queryKey: ['get-total-sale-stockist'],
        queryFn: async () => {
            return await getTotalSaleStockist()
        },
    });

    const {
        data: totalPoint
    } = useQuery({
        queryKey: ['get-total-point'],
        queryFn: async () => {
            return await getTotalPoint()
        },
    });

    const {
        data: totalPackage
    } = useQuery({
        queryKey: ['get-total-package'],
        queryFn: async () => {
            return await getTotalPackage()
        },
    });

    return {
        totalSales,
        totalSaleStockist,
        totalPoint,
        totalPackage
    }
}

export default useDashboard;