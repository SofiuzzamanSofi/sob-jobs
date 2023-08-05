export interface AuthType {
    email: string | null;
    role: string;
    isLoading: boolean;
    isError: boolean;
    error: string;
    user?: RegisterTypes;
};

export interface createUserData {
    email: string;
    password: string;
};

export interface SignUpFormValues {
    email: string;
    password: string;
    confirmPassword?: string;
};

export interface RegisterTypes {
    firstName?: string;
    lastName?: string;
    email?: string | undefined;
    gender?: string;
    country?: string;
    address?: string;
    city?: string;
    postcode?: string;
    companyCategory?: string;
    companyName?: string;
    employeeRange?: string;
    roleInCompany?: string;
    term?: boolean;
    role?: string;
    _id?: string;
    __v?: string | number;
};

export interface JobDataTypes {
    position?: string;
    companyName?: string | undefined;
    experience?: string;
    workLevel?: string;
    employmentType?: string;
    location?: string;
    overview?: string;
    requirements?: string[];
    responsibilities?: string[];
    salaryRange?: string;
    skills?: string[];
}

export interface CandidateFormDataTypes {
    firstName?: string;
    lastName?: string;
    email?: string | undefined;
    gender?: string;
    country?: string;
    address?: string;
    city?: string;
    postcode?: string;
    term?: boolean;
};

export interface EmployerFormDataTypes {
    companyCategory?: string;
    companyName?: string;
    country?: string;
    email?: string | undefined;
    employeeRange?: string;
    firstName?: string;
    gender?: string;
    lastName?: string;
    roleInCompany?: string;
    term?: boolean;
};

export interface JobDataTypes {
    position?: string;
    companyName?: string | undefined;
    experience?: string;
    workLevel?: string;
    employmentType?: string;
    location?: string;
    overview?: string;
    requirements?: string[];
    responsibilities?: string[];
    salaryRange?: string;
    skills?: string[];
    _id?: string;
    __v?: string;
};
export interface JobDataResTypes {
    success: boolean;
    message: string;
    data: JobDataTypes[];
};