import { BankStatusEnum, BankTypeEnum } from "../../interfaces/masters/BankInterface"

export const BankDummy = {
    name: '',
    account_name:'',
    branch:'',
    code:'',
    account_number:'',
    bank:'',
    bank_account_name:'',
    description:'',
    status:'draft' as BankStatusEnum.draft,
    type: 'va' as BankTypeEnum.va,
}

export const CustomerDummy = {
    name: '',
    email: '',
    address: ''
}

export const MosqueDummy = {
    name: '',
    email: '',
    address: ''
}

export const BankTypeDummy = [
    {label: 'Virtual Account', value:'va'}, 
    {label: 'Transfer', value:'transfer'},
    {label: 'Ewallet', value:'ewallet'},
    {label: 'Retail', value:'retail'},
    {label: 'QR', value:'qr'},
]

export const MosqueTypeDummy = [
    {label: 'Virtual Account', value:'va'}, 
    {label: 'Transfer', value:'transfer'},
    {label: 'Ewallet', value:'ewallet'},
    {label: 'Retail', value:'retail'},
    {label: 'QR', value:'qr'},
]

export const StatusDummy = [
    {label: 'Draft', value:'draft'},
    {label: 'Publish', value:'publish'}
]