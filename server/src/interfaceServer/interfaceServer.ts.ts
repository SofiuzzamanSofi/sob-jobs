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
    timestamp: Date;
};

// messageTypes 
export interface MessageType {
    messageId: string;
    timestamp: Date; // Use Date type if you prefer
    senderId: string;
    senderEmail: string;
    content: string;
};

interface Participant {
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

// const message: MessageObjectType = {
//     "chatId": "abc123",
//     "participants": [
//         {
//             "userId": "user1",
//             "username": "Alice"
//         },
//         {
//             "userId": "user2",
//             "username": "Bob"
//         }
//     ],
//     "messages": [
//         {
//             "messageId": "msg1",
//             "senderId": "user1",
//             "timestamp": new Date(),
//             "content": "Hey Bob, how are you?"
//         },
//         {
//             "messageId": "msg2",
//             "senderId": "user2",
//             "timestamp": new Date(),
//             "content": "I'm good, thanks! How about you?"
//         },
//         {
//             "messageId": "msg3",
//             "senderId": "user1",
//             "timestamp": new Date(),
//             "content": "I'm doing well too. Did you finish the project?"
//         },
//         {
//             "messageId": "msg4",
//             "senderId": "user2",
//             "timestamp": new Date(),
//             "content": "Yes, I completed it yesterday. How about you?"
//         },
//         {
//             "messageId": "msg5",
//             "senderId": "user1",
//             "timestamp": new Date(),
//             "content": "I'm almost done. Just need to review a few things."
//         }
//         // {
//         //   "messageId": "msg5",
//         //   "senderId": "user1",
//         //   "timestamp": "2023-08-17T12:34:00Z",
//         //   "content": "I'm almost done. Just need to review a few things."
//         // }
//     ]
// }
