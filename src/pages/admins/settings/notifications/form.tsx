import { FC, useMemo } from 'react'
import { InputText, Button } from '../../../../components/input';
import { NotificationFormProps } from '../../../../interfaces/settings/NotificationInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormNotification: FC<NotificationFormProps> = (props) => {
    const {t} = useTranslation()
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        users,
        selectedUserIds,
        onUserSelect,
        onSelectAll,
        searchUsers,
        setSearchUsers,
    } = props;

    const filteredUsers = useMemo(() => {
        if (!searchUsers) return users;
        return users.filter(user => 
            user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
            user.email.toLowerCase().includes(searchUsers.toLowerCase())
        )
    }, [users, searchUsers])

    const isAllSelected = filteredUsers.length > 0 && selectedUserIds.length === users.length

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col '>
                <div className='grid grid-cols-1 gap-4'>
                    <InputText
                        {...register("title")}
                        errors={errors.title?.message} 
                        readOnly={idDetail?true:false} 
                        label={t("title")} 
                        placeholder={t("enter-title")}
                    />
                    
                    <div className='flex flex-col'>
                        <label className='text-sm font-medium text-gray-700 mb-1'>
                            {t("body")} <span className='text-red-500'>*</span>
                        </label>
                        <textarea
                            {...register("body")}
                            readOnly={idDetail?true:false}
                            rows={4}
                            className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder={t("enter-body")}
                        />
                        {errors.body && (
                            <span className='text-red-500 text-xs mt-1'>{errors.body.message}</span>
                        )}
                    </div>
                    {/* User Selection */}
                    {!idDetail && (
                        <div className='border border-gray-300 rounded-lg p-4'>
                            <label className='text-sm font-medium text-gray-700 mb-2 block'>
                                {t("select-users")} <span className='text-red-500'>*</span>
                            </label>
                            
                            {/* Search Users */}
                            <div className='mb-3'>
                                <InputText
                                    value={searchUsers}
                                    onChange={(e) => setSearchUsers(e.target.value)}
                                    placeholder={t("search-users")}
                                    className='w-full'
                                />
                            </div>

                            {/* Select All */}
                            <div className='mb-3 pb-3 border-b border-gray-200'>
                                <label className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded'>
                                    <input
                                        type='checkbox'
                                        checked={isAllSelected}
                                        onChange={onSelectAll}
                                        className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
                                    />
                                    <span className='text-sm font-medium text-gray-700'>
                                        {t("select-all")} ({users.length} {t("users")})
                                    </span>
                                </label>
                            </div>

                            {/* Users List */}
                            <div className='max-h-60 overflow-y-auto space-y-1'>
                                {filteredUsers.length === 0 ? (
                                    <p className='text-gray-500 text-sm text-center py-4'>
                                        {t("no-users-found")}
                                    </p>
                                ) : (
                                    filteredUsers.map(user => (
                                        <label 
                                            key={user.id}
                                            className='flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded'
                                        >
                                            <input
                                                type='checkbox'
                                                checked={selectedUserIds.includes(user.id)}
                                                onChange={() => onUserSelect(user.id)}
                                                className='w-4 h-4 text-blue-600 rounded focus:ring-blue-500'
                                            />
                                            <div className='flex-1'>
                                                <div className='text-sm font-medium text-gray-900'>
                                                    {user.name}
                                                </div>
                                                <div className='text-xs text-gray-500'>
                                                    {user.email}
                                                </div>
                                            </div>
                                        </label>
                                    ))
                                )}
                            </div>

                            {/* Selected Count */}
                            <div className='mt-3 pt-3 border-t border-gray-200'>
                                <p className='text-sm text-gray-600'>
                                    {selectedUserIds.length} {t("users-selected")}
                                </p>
                            </div>

                            {errors.userIds && (
                                <span className='text-red-500 text-xs mt-1 block'>
                                    {errors.userIds.message}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Display recipients for detail view */}
                    {idDetail && (
                        <div className='border border-gray-300 rounded-lg p-4'>
                            <label className='text-sm font-medium text-gray-700 mb-2 block'>
                                {t("recipients")}
                            </label>
                            <div className='text-sm text-gray-600'>
                                {selectedUserIds.length} {t("users")}
                            </div>
                        </div>
                    )}
                </div>
                
            </div>
            <div className='w-full flex justify-end space-x-2 mt-4'>
                <Button
                    type='button'
                    variant="error"
                    onClick={onCancel}
                    size="medium"
                    className='my-4' >
                        {t("cancel")}
                    </Button>
                {!idDetail ? 
                    <Button 
                        disabled={isLoading?true:false} 
                        variant="primary" 
                        type='submit' 
                        size="medium" 
                        className='my-4' >
                            {t('save')} {isLoading?<Spinner />:null}
                    </Button>
                : null}
            </div>
        </form>
    )
}

export default FormNotification
