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
    address: Address;
    id: number;
    email: string;
    username: string;
    password: string;
    name: Name;
    phone: string;
    __v: number;
}
  