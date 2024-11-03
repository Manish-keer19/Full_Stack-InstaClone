import { Request, Response } from "express";
import { Message } from "../models/Messages.modal";

interface MessageRequest extends Request {
  body: {
    currentUserId: string;
    anotherUserId: string;
  };
}

export const getAllMessages = async (
  req: MessageRequest, // Use the custom request type
  res: Response
): Promise<any> => {
  try {
    const { currentUserId, anotherUserId } = req.body;

    if (!currentUserId || !anotherUserId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const messages = await Message.findOne({
      $or: [
        { currentUser: currentUserId, anotherUser: anotherUserId },
        { currentUser: anotherUserId, anotherUser: currentUserId },
      ],
    }).populate({
      path: "messages.sender",
      model: "User",
    });
    

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log("Could not get the messages", error);
    return res.status(500).json({
      success: false,
      message: "Could not get the messages",
    });
  }
};
