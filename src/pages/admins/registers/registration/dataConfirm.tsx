import { FC } from "react"
import { RegistrationInterface } from "../../../../interfaces/registers/registrationInterface"
import { t } from "i18next"
import { Button } from "../../../../components/input"

interface DataConfirmInterface {
    dataConfirmInvoice: RegistrationInterface | undefined;
    stateConfirm: {
        id?: string | undefined;
        status?: number | undefined;
    } | undefined;
    confirmChangeStatusInvoice: (id: string, status: number) => Promise<void>
}
const DataConfirm: FC<DataConfirmInterface> = (props) => {
    const {
        dataConfirmInvoice,
        stateConfirm,
        confirmChangeStatusInvoice
    } = props;
    return (
        <div className='w-full'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="p-2">
                                Label
                            </th>
                            <th className="p-2">
                                Data
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2">
                                {t('name')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.students?.name }
                            </td>
                        </tr>
                        <tr  className="bg-gray-50">
                            <td className="p-2">
                                {t('address')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.students?.address }
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">
                                {t('phone')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.students?.phone }
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-2">
                                {t('sessions')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.sessions?.name }
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">
                                {t('packages')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.packages?.name }
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-2">
                                {t('location')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.location }
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">
                                {t('parent-name')}
                            </td>
                            <td className="p-2">
                                { dataConfirmInvoice?.students?.parentName }
                            </td>
                        </tr>
                    </tbody>
            </table>
            <div className="w-full flex justify-end">
                <Button
                    variant={dataConfirmInvoice?.status === 1 ? 'error' : 'primary'}
                    onClick={()=> confirmChangeStatusInvoice(stateConfirm?.id ?? '', stateConfirm?.status ?? 0)}
                >
                    {
                        dataConfirmInvoice?.status === 1 ? t('cancel-confirm') : t('confirm')
                    }
                    
                </Button>
            </div>
        </div>
    )
}

export default DataConfirm