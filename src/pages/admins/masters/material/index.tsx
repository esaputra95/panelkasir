import Table from './Table'
import TablePaging from './TablePaging'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormMaterial from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useMaterial } from '../../../../hooks/fetch/master/useMaterial'
import { useCourse } from '../../../../hooks/fetch/master/useCourse'

const MaterialPage = () => {
    const { 
        dataMaterial, 
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
    } = useMaterial()

    const { optionCourse } = useCourse()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormMaterial
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    optionCourse={optionCourse}
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
                        + {locatioanName().pathName}
                    </Button>
                </div>
                <Table
                    data={dataMaterial?.data?.material ?? []}
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

export default MaterialPage