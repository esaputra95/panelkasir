import { useMember } from "../../../../hooks/slices/masters/useMember";
import ModalForm from "../../../../components/ui/modal/ModalForm";
import FormMember from "./form";
import { Button } from "../../../../components/input";
import useLocatioanName from "../../../../utils/location";
import ModalConfirm from "../../../../components/ui/modal/ModalConfirm";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Column, Table } from "../../../../components/tables/table";
import { MemberTableInterface } from "../../../../interfaces/masters/MemberInterface";
import { DropdownSelector } from "../../../../components/ui/DropdownSelector";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

const MemberPage = () => {
  const pathname = useLocatioanName().pathNameOriginal;
  const user = useSelector((state: RootState) => state.userReducer);
  const {
    dataMember,
    errors,
    loading,
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
    isLoading,
  } = useMember();

  const memberColumns: Column<MemberTableInterface>[] = [
    { header: "Nama", accessor: "name", sortable: true, filterable: true },
    {
      header: "HP",
      accessor: "phone",
      sortable: true,
      filterable: true,
      render(row) {
        return row?.phone || "-";
      },
    },
    {
      header: "Alamat",
      accessor: "address",
      sortable: true,
      filterable: true,
      render(row) {
        return row?.address || "-";
      },
    },
    {
      header: "Aksi",
      accessor: "id",
      render: (row: MemberTableInterface) => (
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
              onDelete(row.id as number);
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
    <div className="w-full flex p-2 bg-white">
      <ModalConfirm data={modalConfirm.modalConfirm} />
      <ModalForm
        visible={modalForm.visible}
        onClose={onCancel}
        title={modalForm.label}
        size="medium"
      >
        <FormMember
          onCancel={onCancel}
          errors={errors}
          idDetail={idDetail}
          control={control}
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          setValue={setValue}
          getValues={getValues}
          isLoadingMutate={loading}
          status={status}
          isLoading={isLoading}
        />
      </ModalForm>
      <div className="w-full overflow-auto px-4 pb-4">
        <div className="py-4 flex justify-between items-center">
          {user?.level === "admin" || user?.level === "superadmin" ? (
            <Button
              onClick={() =>
                setModalForm((state) => ({ ...state, visible: true }))
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span className="text-lg">+</span> {t(pathname)}
            </Button>
          ) : (
            <div></div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table
            data={dataMember?.data?.member ?? []}
            columns={memberColumns}
            isLoading={isLoading}
            totalPages={page.total}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
