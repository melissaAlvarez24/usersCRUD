
export interface TFormUser {
    id?:          string;
    firstName:    string,
    lastName:     string,
    picture:      string;
    email:        string;
    dateOfBirth:  Date;
    phone:        string;
}

export interface TDataReturn {
    data: TFullUser;
    total: number;
    page: number;
    limit: number;
}

export interface TFullUser {
    id:           string;
    title:        string;
    firstName:    string;
    lastName:     string;
    picture:      string;
    gender:       string;
    email:        string;
    dateOfBirth:  Date;
    phone:        string;
    location:     Location;
    registerDate: Date;
    updatedDate:  Date;
}

export interface Location {
    street:   string;
    city:     string;
    state:    string;
    country:  string;
    timezone: string;
}


export interface TCreateUserC {
    data: TDataTCreateUser;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleGenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface TDataTCreateUser {
    form?: TFormUser;
    stateDetail: boolean;
    selectedTitle: string;
    selectedGender: string;
    titles: selectedOptions[];
    genders: selectedOptions[];
}

export interface selectedOptions {
    value: string;
    label: string;
}

export type Method = "get" | "post" | "put" | "delete"