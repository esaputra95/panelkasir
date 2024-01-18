import { FC } from 'react'
import { ScheduleReportFilter } from '../../../../interfaces/reports/ScheduleReportInterface'
import { Button, InputText, LabelInput, SelectOption } from '../../../../components/input'
import { t } from 'i18next'
import { BsDownload } from "react-icons/bs";
import { useRoom } from '../../../../hooks/fetch/master/useRoom';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { useClassType } from '../../../../hooks/fetch/master/useClassType';
import { useCourse } from '../../../../hooks/fetch/master/useCourse';
import { useTutor } from '../../../../hooks/fetch/master/useTutor';
import { useStudent } from '../../../../hooks/fetch/master/useStudent';
import Spinner from '../../../../components/ui/Spinner';

const Filter: FC<ScheduleReportFilter> = (props) => {
    const {
        register,
        onSubmit,
        handleSubmit,
        onDownload,
        control,
        isLoadingMutate
    } = props

    const {
        optionRoom
    } = useRoom();

    const {
        optionClassType
    } = useClassType();

    const {
        optionCourse
    } = useCourse()

    const {
        optionTutor
    } = useTutor();

    const {
        optionStudentAll
    } = useStudent()

    return (
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full grid grid-cols-4 gap-2'>
                <InputText
                    {...register('startDate')}
                    type='date'
                    label={t('start-date')}
                />
                <InputText
                    {...register('endDate')}
                    type='date'
                    label={t('until-date')}
                />
                <SelectOption 
                    {...register('method')}
                    option={[
                        {label: t('Online'), value:'online'},
                        {label: t('Offline'), value:'offline'},
                    ]}
                    label={t('method')}
                />
                <div className='w-full'>
                    <LabelInput>{t("rooms")}</LabelInput>
                    <Controller
                        name="room"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                cacheOptions
                                placeholder={`${t('all')}...`}
                                defaultOptions
                                loadOptions={optionRoom}
                            />
                        }
                    />
                </div>
                <div className='w-full'>
                    <LabelInput>{t("scheduleType")}</LabelInput>
                    <Controller
                        name="scheduleType"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                cacheOptions
                                defaultOptions
                                placeholder={`${t('all')}...`}
                                loadOptions={optionClassType}
                            />
                        }
                    />
                </div>
                <div className='w-full'>
                    <LabelInput>{t("materials")}</LabelInput>
                    <Controller
                        name="course"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                cacheOptions
                                placeholder={`${t('all')}...`}
                                defaultOptions
                                loadOptions={optionCourse}
                            />
                        }
                    />
                </div>
                <div className='w-full'>
                    <LabelInput>{t("students")}</LabelInput>
                    <Controller
                        name="student"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                cacheOptions
                                placeholder={`${t('all')}...`}
                                defaultOptions
                                loadOptions={optionStudentAll}
                            />
                        }
                    />
                </div>
                <div className='w-full'>
                    <LabelInput>{t("tutors")}</LabelInput>
                    <Controller
                        name="tentor"
                        control={control}
                            render={({ field }) => 
                            <AsyncSelect 
                                className='w-full'
                                {...field}
                                placeholder={`${t('all')}...`}
                                cacheOptions
                                defaultOptions
                                loadOptions={optionTutor}
                            />
                        }
                    />
                </div>
            </div>
            <div className='w-full flex justify-end mt-4 mb-4 gap-4'>
                <Button 
                    type='button'
                    variant='success'
                    onClick={handleSubmit(onDownload)}
                >
                    {
                        isLoadingMutate ? <Spinner /> : <BsDownload/>
                    }
                </Button>
                <Button 
                    type='submit'
                >
                    {
                        isLoadingMutate ? <Spinner /> : t('view-data')
                    }
                </Button>
            </div>
        </form>
    )
}

export default Filter