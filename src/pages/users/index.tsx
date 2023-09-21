import { useEffect, useState } from 'react'
import Table from './Table'
import TablePaging from './TablePaging'
import { api } from '../../services'
import { UserInterface } from '../../interfaces/userInterface'
import useFetch from '../../hooks/useFetch'
import url from '../../services/url'
import Spinner from '../../components/ui/Spinner'

const UserPage = () => {
    const { users } = url

    const { data, loading, refectch } = useFetch(users)

    return (
        <div className='w-full'>
            <div>
                <label className='text-lg font-semibold'>Users</label>
            </div>
            <div className='w-full mt-8'>
                {
                    loading ? 
                    <Spinner /> :
                    <>
                        <Table
                            data={data}
                        />
                        <TablePaging />
                    </>
                }
                
            </div>
        </div>
    )
}

export default UserPage