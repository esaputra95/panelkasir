import Table from './Table'
import TablePaging from './TablePaging'
import { useRecordMateri } from '../../../../hooks/fetch/recordMateri/useRecordMateri'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormRecordMateri from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useStudent } from '../../../../hooks/fetch/master/useStudent'
import { useMaterial } from '../../../../hooks/fetch/master/useMaterial'
import { useCourse } from '../../../../hooks/fetch/master/useCourse'

const RecordMateriPage = () => {
    const { 
        dataRecordMateri, 
        isFetching,
        errors,
        isLoadingMutate,
        register,
        onSubmit,
        handleSubmit,
        getValues,
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
        handelOnChangeForm,
        optionStudyGroup,
        getListStudents,
        fieldDetails,
        appendDetail,
        removeDetail
    } = useRecordMateri()
    
    const {
        optionStudent,
        dataOptionStudent
    } = useStudent();

    const {
        optionCourse,
        dataOptionCourse
    } = useCourse()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormRecordMateri
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    control={control}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    handelOnChangeForm={handelOnChangeForm}
                    optionStudyGroup={optionStudyGroup}
                    getListStudents={getListStudents}
                    getValues={getValues}
                    fieldDetails={fieldDetails}
                    optionStudent={optionStudent}
                    dataOptionStudent={dataOptionStudent}
                    optionCourse={optionCourse}
                    dataOptionCourse={dataOptionCourse}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='py-4'>
                    <Button 
                        onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                    >
                        + {locatioanName().pathName}
                    </Button>
                </div>
                <Table
                    data={dataRecordMateri?.data?.recordMateri ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
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

export default RecordMateriPage