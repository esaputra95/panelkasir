import { ChangeEvent, FC } from 'react'
import { Button, InputText, LabelInput, SelectOption } from '../../../../components/input'
import { ClassInformationInterface } from '../../../../interfaces/schedule/ClassInformationInterface';
import { OptionSelectInterface } from '../../../../interfaces/globalInterface';
import { t } from 'i18next';
import AsyncSelect from 'react-select/async';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { BsFillXCircleFill } from 'react-icons/bs';

type FilterType = {
    handleOnChange: (e:ChangeEvent<HTMLInputElement>) => void;
    query: ClassInformationInterface;
    optionTutor: ((inputValue: string, callback: (options: OptionsOrGroups<string, GroupBase<string>>) => void) => void | Promise<OptionsOrGroups<string, GroupBase<string>>>) | undefined
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
    return (
        <div className='w-full flex flex-col gap-4'>
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
                        value={query.tutor}
                    />
                    <div className="bg-gray-200 rounded-md h-10 w-10 flex items-center justify-center">
                        <BsFillXCircleFill
                            className='text-gray-700 w-6 h-6'
                        />
                    </div>
                </div>
            </div>
            <SelectOption 
                option={[
                    {value: 'all', label: t('all')},
                    {value: 'online', label: 'Online'},
                    {value: 'offline', label: 'Offline'},
                ]}
                label={t('class-types')}
            />
            <div className='grid grid-cols-2 gap-4'>
                <InputText
                    label={t('from')}
                    type='date'
                    value={query.startDate}
                    onChange={(e)=>handleOnChange(e)}
                />
                <InputText
                    label={t('to')}
                    type='date'
                    value={query.startDate}
                    onChange={(e)=>handleOnChange(e)}
                />
               
            </div>
            <Button 
                type='button'
                onClick={()=>handleOnSearch(query)}
            >
                {t('view-data')}
            </Button>
        </div>
    )
}

export default Filter