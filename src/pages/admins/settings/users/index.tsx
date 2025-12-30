import { useUser } from '../../../../hooks/slices/settings/useUser'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormUser from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Column, Table } from '../../../../components/tables/table'
import { UserTableInterface } from '../../../../interfaces/settings/UserInterface'
import { DropdownSelector } from '../../../../components/ui/DropdownSelector'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'
import { Badge, BadgeVariant } from '../../../../components/ui/Badge'

const UserPage = () => {

    const pathname = useLocatioanName().pathNameOriginal;
    const user = useSelector((state:RootState)=> state.userReducer);
    const { 
        dataUser, 
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
    } = useUser()

    const userColumns: Column<UserTableInterface>[] = [
        { header: "Nama", accessor: "name", sortable: true, filterable: true },
        {
            header: "Email",
            accessor: "email",
            sortable: true,
            filterable: true,
            render(row) {
                return row?.email || "-";
            },
        },
        {
            header: "Phone",
            accessor: "phone",
            sortable: true,
            filterable: true,
            render(row) {
                return row?.phone || "-";
            },
        },
        {
            header: "Level",
            accessor: "level",
            sortable: true,
            filterable: true,
            filterType: 'select',
            filterOptions: [
                {label:'Super Admin', value: 'superadmin'},
                {label:'Admin', value: 'admin'},
                {label:'Cashier', value: 'cashier'}
            ],
            render(row) {
                return row?.level || "-";
            },
        },
        {
            header: "Verifikasi",
            accessor: "verified",
            sortable: true,
            filterable: true,
            filterType: 'select',
            filterOptions: [
                {label:'Aktif', value: 'active'},
                {label:'Tidak Aktif', value:'non_active'}
            ],
            render(row) {
                const varian:BadgeVariant  = row.verified === 'active' ? 'blue' : 'red';
                return(
                    <Badge variant={varian}>{row.verified}</Badge>
                )
            },
        },
        {
            header: "Aksi",
            accessor: "id",
            render: (row: UserTableInterface) => (
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
                        <BsTrash /> Hapus
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
                size="medium"
            >
                <FormUser
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
                        data={dataUser?.data?.user ?? []}
                        columns={userColumns}
                        isLoading={isFetching}
                        totalPages={page.total}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserPage