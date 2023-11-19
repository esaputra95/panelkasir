import Table from './Table'
import TablePaging from './TablePaging'
import { useMajor } from '../../../../hooks/fetch/master/useMajor'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormMajor from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { useUniversity } from '../../../../hooks/fetch/master/useUniversity'

const MajorPage = () => {
    const { 
        dataMajor, 
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
    } = useMajor()

    const { optionUniversity } = useUniversity()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormMajor
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    optionUniversity={optionUniversity}
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
                    data={dataMajor?.data?.major ?? []}
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

export default MajorPage