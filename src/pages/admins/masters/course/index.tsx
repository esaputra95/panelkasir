import Table from './Table'
import TablePaging from './TablePaging'
import { useCourse } from '../../../../hooks/fetch/master/useCourse'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormCourse from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useMajor } from '../../../../hooks/fetch/master/useMajor'

const CoursePage = () => {
    const { 
        dataCourse, 
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
        control
    } = useCourse()

    const { optionMajor } = useMajor()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormCourse
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    optionMajor={optionMajor}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    control={control}
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
                    data={dataCourse?.data?.course ?? []}
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

export default CoursePage