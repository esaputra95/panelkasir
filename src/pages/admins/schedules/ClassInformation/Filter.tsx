import { FC } from 'react'
import {
    Button,
    InputText,
    LabelInput,
    SelectOption
} from '../../../../components/input'
import { ClassInformationInterface } from '../../../../interfaces/schedule/ClassInformationInterface';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';
import { t } from 'i18next';
import AsyncSelect from 'react-select/async';
import useAccess from '../../../../utils/useAccess';


type FilterType = {
    handleOnChange: (name:string, value:string) => void;
    query: ClassInformationInterface;
    optionTutor: (data: string) => Promise<OptionSelectInterface[]>;
    dataOptionTutor: OptionSelectInterface[];
    handleOnSearch: (queryData: ClassInformationInterface) => void
}
const Filter: FC<FilterType> = (props) => {
    const {
        handleOnChange,
        query,
        optionTutor,
        handleOnSearch
    } = props

    const {
        token
    } = useAccess()

    return (
        <div className='w-full'>
            <div className='w-full lg:grid lg:grid-cols-4 lg:gap-4'>
                {
                    token?.userType === "admin" ? (
                        <div className='w-full'>
                            <LabelInput>
                                {t('tutors')}
                            </LabelInput>
                            <div className='flex items-center'>
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={optionTutor}
                                    defaultOptions
                                    className='w-full'
                                    onChange={(e)=>handleOnChange('tentor', e?.value ?? '')}
                                />
                            </div>
                        </div>
                    ) : null
                }
                
                <SelectOption 
                    option={[
                        {value: 'online', label: 'Online'},
                        {value: 'offline', label: 'Offline'},
                    ]}
                    onChange={(e)=>handleOnChange('type', e.target.value)}
                    label={t('class-types')}
                />
                <InputText
                    label={t('from')}
                    type='date'
                    value={query.startDate}
                    onChange={(e)=>handleOnChange('startDate', e.target.value)}
                />
                <InputText
                    label={t('to')}
                    type='date'
                    value={query.endDate}
                    onChange={(e)=>handleOnChange('endDate', e.target.value)}
                />
            </div>
            <div className='w-full flex justify-end my-4'>
                <Button 
                    type='button'
                    onClick={()=>handleOnSearch(query)}
                >
                    {t('view-data')}
                </Button>
            </div>
            
        </div>
    )
}

export default Filter