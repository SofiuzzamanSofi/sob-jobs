export interface RegisterDataTypes {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    gender?: string;
    country?: string;
    address?: string;
    city?: string;
    postcode?: string;
    companyName?: string;
    companyCategory?: string;
    employeeRange?: string;
    roleInCompany?: string;
    term?: boolean;
};

export interface JobQueryArrayTypes {
    id?: string;
    email: string;
    question?: string;
    reply: string[];
};

export interface JobApplicants {
    userId?: string;
    userEmail?: string;
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
    // _id?: string;
    // __v?: string;
    queries?: JobQueryArrayTypes[];
    applicants?: JobApplicants[];
};