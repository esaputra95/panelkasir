
import TablePaging from './TablePaging'
import { useUserManagement } from '../../../../hooks/slices/settings/useUserManagement'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormUserManagement from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { InputText } from "../../../../components/input";
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Column, Table } from '../../../../components/tables/table'
import { UserManagementTableInterface } from '../../../../interfaces/settings/UserManagementInterface'
import { DropdownSelector } from '../../../../components/ui/DropdownSelector'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'
import { Badge, BadgeVariant } from '../../../../components/ui/Badge'

const UserManagementPage = () => {

    const pathname = useLocatioanName().pathNameOriginal;
    const UserManagement = useSelector((state:RootState)=> state.userReducer);
    const { 
        dataUserManagement, 
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
        registerFilter,
        handleSubmitFilter,
        onFilter,
        setValue,
        getValues,
        control,
        watch
    } = useUserManagement()

    const userColumns: Column<UserManagementTableInterface>[] = [
    { header: "Nama", accessor: "name", sortable: true, filterable: true },
    {
        header: "Email",
        accessor: "email",
        sortable: true,
        filterable: true,
        render(row) {
            return row?.email;
        },
    },
    {
        header: "Phone",
        accessor: "phone",
        sortable: true,
        filterable: true,
        render(row) {
            return row?.phone;
        },
    },
    {
        header: "Level",
        accessor: "level",
        sortable: true,
        filterable: true,
        filterType:'select',
        filterOptions: [
            {label:'Super Admin', value: 'superadmin'},
            {label:'Admin', value: 'admin'},
            {label:'Owner', value:'owner'},
            {label:'Kasir', value:'cashier'}
        ],
        render(row) {
            return row?.level;
        },
    },
    {
        header: "Verifikasi",
        accessor: "verified",
        sortable: true,
        filterable: true,
        filterType:'select',
        filterOptions: [{label:'Aktif', value: 'active'},{label:'Tidak Aktif', value:'non_active'},{label:'Perifikasi Email', value:'verification_email'}],
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
        render: (row: UserManagementTableInterface) => (
            <DropdownSelector>
            <button
                onClick={() => {
                setModalForm((state) => ({
                    ...state,
                    visible: true,
                    type: "view",
                }));
                onDetail(row.id as number);
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
                onUpdate(row.id as number);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
                <BsPencil /> Edit
            </button>
            <button
                onClick={() => {
                    onDelete(row.id as number)
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
                <FormUserManagement
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
                <div className='py-4 flex justify-between'>
                    {
                        (UserManagement?.level === "admin" || UserManagement?.level === "superadmin") ? (
                            <Button 
                                onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                            >
                                + {t(pathname)}
                            </Button>
                        ) : <div></div>
                    }
                    <div className="w-6/12 md:w-4/12 relative text-gray-600">
                        <form onSubmit={handleSubmitFilter(onFilter)}>
                            <InputText
                                className='rounded-xl'
                                placeholder={t('search-name')}
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
                    data={dataUserManagement?.data?.UserManagement ?? []}
                    columns={userColumns}
                    isLoading={isFetching}
                    totalPages={dataUserManagement?.data.info.totalPage ?? 1}
        />
                {/* <Table
                    data={dataUserManagement?.data?.UserManagement ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                /> */}
                <TablePaging
                    page={page.page}
                    total={page.total}
                    handlePage={page.handlePage}
                />
            </div>
        </div>
    )
}

export default UserManagementPage