export interface UserDataTypes {
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
    createdAt?: string,
    updatedAt?: string,
    _id?: string;
    __v?: number;
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
    timestamp: Date;
};

//
export interface postMessageByIdServiceType {
    messageId: string,
    senderId: string;
    senderEmail: string;
    content: string;
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
};

export interface MessageObjectType {
    _id: string;
    __v: string;
    chatId: string;
    participants: Participant[];
    messages: MessageType[];
};

// job query search types
export interface getAllJobBySearchTextTypes {
    position?: RegExp;
    companyName?: RegExp;
    isOpen?: boolean;
    location?: RegExp;
    // experience?: RegExp;
    // createdAt?: Date;
    timestamp?: Date;
    // Add other fields from your schema here...
}