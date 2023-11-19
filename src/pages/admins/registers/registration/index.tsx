import Table from './Table'
import TablePaging from './TablePaging'
import { useRegistration } from '../../../../hooks/fetch/registers/useRegistration'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormRegistration from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useClassType } from '../../../../hooks/fetch/master/useClassType'
import { useNavigate } from 'react-router-dom'

const RegistrationPage = () => {
    const { 
        dataRegistration, 
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
        sendMessage,
        changeStatusInvoice
    } = useRegistration()
    const navigation = useNavigate()

    const { optionClassType } = useClassType()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormRegistration
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    control={control}
                    classTypeOption={optionClassType}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='py-4'>
                    <Button 
                        onClick={()=> navigation('/register')} 
                    >
                        + {locatioanName().pathName}
                    </Button>
                </div>
                <Table
                    data={dataRegistration?.data?.register ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    sendMessage={sendMessage}
                    changeStatusInvoice={changeStatusInvoice}
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

export default RegistrationPage