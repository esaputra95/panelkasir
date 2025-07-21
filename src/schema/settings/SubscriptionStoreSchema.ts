import * as yup from "yup"

const DonationCategorySchema = () => {
    const schema = yup.object({
        storeId: yup.string().required("storeId wajib diisi"),
        startDate: yup
            .string()
            .required("Tanggal mulai wajib diisi")
            .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Format tanggal harus YYYY-MM-DD"
            ),
        endDate: yup
            .string()
            .required("Tanggal akhir wajib diisi")
            .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Format tanggal harus YYYY-MM-DD"
            ),
    });

    return {
        schema
    }
}
export default DonationCategorySchema