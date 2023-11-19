import Table from './Table'
import TablePaging from './TablePaging'
import Spinner from '../../../components/ui/Spinner'
import { useUser } from '../../../hooks/fetch/useUser'
import ModalForm from '../../../components/ui/modal/ModalForm'
import FormUser from './form'
import { modalFormState } from '../../../utils/modalFormState'
import { useEffect } from 'react'
import { Button } from '../../../components/input'

const UserPage = () => {
    const { 
        data, 
        isLoading,
        register,
        onSubmit,
        errors,
        handleSubmit
    } = useUser()

    const {modalForm, setModalForm} = modalFormState()
    
    useEffect(()=> {
        setModalForm((state)=>({
            ...state,
            label: 'Form Add User Data'
        }))
    }, [])
    

    const onDelete = (id:number) => {
        console.log(id);
    }

    return (
        <div className='w-full'>
            <ModalForm visible={modalForm.visible} onClose={()=>setModalForm({...modalForm, visible:false})} title={modalForm.label} size="medium">
                <FormUser handleSubmit={handleSubmit} register={register} onSubmit={onSubmit} errors={errors} />
            </ModalForm>
            <div>
                <label className='text-lg font-semibold'>User Data List</label>
            </div>
            <div className='w-full'>
                <div className='py-4'>
                    <Button onClick={()=>setModalForm((state)=>({...state, visible:true}))} >+ User</Button>
                </div>
                {
                    isLoading ? 
                    <Spinner /> :
                    <>
                        <Table
                            data={data}
                            onDelete={()=>onDelete}
                        />
                        <TablePaging />
                    </>
                }
            </div>
        </div>
    )
}

export default UserPage