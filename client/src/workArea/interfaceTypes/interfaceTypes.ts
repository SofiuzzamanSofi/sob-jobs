export interface AuthTypes {
    email: string | null;
    role: string;
    isLoading: boolean;
    isError: boolean;
    error: string;
    user?: RegisterTypes;
};

export interface CreateUserDataTypes {
    email: string;
    password: string;
};

export interface SignUpFormValueTypes {
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

// export interface JobDataTypes {
//     position?: string;
//     companyName?: string | undefined;
//     experience?: string;
//     workLevel?: string;
//     employmentType?: string;
//     location?: string;
//     overview?: string;
//     requirements?: string[];
//     responsibilities?: string[];
//     salaryRange?: string;
//     skills?: string[];
// }

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

export interface JobQueryArrayTypes {
    id?: string;
    email: string;
    question?: string;
    reply: string[];
};

export interface JobApplicantsTypes {
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
    _id?: string;
    __v?: string;
    queries?: JobQueryArrayTypes[];
    applicants?: JobApplicantsTypes[];
};
export interface GetJobsResTypes {
    success: boolean;
    message: string;
    data: JobDataTypes[];
};
export interface JobByIdResTypes {
    success: boolean;
    message: string;
    data: JobDataTypes;
};

export interface JobApplyDataTypes {
    jobId: string | undefined;
    userId: string | undefined;
    userEmail: string | undefined;
};
export interface QuestionDataTypes {
    jobId: string | undefined;
    userId: string | undefined;
    userEmail: string | undefined;
    question: QuestionTypes;
};

export interface QuestionAnsTypes {
    userId: string;
    userEmail: string;
    question: QuestionTypes;
    ans?: AnsTypes[] | undefined;
};

export interface QuestionTypes {
    time: Date;
    questionString: string;
};
export interface AnsTypes {
    time: Date;
    ansString: string;
};

const QuestionAns = [
    {
        userId: "ESFSFS4545VD465",
        userEmail: "example@example.com",
        question: "Question Name in string",
        ans: [
            {
                time: "15 minutes ago",
                ansString: "Question Ans in string",
            },
            {
                time: "15 minutes ago",
                ansString: "Question Ans in string",
            },
        ]
    }
];