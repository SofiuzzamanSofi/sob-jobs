"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessageByIdController = exports.getMessageByIdController = exports.getAllMessageByIdController = void 0;
const randomId_1 = require("../utils/randomId/randomId");
const userService_1 = require("../service/userService");
const messageService_1 = require("../service/messageService");
// get all message by messageId 
const getAllMessageByIdController = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                status: false,
                message: "Couldn't found id",
            });
        }
        ;
        const userFromDatabaseById = await (0, userService_1.getUserByIdService)(next, id);
        if (userFromDatabaseById._id) {
            const getMessagesFromDatabase = await (0, messageService_1.getAllMessageByIdService)(next, userFromDatabaseById._id.toString());
            // const getMessagesFromDatabase = await MessageModel.find({
            //     participants: {
            //         $elemMatch: { userId: userFromDatabaseById._id },
            //     }
            // });
            // console.log('getMessagesFromDatabase:', getMessagesFromDatabase);
            if (getMessagesFromDatabase) {
                return res.status(200).json({
                    success: true,
                    message: "Messages from database get Successfully",
                    data: getMessagesFromDatabase,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch MESSAGE job data",
        // });
    }
    ;
};
exports.getAllMessageByIdController = getAllMessageByIdController;
// get 1 message Details by message id
const getMessageByIdController = async (req, res, next) => {
    try {
        const id = req.params?.id;
        const [id1, id2] = id.split("-");
        // console.log('id1, id2, id:', id1, id2, id);
        //get message by id1 and id2 Sender: Employee
        const messageResponse1Employee = await (0, messageService_1.getMessageByIdService)(next, id);
        // const messageResponse1Employee = await MessageModel.findOne({
        //     chatId: id
        // }); 
        if (messageResponse1Employee) {
            return res.status(200).json({
                success: true,
                message: `Message Data is found for Employee: ${id}`,
                data: messageResponse1Employee,
            });
        }
        ;
        //get message by id1 and id2 Sender: Candidate
        const messageResponse2Candidate = await (0, messageService_1.getMessageByIdService)(next, `${id2}-${id1}`);
        // const messageResponse2Candidate = await MessageModel.findOne({
        //     chatId: `${id2}-${id1}`,
        // })
        if (messageResponse2Candidate) {
            return res.status(200).json({
                success: true,
                message: `Message Data is found for Candidate: ${id}`,
                data: messageResponse2Candidate,
            });
        }
        ;
        // if no message is found || FirstTime message
        // get user by id 650f62765b9bfda2808a667c 64e0c8fabf719a5e82303845 64e0c8fabf719a5e82303845 user@gmail
        console.log('id1, id2, id:', id1, id2, id);
        const user1 = await (0, userService_1.getUserByIdService)(next, id1);
        const user2 = await (0, userService_1.getUserByIdService)(next, id2);
        // console.log('user1, user2:', user1, user2);
        if (user1 && user2) {
            return res.status(200).json({
                success: true,
                message: `Job data not found But User Found for Starting the chat By Id: ${id}`,
                data: {
                    chatId: id,
                    participants: [
                        {
                            userId: user1._id,
                            userName: user1.firstName + ' ' + user1.lastName,
                            userEmail: user1.email,
                        },
                        {
                            userId: user2._id,
                            userName: user2.firstName + '' + user2.lastName,
                            userEmail: user2.email,
                        },
                    ],
                    // messages: [
                    // ],
                },
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: `No message Found And No User Found for this Id: ${id}`,
                // data: data,
            });
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch job data || Server error from Catch-Error",
        // });
    }
    ;
};
exports.getMessageByIdController = getMessageByIdController;
// post 1 message by message id
const postMessageByIdController = async (req, res, next) => {
    try {
        const { chatId, message, participants } = req.body;
        if (!chatId || !message || !participants) {
            return res.status(400).json({
                success: false,
                message: "NotFound: chatId, message, or participants not provided",
            });
        }
        ;
        // message.timestamp = new Date();
        message.messageId = (0, randomId_1.generateRandomStringId)(24);
        const [id1, id2] = chatId.split("-");
        // return console.log('messageData:', chatId, message, participants);
        //    const message ID=Eployeee-Candidate
        const messagePostId1Id2 = await (0, messageService_1.postMessageByIdService)(next, chatId, message);
        // const messagePostId1Id2 = await MessageModel.findOneAndUpdate(
        //     {
        //         chatId: chatId,
        //     },
        //     {
        //         $push: {  // add data on db push
        //             messages: message,
        //         }
        //     },
        //     {
        //         new: true, //save new message
        //     }
        // );
        // console.log('messagePostId1Id2:', messagePostId1Id2);
        if (messagePostId1Id2) {
            return res.status(200).json({
                success: true,
                message: `Message POST Success By-Id: ${chatId}`,
                data: messagePostId1Id2,
            });
        }
        ;
        //    const message ID=Candidate-Eployeee
        const messagePostId2Id1 = await (0, messageService_1.postMessageByIdService)(next, `${id2}-${id1}`, message);
        // const messagePostId2Id1 = await MessageModel.findOneAndUpdate(
        //     {
        //         chatId: `${id2}-${id1}`,
        //     },
        //     {
        //         $push: {  // add data on db push
        //             messages: message,
        //         }
        //     },
        //     {
        //         new: true, //save new message
        //     }
        // );
        // console.log('messagePostId2Id1:', messagePostId2Id1);
        if (messagePostId2Id1) {
            return res.status(200).json({
                success: true,
                message: `Message POST Success By-Id: ${chatId}`,
                data: messagePostId2Id1,
            });
        }
        ;
        // First Time Send Message
        const messagePostFirstTime = await (0, messageService_1.postMessageByIdFirstTimeService)(next, chatId, participants, message);
        // const messagePostFirstTime = await new MessageModel({
        //     chatId,
        //     participants,
        //     messages: [
        //         {
        //             messageId: message.messageId,
        //             senderId: message.senderId,
        //             senderEmail: message.senderEmail,
        //             content: message.content,
        //         }
        //     ],
        // }).save();
        // console.log('messagePostFirstTime:', messagePostFirstTime);
        if (messagePostFirstTime) {
            return res.status(200).json({
                success: true,
                message: `Message POST Success By-Id: ${chatId}`,
                data: messagePostFirstTime,
            });
        }
        ;
        return res.status(200).json({
            success: false,
            message: `Message POST Fails Dont match anythig:  ${chatId}, ${message}, ${participants}`,
        });
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch job data",
        // });
    }
    ;
};
exports.postMessageByIdController = postMessageByIdController;
// if DOUBLE OR THRIPPLE then apply
// const messageGotById1AndId2 = async (id: string) => {
//     const [id1, id2] = id.split("-");
//     //get message by id1 and id2 Sender: Employee
//     const messageResponse1Employee = await MessageModel.findOne({
//         chatId: id
//     });
//     if (messageResponse1Employee) {
//         return messageResponse1Employee;
//     };
//     //get message by id1 and id2 Sender: Candidate
//     const messageResponse2Candidate = await MessageModel.findOne({
//         chatId: `${id2}-${id1}`,
//     })
//     if (messageResponse2Candidate) {
//         return messageResponse2Candidate;
//     };
//     return null;
// }
// const extraObject = {
//     const messagePost = await MessageModel.findOneAndUpdate(
//         {
//             chatId: chatId || `${id2}-${id1}`,
//             // participants: [participants || participants.reverse()],
//         },
//         {
//             $addToSet: { //add participants without duplicates
//                 participants: {
//                     $each: participants,
//                 },
//             },
//             $push: {  // add data on db push
//                 messages: message,
//             }
//         },
//         {
//             new: true, //save new message
//             upsert: true, // Create a new document if it doesn't exist
//             setDefaultsOnInsert: true, // Set default values when upserting
//         }
//     );
// }
//# sourceMappingURL=messageController.js.map