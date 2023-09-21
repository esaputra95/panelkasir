import { useEffect, useState } from 'react'
import Table from './Table'
import TablePaging from './TablePaging'
import { api } from '../../services'
import { UserInterface } from '../../interfaces/userInterface'

type UserData = {

}
const UserPage = () => {
    const [data, setData]= useState<UserInterface[]>([]);

    const getData = async () => {
        const data = await api.get('users');
        if(data){
            setData(data.data)
        }
    }

    useEffect(()=> {
        getData()
    }, [])
    return (
        <div className='w-full'>
            <div>
                <label className='text-lg font-semibold'>Users</label>
            </div>
            <div className='w-full mt-8'>
                <Table
                    data={data}
                />
                <TablePaging />
            </div>
        </div>
    )
}

export default UserPage