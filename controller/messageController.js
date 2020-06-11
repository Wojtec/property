const UserModel = require('../model/userModel');
const MessageModel = require('../model/messageModel');


// Save message and update in userModel
module.exports ={
    saveMessage: async (req, res) =>{
        let message = new MessageModel();
        message.name  = req.body.name;
        message.email = req.body.email;
        message.text = req.body.text;
        MessageModel.create(message)
       .then(async (dbmessage)=>{
           console.log(req.params.user_id);
           console.log(message);
          await UserModel.findByIdAndUpdate(
               {_id: req.params.user_id},
               {$push: {messages: dbmessage._id}},
               {new: true}
           )
           res.status(200).header("Access-Control-Allow-Origin", "*").json({
            status: "Success",
            message: "Message saved",
            data: dbmessage
        });
       }).catch((err)=>{
        res.json(err);
    })
    }
    

}
