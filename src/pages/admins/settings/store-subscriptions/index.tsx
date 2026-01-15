import { useStoreSubscription } from '../../../../hooks/slices/settings/useStoreSubscription'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormStoreSubscription from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Column, Table } from '../../../../components/tables/table'
import { StoreSubscriptionTableInterface } from '../../../../interfaces/settings/StoreSubscriptionInterface'
import { DropdownSelector } from '../../../../components/ui/DropdownSelector'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'
import { Badge, BadgeVariant } from '../../../../components/ui/Badge'

const StoreSubscriptionPage = () => {

    const pathname = useLocatioanName().pathNameOriginal;
    const user = useSelector((state:RootState)=> state.userReducer);
    const { 
        dataStoreSubscription, 
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
        setValue,
        getValues,
        control,
        watch
    } = useStoreSubscription()

    const storeSubscriptionColumns: Column<StoreSubscriptionTableInterface>[] = [
        { 
            header: "Store", 
            accessor: "storeId", 
            sortable: true, 
            filterable: true,
            render(row) {
                return row?.store?.name || row.storeId || "-";
            },
        },
        {
            header: "Type",
            accessor: "type",
            sortable: true,
            filterable: true,
            filterType: 'select',
            filterOptions: [
                {label:'Trial', value: 'trial'},
                {label:'Monthly', value: 'monthly'},
                {label:'Yearly', value: 'yearly'}
            ],
            render(row) {
                return row?.type || "-";
            },
        },
        {
            header: "Start Date",
            accessor: "startDate",
            sortable: true,
            render(row) {
                return row?.startDate ? new Date(row.startDate).toLocaleDateString() : "-";
            },
        },
        {
            header: "End Date",
            accessor: "endDate",
            sortable: true,
            render(row) {
                return row?.endDate ? new Date(row.endDate).toLocaleDateString() : "-";
            },
        },
        {
            header: "Duration (Months)",
            accessor: "durationMonth",
            sortable: true,
            render(row) {
                return row?.durationMonth || "-";
            },
        },
        {
            header: "Price",
            accessor: "price",
            sortable: true,
            render(row) {
                return row?.price ? `Rp ${Number(row.price).toLocaleString()}` : "-";
            },
        },
        {
            header: "Status",
            accessor: "status",
            sortable: true,
            filterable: true,
            filterType: 'select',
            filterOptions: [
                {label:'Active', value: 'active'},
                {label:'Pending', value: 'pending'},
                {label:'Expired', value: 'expired'},
                {label:'Cancelled', value: 'cancelled'}
            ],
            render(row) {
                let variant: BadgeVariant = 'gray';
                if (row.status === 'ACTIVE') variant = 'green';
                else if (row.status === 'EXPIRED') variant = 'yellow';
                else if (row.status === 'CANCELLED') variant = 'red';
                
                return(
                    <Badge variant={variant}>{row.status}</Badge>
                )
            },
        },
        {
            header: "Payment Ref",
            accessor: "paymentRef",
            sortable: true,
            filterable: true,
            render(row) {
                return row?.paymentRef || "-";
            },
        },
        {
            header: "Action",
            accessor: "id",
            render: (row: StoreSubscriptionTableInterface) => (
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
                            onDelete(row.id as string);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                    >
                        <BsTrash /> Delete
                    </button>
                </DropdownSelector>
            ),
        },
    ];

    return (
        <div className='w-full flex p-2 bg-white'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="large"
            >
                <FormStoreSubscription
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
            <div className='w-full overflow-auto px-4 pb-4'>
                <div className='py-4 flex justify-between items-center'>
                    {
                        (user?.level === "admin" || user?.level === "superadmin") ? (
                            <Button 
                                onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                            >
                                <span className="text-lg">+</span> {t(pathname)}
                            </Button>
                        ) : <div></div>
                    }
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <Table
                        data={dataStoreSubscription?.data?.storeSubscriptions ?? []}
                        columns={storeSubscriptionColumns}
                        isLoading={isFetching}
                        totalPages={page.total}
                    />
                </div>
            </div>
        </div>
    )
}

export default StoreSubscriptionPage
