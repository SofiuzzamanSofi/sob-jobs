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

export interface AnsTypes {
    time: Date;
    ansString: string;
};

export interface QuestionTypes {
    time: Date;
    questionString: string;
};

export interface QuestionAnsTypes {
    userId: string;
    userEmail: string;
    questionId: string;
    question: QuestionTypes;
    ans?: AnsTypes[];
};

export interface JobApplicants {
    userId?: string;
    userEmail?: string;
};

export interface JobDataTypes {
    email: string;
    position?: string;
    companyName?: string | undefined;
    experience?: string;
    workLevel?: string;
    employmentType?: string;
    location?: string;
    noOpening: string;
    isOpen: boolean;
    overview?: string;
    requirements?: string[];
    responsibilities?: string[];
    salaryRange?: string;
    skills?: string[];
    // _id?: string;
    // __v?: string;
    applicants?: JobApplicants[];
    questionAns?: QuestionAnsTypes[];
};