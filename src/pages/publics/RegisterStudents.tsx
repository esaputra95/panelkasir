const RegisterStudents = () => {
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
                <form>
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
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type='text'
                                            autoComplete="email"
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Jenis Kelamin
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option></option>
                                            <option>Laki-laki</option>
                                            <option>Perempuan </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-4/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        No Wa Siswa
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type="text"
                                            autoComplete="email"
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Asal Sekolah
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Tempat Lahir
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-4/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Tanggal Lahir
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="email"
                                        name="email"
                                        type="date"
                                        autoComplete="email"
                                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Kelas /Grade
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className='w-full grid grid-cols-3 gap-2'>
                                    <div className="w-full">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Negara
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Provinsi
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Kabupaten /Kota
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Alamat Rumah
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                <div className="sm:col-span-4 w-8/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Paket Bimbel
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type='text'
                                            autoComplete="email"
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Jumlah Sesi
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option></option>
                                            <option>Laki-laki</option>
                                            <option>Perempuan </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-6/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Prodi yang diambil
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type="text"
                                            autoComplete="email"
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
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
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option></option>
                                            <option>Pelajar</option>
                                            <option>Alumni </option>
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
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Jenis bimbingan
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option></option>
                                            <option>Pelajar</option>
                                            <option>Alumni </option>
                                        </select>
                                    </div>
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
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Nama Orang Tua
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type='text'
                                            autoComplete="email"
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4 w-8/12">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        WA Orang Tua
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="email"
                                            type='text'
                                            autoComplete="email"
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Save
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default RegisterStudents