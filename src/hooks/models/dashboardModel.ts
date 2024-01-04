import { AxiosError } from "axios";
import { api } from "../../services"

// Mendapatkan list siswa yang belum diberi record materi
const getRecordMateri = async (url:string) => {
    try {
        const response = await api.get(url);
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

export {
    getRecordMateri
}