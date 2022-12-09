const nodemailer = require('nodemailer');
const ejs = require('ejs')




exports.sendEmail = async(req,res, receiver) =>{

try {
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });

  
         /*ejs.renderFile('./templates/mailTemplate.ejs',{receiver : req.body.email, content : req.body.content},(err, data) => {
      if (err) {
        res.send(err.message);
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Hello ✔",
          html: data
        }

        let info =  transporter.sendMail(mailOptions)
        res.send({message:(('Message sent to ') + info.envelope.to)})
        }})*/

        let template;
        ejs.renderFile('./templates/mailTemplate.ejs',{receiver : req.body.email, content : req.body.content},(err, data)=>{
        if (err) {
          console.log(err.messsage)
        } else {
          template = data;
        }
       })

       //send mail with defined transport object
      let info = await transporter.sendMail({
        from:process.env.EMAIL, // sender address
        to: req.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        //text: req.body.text, // plain text body
        html: template, // html body
        attachments :[ /*attach file to email*/
          {
            filename:'avatar1.png',
            path:'./templates/avatar1.png',
            cid:'avatar1.png'
          }
        ]
      });
      res.send({message:(('Message sent to ') + info.envelope.to)})

} catch (error) {
    res.status(500).json({message:error.message || 'error server'})
}

}