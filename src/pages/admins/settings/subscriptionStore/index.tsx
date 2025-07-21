import { useSubscriptionStore } from '../../../../hooks/slices/settings/useSubscriptionStore'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormSubscriptionStore from './form'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { Column, Table } from '../../../../components/tables/table'
import { DropdownSelector } from '../../../../components/ui/DropdownSelector'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'
import moment from 'moment'
import { SubscriptionStoreInterface } from '../../../../interfaces/settings/SubscriptionStoreInterface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import { t } from 'i18next'

const SubscriptionStorePage = () => {
    const user = useSelector((state:RootState)=> state.userReducer);
    const pathname = useLocatioanName().pathNameOriginal;
    const { 
        dataSubscriptionStore, 
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
        setValue,
        getValues,
        control,
        watch
    } = useSubscriptionStore()

    const userColumns: Column<SubscriptionStoreInterface>[] = [
    { 
        header: "Nama Toko",
        accessor: "stores",
        sortable: true,
        filterable: true,
        render(row) {
            return row.stores?.name
        }
    },
    {
        header: "Tanggal Mulai",
        accessor: "startDate",
        sortable: true,
        filterable: true,
        render(row) {
            return moment(row?.startDate).format('DD/MM/YYYY');
        },
    },
    {
        header: "Tanggal Berakhir",
        accessor: "startDate",
        sortable: true,
        filterable: true,
        render(row) {
            return moment(row?.endDate).format('DD/MM/YYYY');
        },
    },
    {
        header: "Aksi",
        accessor: "id",
        render: (row: SubscriptionStoreInterface) => (
            <DropdownSelector>
            <button
                onClick={() => {
                setModalForm((state) => ({
                    ...state,
                    visible: true,
                    type: "view",
                }));
                onDetail(row.id as string);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <BsEye className="h-4 w-4" /> Detail
            </button>
            <button
                onClick={() => {
                setModalForm((state) => ({
                    ...state,
                    visible: true,
                    type: "update",
                }));
                onUpdate(row.id as string);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <BsPencil /> Edit
            </button>
            <button
                onClick={() => {
                    onDelete(row.id as string)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
            >
                <BsTrash /> Hapus
            </button>
            </DropdownSelector>
        ),
    },
    ];

    return (
        <div className='w-full flex flex-col'>
            <div className='py-4'>
                {
                    (user?.level === "superadmin") ? (
                        <Button 
                            onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                        >
                            + {t(pathname)}
                        </Button>
                    ) : <div></div>
                }
            </div>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormSubscriptionStore
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    setValue={setValue}
                    getValues={getValues}
                    control={control}
                    watch={watch}
                />
            </ModalForm>
            <div className='w-full overflow-auto'>
                <Table
                    data={dataSubscriptionStore?.data?.subscriptionStore ?? []}
                    columns={userColumns}
                    isLoading={isFetching}
                    totalPages={dataSubscriptionStore?.data.info?.totalPage ?? 1}
                />
            </div>
        </div>
    )
}

export default SubscriptionStorePage