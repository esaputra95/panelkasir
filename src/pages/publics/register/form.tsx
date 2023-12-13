import { FC } from 'react'
import { RegisterFormInterface } from '../../../interfaces/public/registerInterface'
import { Button, InputText, SelectAutoComplete, SelectOption } from '../../../components/input'
import { useTranslation } from 'react-i18next'
import InputCheckBox from '../../../components/input/inputCheckBox'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { Controller } from 'react-hook-form'

const FormRegister: FC<RegisterFormInterface> = (props) => {
    const { 
        register,
        errors,
        handleSubmit,
        onSubmit,
        optionPackage,
        control,
        optionSession,
        optionGuidanceType
    } = props
    const {t} = useTranslation()

    return (
        <div className='w-full min-h-screen bg-gray-100 py:2 xl:py-4 lg:py-4 md:py-4'>
            <div className='xl:flex lg:flex md:flex justify-center w-10/12 bg-white p-2 xl:p-8 lg:p-8 md:p-8  m-auto space-x-4 rounded-md mb-4'>
                <img src="http://localhost:5173/assets/logo.png" className='h-16 w-16' alt="Logo" />
                <div className='w-full flex flex-col'>
                    <span className='w-full text-3xl font-bold text-left'>Halaman Pendaftaran ESP BIMBEL</span>
                    <span className='w-full text-xl font-semibold text-left'>Tahun Ajaran 2023/2034</span>
                    <span className='w-full text-left font-light'>Harap mengisi seluruh form dengan baik dan benar</span>
                </div>
            </div>
            <div className='flex flex-col bg-white w-10/12 m-auto min-h-full py-8 px-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Informasi data diri Siswa
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Mohon untuk mengisi semua form dengan baik ban benar
                            </p>
                            <div className="mt-10 w-full space-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4 w-full xl:w-8/12 lg:w-8/12 md:w-8/12 ">
                                    <InputText
                                        {...register("name")}
                                        errors={errors?.name?.message} 
                                        label={t("name")} 
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <SelectOption 
                                        {...register('gender')}
                                        name='gender'
                                        label={t("gender")}
                                        errors={errors?.gender?.message}
                                        option={[{value:'laki_laki', label:'Lak-Laki'}, {value:'perempuan', label:'Perempuan'}]}
                                    />
                                </div>
                                {/* <div className="sm:col-span-4 w-4/12">
                                    <InputText
                                        {...register("phone")}
                                        errors={errors?.phone?.message} 
                                        label={t("phone")} 
                                    />
                                </div> */}
                                <div className="sm:col-span-4 w-4/12">
                                    <label htmlFor="phone-input">Phone Number</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value)
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                onChange={onChange}
                                                defaultCountry="ID"
                                                id="phone"
                                                value={value}
                                                className='shadow appearance-none border rounded
                                                w-full py-2 px-3 text-gray-700 leading-tight 
                                                focus:outline-none focus:shadow-outline'
                                            />
                                        )}
                                    />
                                    <p className="error-message">{errors?.phone?.message}</p>
                                </div>
                                {/* <div className="sm:col-span-4 w-4/12 flex">
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={value}
                                        onChange={()=>setValue}
                                        className='shadow appearance-none border rounded
                                        w-full py-2 px-3 text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline'
                                    />
                                </div> */}
                                <div className="sm:col-span-4 w-6/12">
                                    <InputText
                                        {...register("school")}
                                        errors={errors?.school?.message} 
                                        label={t("school")} 
                                    />
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <InputText
                                        {...register("placeBirth")}
                                        errors={errors?.placeBirth?.message} 
                                        label={t("place-birth")} 
                                    />
                                </div>
                                <div className="sm:col-span-4 w-4/12">
                                    <InputText
                                        {...register("dateBirth")}
                                        errors={errors?.dateBirth?.message} 
                                        type='date'
                                        label={t("date-birth")} 
                                    />
                                </div>

                                <div className="sm:col-span-4 w-8/12">
                                    <InputText
                                        {...register("email")}
                                        errors={errors?.email?.message} 
                                        type='text'
                                        label={t("email")} 
                                    />
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <InputText
                                        {...register("classGrade")}
                                        errors={errors?.classGrade?.message} 
                                        type='text'
                                        label={t("class-grade")} 
                                    />
                                </div>
                                <div className='w-full grid grid-cols-3 gap-2'>
                                    <InputText
                                        {...register("country")}
                                        errors={errors?.country?.message} 
                                        type='text'
                                        label={t("country")} 
                                    />
                                    <InputText
                                        {...register("province")}
                                        errors={errors?.province?.message} 
                                        type='text'
                                        label={t("province")} 
                                    />
                                    <InputText
                                        {...register("city")}
                                        errors={errors?.city?.message} 
                                        type='text'
                                        label={t("city")} 
                                    />
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        {t('address')}
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register('address')}
                                            rows={3}
                                            className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                        Tulis alamat dengan lengkap, agar memudahkan dalam pengiriman modul belajar
                                    </p>
                                </div>
                                
                                <div className="col-span-full">
                                    <label
                                        htmlFor="photo"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <svg
                                        className="h-12 w-12 text-gray-300"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                        <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                        Change
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Informasi Paket Bimbingan Belajar
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Mohon untuk mengisi semua form dengan baik ban benar
                            </p>
                            <div className="mt-10 w-full space-y-8 sm:grid-cols-6">
                                <div className='w-5/12'>
                                    <SelectAutoComplete 
                                        control={control}
                                        errors={errors}
                                        loadOption={optionSession}
                                        name='sessionId'
                                        label={t("session-quantities")}
                                    />
                                </div>
                                <div className='w-5/12'>
                                    <SelectAutoComplete 
                                        control={control}
                                        errors={errors}
                                        loadOption={optionGuidanceType}
                                        name='guidanceType'
                                        label={t("guidance-types")}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Status
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            {...register('statusStudy')}
                                            id="statusStudy"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option></option>
                                            <option value='pelajar'>Pelajar</option>
                                            <option value='alumni'>Alumni </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Lokasi Belajar
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option></option>
                                            <option>Online</option>
                                            <option>Offline </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='w-5/12'>
                                    <SelectAutoComplete 
                                        control={control}
                                        errors={errors}
                                        loadOption={optionPackage}
                                        name='packageId'
                                        label={t("guidance-packages")}
                                    />
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <InputText
                                        {...register('studyProgram')}
                                        label={t('studyProgram')}
                                        type='text'
                                    />
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <InputText
                                        {...register('university')}
                                        label={t('university')}
                                        type='text'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Informasi Data Orang Tua
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Mohon untuk mengisi semua form dengan baik ban benar
                            </p>
                            <div className="mt-10 w-full space-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4 w-8/12">
                                    <InputText
                                        {...register('parentName')}
                                        label={t('parent-name')}
                                        errors={errors?.parentName?.message}
                                        type='text'
                                    />
                                </div>
                                {/* <div className="sm:col-span-4 w-8/12">
                                    <InputText
                                        {...register('parentPhone')}
                                        label={t('parent-phone')}
                                        errors={errors?.parentPhone?.message}
                                        type='text'
                                    />
                                </div> */}
                                <div className="sm:col-span-4 w-4/12">
                                    <label htmlFor="phone-input">Phone Number</label>
                                    <Controller
                                        name="parentPhone"
                                        control={control}
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value)
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <PhoneInput
                                                onChange={onChange}
                                                defaultCountry="ID"
                                                id="phone"
                                                value={value}
                                                className='shadow appearance-none border rounded
                                                w-full py-2 px-3 text-gray-700 leading-tight 
                                                focus:outline-none focus:shadow-outline'
                                            />
                                        )}
                                    />
                                    <p className="error-message">{errors?.phone?.message}</p>
                                </div>
                            </div>
                        </div>
                        <InputCheckBox
                            {...register('agreement')}
                            value={1}
                            label='Menyetujui semua persyaratan'
                        />
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button 
                            type='button'
                            variant='error'
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            type='submit'
                            variant='primary'
                        >
                            {t('register')}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default FormRegister
