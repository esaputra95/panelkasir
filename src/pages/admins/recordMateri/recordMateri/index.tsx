import Table from './Table'
import TablePaging from './TablePaging'
import { useRecordMateri } from '../../../../hooks/fetch/recordMateri/useRecordMateri'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormRecordMateri from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useStudent } from '../../../../hooks/fetch/master/useStudent'
import { useCourse } from '../../../../hooks/fetch/master/useCourse'
import AsyncSelect from 'react-select/async';
import { SingleValue } from 'react-select'
import { OptionSelectInterface } from '../../../../interfaces/globalInterface'
import { BsSearch } from "react-icons/bs";
import { t } from 'i18next'

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
        dataOptionStudyGroup,
        optionStudyGroup,
        getListStudents,
        fieldDetails,
        handleOnChangeStudents,
        handleOnSearchStudent,
        updateStatus
    } = useRecordMateri()
    
    const {
        optionStudent,
        dataOptionStudent
    } = useStudent();

    const {
        optionCourse,
        dataOptionCourse
    } = useCourse();

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
                    dataOptionStudyGroup={dataOptionStudyGroup}
                    updateStatus={updateStatus}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='gap-2 flex w-full items-center justify-between'>
                    <div className='w-48'>
                        <Button 
                            onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                        >
                            + {locatioanName().pathName}
                        </Button>
                    </div>
                    <div className='w-4/12 flex items-center gap-2'>
                        <div className='w-full'>
                                <AsyncSelect 
                                    className='w-full'
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={optionStudent}
                                    onChange={(e: SingleValue<OptionSelectInterface>)=>handleOnChangeStudents(e?.value ?? '')}
                                    placeholder={t('select-students')}
                                    ref={(ref)=>ref}
                                />
                            <span className='text-red-300'>
                            {
                            errors.studyGroupId?.message
                            }
                            </span>
                        </div>
                        <Button type='submit' className='rounded-full' onClick={handleOnSearchStudent}>
                            <BsSearch />
                        </Button>
                    </div>
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