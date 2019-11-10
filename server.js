const express = require('express');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


app.post("/email",(req,res)=>{


    console.log(req.body.userEmail);
    console.log(req.body.userPassword);
    console.log(req.body.friendEmail);
    console.log(req.body.subject);
    console.log(req.body.body);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:  req.body.userEmail,
          pass:  req.body.userPassword
        }
      });
      
      var mailOptions = {
        from: req.body.userEmail,
        to: req.body.friendEmail,
        subject: req.body.subject,
        text: req.body.body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
             res.status(404).json({


                message:"Error To Send Mail",
                error:error

             })
        } else {
            res.status(200).json({


                message:"Successflly send the email",

             })
        }

})  });
   

app.listen(  process.env.PORT || '3000', () => {
  console.log('Server started on port 3000');
});
