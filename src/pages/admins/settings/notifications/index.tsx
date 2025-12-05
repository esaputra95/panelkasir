
import { useNotification } from '../../../../hooks/slices/settings/useNotification'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormNotification from './form'
import { Button } from '../../../../components/input'
import useLocatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { Column, Table } from '../../../../components/tables/table'
import { NotificationTableInterface } from '../../../../interfaces/settings/NotificationInterface'
import { DropdownSelector } from '../../../../components/ui/DropdownSelector'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'

const NotificationPage = () => {

    const pathname = useLocatioanName().pathNameOriginal;
    const User = useSelector((state:RootState)=> state.userReducer);
    const { 
        dataNotification, 
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
        watch,
        users,
        selectedUserIds,
        onUserSelect,
        onSelectAll,
        searchUsers,
        setSearchUsers,
    } = useNotification()

    const notificationColumns: Column<NotificationTableInterface>[] = [
    { header: "Title", accessor: "title", sortable: true, filterable: true,
        render(row) {
            return row?.title || '-';
        },
    },
    {
        header: "Body",
        accessor: "body",
        sortable: true,
        filterable: true,
        render(row) {
            return row?.body.length > 50 
                ? `${row.body.substring(0, 50)}...` 
                : row.body;
        },
    },
    {
        header: "Type",
        accessor: "type",
        sortable: true,
        filterable: true,
        render(row) {
            return row?.type || '-';
        },
    },
    {
        header: "Recipients",
        accessor: "recipientCount",
        sortable: false,
        filterable: false,
        render(row) {
            const count = row?.recipients?.length ?? row?.recipientCount ?? 0;
            return `${count} ${t("users")}`;
        },
    },
    {
        header: "Created At",
        accessor: "createdAt",
        sortable: true,
        filterable: true,
        filterType:'date',
        render(row) {
            return row.createdAt
                ? new Date(row.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                : "-";
        },
    },
    {
        header: "Action",
        accessor: "id",
        render: (row: NotificationTableInterface) => (
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
                size="medium"
            >
                <FormNotification
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
                    users={users}
                    selectedUserIds={selectedUserIds}
                    onUserSelect={onUserSelect}
                    onSelectAll={onSelectAll}
                    searchUsers={searchUsers}
                    setSearchUsers={setSearchUsers}
                />
            </ModalForm>
            <div className='w-full overflow-auto'>
                <div className='py-4 flex justify-between'>
                    {
                        (User?.level === "admin" || User?.level === "superadmin") ? (
                            <Button 
                                onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                            >
                                + {t(pathname)}
                            </Button>
                        ) : <div></div>
                    }
                </div>
                <Table
                    data={dataNotification?.notifications ?? []}
                    columns={notificationColumns}
                    isLoading={isFetching}
                    totalPages={dataNotification?.info.totalPage ?? 1}
                />
            </div>
        </div>
    )
}

export default NotificationPage
