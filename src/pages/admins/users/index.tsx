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
        handleSubmit
    } = useUser()

    const { state, setModal} = modalFormState()
    
    useEffect(()=> {
        setModal({
            ...state,
            label: 'Form Add User Data'
        })
    }, [])
    

    const onDelete = (id:number) => {
        console.log(id);
    }

    return (
        <div className='w-full'>
            <ModalForm visible={state.visible} onClose={()=>setModal({...state, visible:false})} title={state.label} size="medium">
                <FormUser handleSubmit={handleSubmit} register={register} onSubmit={onSubmit} />
            </ModalForm>
            <div>
                <label className='text-lg font-semibold'>User Data List</label>
            </div>
            <div className='w-full'>
                <div className='py-4'>
                    <Button onClick={()=>setModal({...state, visible:true})} >+ User</Button>
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