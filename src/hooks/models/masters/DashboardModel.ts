import { AxiosError } from "axios";
import { api } from "../../../services"

const getTotalSales = async () => {
    try {
        const response = await api.get('Dashboard.sales');
        return response.data.data.sales;
    } catch (error) {
        throw error as AxiosError;
    }
}

const getTotalSaleStockist = async () => {
    try {
        const response = await api.get('Dashboard.saleStockist');
        return response.data.data.saleStockist;
    } catch (error) {
        throw error as AxiosError;
    }
}

const getTotalPoint = async () => {
    try {
        const response = await api.get('Dashboard.point');
        return response.data.data.point;
    } catch (error) {
        throw error as AxiosError;
    }
}

const getTotalPackage = async () => {
    try {
        const response = await api.get('Dashboard.package');
        return response.data.data.package;
    } catch (error) {
        throw error as AxiosError;
    }
}

export {
    getTotalSales,
    getTotalSaleStockist,
    getTotalPoint,
    getTotalPackage
}