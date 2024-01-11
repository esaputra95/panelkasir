import Table from './Table'
import TablePaging from './TablePaging'
import { usePayroll } from '../../../../hooks/fetch/payroll/usePayroll'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormPayroll from './form'
import { Button } from '../../../../components/input'
// import useLocatioanName from '../../../../utils/Language '
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useTutor } from '../../../../hooks/fetch/master/useTutor'
import useAccess from '../../../../utils/useAccess'
import useLocatioanName from '../../../../utils/location'

const PayrollPage = () => {
    const { token } = useAccess()
    const { 
        dataPayroll, 
        isFetching,
        errors,
        isLoadingMutate,
        register,
        onSubmit,
        handleSubmit,
        modalForm,
        setModalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page,
        control,
        getValues,
        getPayrollSession,
        handleOnChange,
        fields,
        handleOnChangeText,
        printPayroll
    } = usePayroll()

    const {
        dataOptionTutor,
        optionTutor
    } = useTutor()

    const location = useLocatioanName()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormPayroll
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    control={control}
                    optionTutor={optionTutor}
                    dataOptionTutor={dataOptionTutor}
                    getValues={getValues}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    getPayrollSession={getPayrollSession}
                    handleOnChange={handleOnChange}
                    fields={fields}
                    handleOnChangeText={handleOnChangeText}
                />
            </ModalForm>
            <div className='w-full'>
                {
                    token?.userType === "admin" ? (
                        <div className='py-4'>
                            <Button 
                                onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                            >
                                + {location.pathName}
                            </Button>
                        </div>
                    ) : null
                }
                <Table
                    data={dataPayroll?.data?.payroll ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    printPayroll={printPayroll}
                />
                <TablePaging
                    page={page.page}
                    total={page.total}
                    handlePage={page.handlePage}
                />
            </div>
        </div>
    )
}

export default PayrollPage