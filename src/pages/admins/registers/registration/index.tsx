import Table from './Table'
import TablePaging from './TablePaging'
import { useRegistration } from '../../../../hooks/fetch/registers/useRegistration'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormRegistration from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useClassMaster } from '../../../../hooks/fetch/master/useClassMaster'
import { useStudent } from '../../../../hooks/fetch/master/useStudent'
import { useSession } from '../../../../hooks/fetch/settings/useSession'
import { usePackage } from '../../../../hooks/fetch/settings/usePackage'
import { useGuidanceType } from '../../../../hooks/fetch/settings/useGuidanceType'
import { useSchoolYear } from '../../../../hooks/fetch/settings/useSchoolYear'
import DataConfirm from './dataConfirm'

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
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page,
        control,
        sendMessage,
        changeStatusInvoice,
        setModalForm,
        handleOnChangeSelect,
        modelFormConfirmInvoice,
        dataConfirmInvoice,
        onCancelInvoice,
        stateConfirm,
        confirmChangeStatusInvoice
    } = useRegistration()

    const {
        optionClassMaster,
    } = useClassMaster();

    const {
        optionStudentAll
    } = useStudent();

    const {
        optionSession
    } = useSession()

    const {
        optionPackage
    } = usePackage()

    const {
        optionGuidanceType
    } = useGuidanceType()

    const {
        optionSchoolYear
    } = useSchoolYear()

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
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    optionClassMaster={optionClassMaster}
                    optionStudent={optionStudentAll}
                    optionSession={optionSession}
                    optionPackage={optionPackage}
                    optionGuidanceType={optionGuidanceType}
                    optionSchoolYear={optionSchoolYear}
                    handleOnChangeSelect={handleOnChangeSelect}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='py-4'>
                    <Button 
                        onClick={()=>
                            setModalForm((state)=> ({...state, visible:true}))
                        } 
                    >
                        + {useLocatioanName().pathName}
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
            <ModalForm 
                visible={modelFormConfirmInvoice.visible}
                onClose={onCancelInvoice}
                title={modelFormConfirmInvoice.label}
                size="medium"
            >
                <DataConfirm
                    dataConfirmInvoice={dataConfirmInvoice}
                    stateConfirm={stateConfirm}
                    confirmChangeStatusInvoice={confirmChangeStatusInvoice}
                />
            </ModalForm>
        </div>
    )
}

export default RegistrationPage