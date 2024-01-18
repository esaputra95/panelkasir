import Table from './Table'
import TablePaging from './TablePaging'
import { useRegistration } from '../../../../hooks/fetch/registers/useRegistration'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormRegistration from './form'
import { Button, InputText } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useClassMaster } from '../../../../hooks/fetch/master/useClassMaster'
import { useStudent } from '../../../../hooks/fetch/master/useStudent'
import { useSession } from '../../../../hooks/fetch/settings/useSession'
import { usePackage } from '../../../../hooks/fetch/settings/usePackage'
import { useGuidanceType } from '../../../../hooks/fetch/settings/useGuidanceType'
import { useSchoolYear } from '../../../../hooks/fetch/settings/useSchoolYear'
import DataConfirm from './dataConfirm'
import { t } from 'i18next'

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
        confirmChangeStatusInvoice,
        updateModuleStatus,
        registerFilter,
        handleSubmitFilter,
        onFilter,
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
                <div className='py-4 flex justify-between'>
                    <Button 
                        onClick={()=>
                            setModalForm((state)=> ({...state, visible:true}))
                        } 
                    >
                        + {useLocatioanName().pathName}
                    </Button>
                    <div className="w-4/12 relative text-gray-600">
                        <form onSubmit={handleSubmitFilter(onFilter)}>
                            <InputText
                                className='rounded-xl'
                                placeholder={t('student-name')}
                                {...registerFilter("name")}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                <svg
                                    className="text-gray-600 h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    id="Capa_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 56.966 56.966"
                                    xmlSpace="preserve"
                                    width="512px"
                                    height="512px"
                                >
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button>
                        </form>
                    </div>
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
                    updateModuleStatus={updateModuleStatus}
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