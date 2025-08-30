import * as yup from "yup"

const SubscriptionSchema = () => {
    const schema = yup.object({
        id: yup.string().optional(),
        storeId: yup.string().nullable().optional(),
        startDate: yup.date().nullable().optional(),
        endDate: yup.date().nullable().optional(),
        userCreate: yup.string().nullable().optional(),
        createdAt: yup.date().optional(),
        updatedAt: yup.date().optional(),
        deletedAt: yup.date().nullable().optional(),
    });

    return {
        schema
    }
}
export default SubscriptionSchema