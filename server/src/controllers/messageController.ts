import express from 'express';
import { RegSchema } from '../models/regSchema';
import { MessageSchema } from '../models/messageSchema';
import { generateRandomStringId } from '../randomId/randomId';

// get all message by messageId 
export const getAllMessageById = async (req: express.Request, res: express.Response) => {
    try {

    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    };
};

// get 1 message by message id
export const getMessageById = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params?.id as string;
        const [id1, id2] = id.split("-");
        console.log('id1, id2, id:', id1, id2, id);
        // console.log('id1, id2, id:');

        //get message by id1 and id2 Sender: Employee
        const messageResponse1Employee = await MessageSchema.findOne({
            chatId: id
        });
        if (messageResponse1Employee) {
            return res.status(200).json({
                success: true,
                message: `Message Data is found for Employee: ${id}`,
                data: messageResponse1Employee,
            });
        };

        //get message by id1 and id2 Sender: Candidate
        const messageResponse2Candidate = await MessageSchema.findOne({
            chatId: `${id2}-${id1}`,
        })
        if (messageResponse2Candidate) {
            return res.status(200).json({
                success: true,
                message: `Message Data is found for Candidate: ${id}`,
                data: messageResponse2Candidate,
            });
        };

        // if no message is found || FirstTime message
        // get user by id
        const user1 = await RegSchema.findById(id1);
        const user2 = await RegSchema.findById(id2);
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
                    messages: [

                    ],
                },
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: `No message Found And No User Found for this Id: ${id}`,
                // data: data,
            });
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data || Server error from Catch-Error",
        });
    };
};

// post 1 message by message id
export const postMessageById = async (req: express.Request, res: express.Response) => {
    try {
        const { chatId, message, participants } = req.body;
        if (!chatId || !message || !participants) {
            return res.status(400).json({
                success: false,
                message: "NotFound: chatId, message, or participants not provided",
            });
        };

        message.timestamp = new Date();
        message.messageId = generateRandomStringId(24);
        const [id1, id2] = chatId.split("-");
        // return console.log('messageData:', chatId, message, participants);

        //    const message ID=Eployeee-Candidate
        const messagePostId1Id2 = await MessageSchema.findOneAndUpdate(
            {
                chatId: chatId,
            },
            {
                $push: {  // add data on db push
                    messages: message,
                }
            },
            {
                new: true, //save new message
            }
        );
        console.log('messagePostId1Id2:', messagePostId1Id2);
        if (messagePostId1Id2) {
            return res.status(200).json({
                success: true,
                message: `Message POST Success By-Id: ${chatId}`,
                data: messagePostId1Id2,
            });
        };

        //    const message ID=Candidate-Eployeee
        const messagePostId2Id1 = await MessageSchema.findOneAndUpdate(
            {
                chatId: `${id2}-${id1}`,
            },
            {
                $push: {  // add data on db push
                    messages: message,
                }
            },
            {
                new: true, //save new message
            }
        );
        console.log('messagePostId2Id1:', messagePostId2Id1);
        if (messagePostId2Id1) {
            return res.status(200).json({
                success: true,
                message: `Message POST Success By-Id: ${chatId}`,
                data: messagePostId2Id1,
            });
        };

        // First Time Send Message 
        const messagePostFirstTime = await new MessageSchema({ chatId, participants, message }).save();
        console.log('messagePostFirstTime:', messagePostFirstTime);
        if (messagePostFirstTime) {
            return res.status(200).json({
                success: true,
                message: `Message POST Success By-Id: ${chatId}`,
                data: messagePostFirstTime,
            });
        };
        return res.status(200).json({
            success: false,
            message: `Message POST Fails Dont match anythig:  ${chatId}, ${message}, ${participants}`,
        });
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    };
};



const messageGotById1AndId2 = async (id: string) => {
    const [id1, id2] = id.split("-");
    //get message by id1 and id2 Sender: Employee
    const messageResponse1Employee = await MessageSchema.findOne({
        chatId: id
    });
    if (messageResponse1Employee) {
        return messageResponse1Employee;
    };
    //get message by id1 and id2 Sender: Candidate
    const messageResponse2Candidate = await MessageSchema.findOne({
        chatId: `${id2}-${id1}`,
    })
    if (messageResponse2Candidate) {
        return messageResponse2Candidate;
    };
    return null;
}
// const extraObject = {
//     const messagePost = await MessageSchema.findOneAndUpdate(
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