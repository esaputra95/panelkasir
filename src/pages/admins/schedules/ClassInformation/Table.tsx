import { FC } from 'react'
import {  StudyGroup } from '../../../../interfaces/schedule/ClassInformationInterface'

type TableType = {
    dataClassInformation: StudyGroup[][] | undefined
}

const TableClassInformation: FC<TableType> = (props) => {
    const {
        dataClassInformation
    } = props

    return (
        <div className='w-full flex'>
            <div className='w-full '>
                {
                     dataClassInformation?.map((value)=> (
                        <div className='bg-green-200 flex '>
                            <div className=' bg-pink-200 '>
                            <div className='bg-green-200 flex relative'>
                            {
                                value.map((v)=> (
                                    <div className={`w-32 bg-pink-200 border-2 border-gray-200 ${v.cols ? ' bg-red-400 h-32':'h-8'}`}>
                                        {/* s */}
                                        <span>
                                                     {
                                                        v.start+'-'+v.finish
                                                    }
                                                 </span>
                                                 <span>
                                                     {
                                                        v.name
                                                    }
                                                </span>
                                                 <span>
                                                     {
                                                        v.tentor
                                                    }
                                                </span>
                                                 <span>
                                                     {
                                                        v.type
                                                    }
                                                 </span>
                                    </div>
                                ))
                            }
                        </div>
                            </div>
                        </div>
                     ))
                }
            
                
            </div>
        </div>
        // <div 
        //     className='relative overflow-x-auto'
        // >
        //     <div 
        //         className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'
        //     >
        //     {
        //         dataClassInformation?.map((value)=> (
        //             <div 
        //                 className='text-xs flex text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'
        //             >
        //                 {
        //                     value.map((v, index)=>
        //                         <div 
        //                             className={`bg-green-100 h-8 border-2 border-gray-200 relative`}
        //                         >
        //                             {
        //                                 v.status ? (
        //                                     <div
        //                                         className={`w-full flex flex-col ${v.cols? 'absolute h-32':''}`}
        //                                     >
        //                                         <span>
        //                                             {
        //                                                 v.start+'-'+v.finish
        //                                             }
        //                                         </span>
        //                                         <span>
        //                                             {
        //                                                 v.name
        //                                             }
        //                                         </span>
        //                                         <span>
        //                                             {
        //                                                 v.tentor
        //                                             }
        //                                         </span>
        //                                         <span>
        //                                             {
        //                                                 v.type
        //                                             }
        //                                         </span>
        //                                     </div>
        //                                 ) : (
        //                                     <div>
        //                                         {
        //                                             index===0 ? v.time : ''
        //                                         }
        //                                     </div>
        //                                 )
        //                             }
        //                         </div>
        //                     )
        //                 }
        //             </div>
        //         ))
        //     }
        //     </div>
        // </div>
        
    )
}

export default TableClassInformation