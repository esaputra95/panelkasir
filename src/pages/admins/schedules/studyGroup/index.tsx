import Table from './Table'
import TablePaging from './TablePaging'
import { useStudyGroup } from '../../../../hooks/fetch/schedule//useStudyGroup'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormStudyGroup from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useStudent } from '../../../../hooks/fetch/master/useStudent'
import { useClassMaster } from '../../../../hooks/fetch/master/useClassMaster'
import { useGuidanceType } from '../../../../hooks/fetch/settings/useGuidanceType'
import { useEffect } from 'react'

const StudyGroupPage = () => {
    const { 
        dataStudyGroup, 
        isFetching,
        errors,
        isLoadingMutate,
        register,
        onSubmit,
        handleSubmit,
        fields,
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
        append,
        remove,
        setValue,
        getValues,
        updateStatus,
        openSchedule,
        onChangeStudyGroup,
        onChangeStudyGroupDetail
    } = useStudyGroup()

    const { 
        optionGuidanceType,
        dataOptionGuidanceType
    } = useGuidanceType()

    const { 
        optionStudent,
        dataOptionStudent
    } = useStudent()

    const { 
        optionClassMaster,
        dataOptionClassMaster
    } = useClassMaster()

    useEffect(()=> {
        optionClassMaster
    },[])

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="large"
            >
                <FormStudyGroup
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    control={control}
                    optionGuidanceType={optionGuidanceType}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    fields={fields}
                    optionStudent={optionStudent}
                    append={append}
                    remove={remove}
                    optionClassMaster={optionClassMaster}
                    dataOptionClassMaster={dataOptionClassMaster}
                    setValue={setValue}
                    getValues={getValues}
                    dataOptionGuidanceType={dataOptionGuidanceType}
                    dataOptionStudent={dataOptionStudent}
                    updateStatus={updateStatus}
                    onChangeStudyGroup={onChangeStudyGroup}
                    onChangeStudyGroupDetail={onChangeStudyGroupDetail}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='py-4'>
                    <Button 
                        onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                    >
                        + {useLocatioanName().pathName}
                    </Button>
                </div>
                <Table
                    data={dataStudyGroup?.data?.studyGroup ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    openSchedule={openSchedule}
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

export default StudyGroupPage