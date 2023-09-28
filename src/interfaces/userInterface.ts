import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface Geolocation {
    lat: string;
    long: string;
}
  
interface Address {
    geolocation: Geolocation;
    city: string;
    street: string;
    number: number;
    zipcode: string;
}
  
interface Name {
    firstname: string;
    lastname: string;
}
  
export interface UserInterface {
    address?: Address;
    id: number;
    email: string;
    username: string;
    password: string;
    name?: Name;
    phone: string;
    __v?: number;
}

export type UserInterfaceForm = Omit<UserInterface, 'id' | '__v' | 'name' | 'address' >

export type UserSearchType = {
    username?: string;
    email?: string
}

export type UserFormProps = {
	handleSubmit: UseFormHandleSubmit<UserInterfaceForm>
	onSubmit: (data:UserInterfaceForm) => void;
	register: UseFormRegister<UserInterfaceForm>
}
  