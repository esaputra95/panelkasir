import { StoreSubscriptionStatusEnum, StoreSubscriptionTypeEnum } from "../../interfaces/settings/StoreSubscriptionInterface";

export const OptionDummy = {
    label: '',
    value: ''
}

export const UserDummy = {
    name: '',
    email: '',
    address: '',
    stockist: 0,
    code: 'Auto'
}
export const UserManagementDummy = {
    name: '',
    email: '',
    address: '',
    stockist: 0,
    code: 'Auto'
}
export const SubscriptionStoreDummy = {
    name: '',
    email: '',
    address: '',
    stockist: 0,
    code: 'Auto'
}
export const PaymentMethodDummy = {
    name: '',
    email: '',
    address: '',
    stockist: 0,
    code: 'Auto'
}

export const WarehouseDummy = {
    name: '',
    address: '',
    phone: ''
}

export const StoreSubscriptionDummy = {
    storeId: '',
    type: StoreSubscriptionTypeEnum.TRIAL,
    startDate: new Date(),
    endDate: new Date(),
    durationMonth: 1,
    price: 0,
    status: StoreSubscriptionStatusEnum.ACTIVE,
    paymentRef: ''
}