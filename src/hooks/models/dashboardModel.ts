import { AxiosError } from "axios";
import { api } from "../../services"

// Mendapatkan list siswa yang belum diberi record materi
const getData = async (url:string) => {
    try {
        const response = await api.get(url);
        return response.data
    } catch (error) {
        throw error as AxiosError
    }
}

export {
    getData
}