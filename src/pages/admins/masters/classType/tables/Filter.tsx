import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { InputText } from '../../../../../components/input'
import { ClassTypeFilter } from '../../../../../interfaces/master/classTypeInterface'
import { FC } from 'react'
type Filter = {
    registerFilter: UseFormRegister<ClassTypeFilter>
}
const Filter: FC<Filter> = (props) => {
    const { 
        registerFilter
    } = props
    return (
        
            <tr>
                
                <td></td>
                <td className="px-6"> 
                    <InputText
                        {...registerFilter("code")}
                        className="text-xl"
                    />
                </td>
                <td className="px-6">
                    <InputText
                        {...registerFilter("name")}
                    />
                </td>
                <td></td>
                <td></td>
            </tr>
        
    )
}

export default Filter