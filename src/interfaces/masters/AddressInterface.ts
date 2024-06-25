export interface ProvinceInterface {
    id: number;
    province_name: string;
    shipper_id: number;
}

export interface CityInterface {
    id: number;
    province_id: number;
    city_name: string;
    shipper_id: number;
}

export interface DistrictInterface {
    id: number;
    city_id: number;
    district_name: string;
    id_shipper: number | null; // Changed type to match the object
}