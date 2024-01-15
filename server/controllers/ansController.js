import { guestChain } from "../models/guest.model.js";
import { studentChain } from "../models/student.model.js";

// guest reply
export const guest = async (req, res) => {
    const question = req.body.question;
    console.log(question);
    if (question) {
      const ans = await guestChain.call({
        query: question,
      });
      console.log(ans.text);
      return res.status(200).json({
        success: true,
        message: "Answer is given",
        ans,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
  
  // student reply
  export const student = async (req, res) => {
    const question = req.body.question;
    console.log(question);
    if (question) {
      const ans = await studentChain.call({
        query: question,
      });
      console.log(ans.text);
      return res.status(200).json({
        success: true,
        message: "Answer is given",
        ans,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
  