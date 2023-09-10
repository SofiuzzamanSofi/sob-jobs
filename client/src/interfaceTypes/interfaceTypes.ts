// UserSchema / Data Types 
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

export interface applicantResponseTypes {
    success: boolean;
    message: string;
    data: RegisterTypes
}

// JobModel / Data Types
export interface serarchDataTypes {
    position?: string;
    companyName?: string;
    location?: string;
    isOpen?: string;
    timestamp?: string;
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
export interface JobIsOpenDataTypes {
    jobId: string;
    isOpen: boolean | undefined;
    userId: string; userEmail: string;
};

export interface QuestionDataTypes {
    jobId: string | undefined;
    userId: string | undefined;
    userEmail: string | undefined;
    question: string;
};
export interface AnsDataTypes {
    jobId: string | undefined;
    questionId: string | undefined;
    userEmail: string | undefined;
    riplay: string;
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
    ans?: AnsTypes[] | undefined;
};

export interface JobApplicantsTypes {
    userId?: string;
    userEmail?: string;
};

export interface JobDataTypes {
    email?: string | undefined;
    position?: string;
    companyName?: string | undefined;
    experience?: string;
    workLevel?: string;
    employmentType?: string;
    location?: string;
    noOpening?: string;
    isOpen?: boolean;
    overview?: string;
    requirements?: string[];
    responsibilities?: string[];
    salaryRange?: string;
    skills?: string[];
    _id?: string;
    __v?: string;
    applicants?: JobApplicantsTypes[];
    questionAns?: QuestionAnsTypes[];
};

// messageTypes
export interface MessageType {
    messageId: string;
    timestamp: Date; // Use Date type if you prefer
    senderId: string;
    senderEmail: string;
    content: string;
};

export interface Participant {
    userId: string;
    userName: string;
    userEmail: string;
    _id: string;
};

export interface MessageObjectType {
    _id: string;
    __v: string;
    chatId: string;
    participants: Participant[];
    messages: MessageType[];
};
export interface MessageObjectResponseType {
    status: boolean;
    message: string;
    data: MessageObjectType;
};
export interface AllMessageObjectResponseType {
    status: boolean;
    message: string;
    data: MessageObjectType[];
};
