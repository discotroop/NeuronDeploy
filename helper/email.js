const nodemailer = require('nodemailer');
//configure transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'connector@neuron.chat',
            pass: 'R=5mS7<a' //will need to imported variable from config file.
        }
    });  

const senderEmail = 'connector@neuron.chat' // should change

let reminderMail = {
    from: senderEmail, // sender address
    to: '', // list of receivers
    subject: 'Chat reminder ', // Subject line
    text:"Just a reminder: You've got a conversation through Neuron coming up! If you haven't confirmed or rescheduled, please do so. Have fun!",
    html: "<h1>Heads up</h1><p> Your conversation through Neuron is coming up today! If you haven't confirmed or rescheduled, please do so. <br> Check out the <a href=#>FAQs</a> or email us at <a href='mailto:brendan@neuron.chat'>brendan@neuron.chat</a> if you have any questions! </p>"// plain text body
    };

let matchMail = {
    from: senderEmail, // sender address
    to: '', // list of receivers
    subject: "You've matched!", // Subject line
    text:"Congrats! You've got a cool conversation coming up! Check your email for a calendar invitation",
    html: "<h1>You matched!</h1><p> You've got a cool conversation coming up! Check your email to confirm the calendar invitation.  If you have to reschedule, please Reply All to this email to set it up. Check out the <a href=#>FAQ</a> or email us at <a href='mailto:brendan@neuron.chat'>brendan@neuron.chat</a> if you have any questions! </p>"// plain text body
    };
    


export function sendReminder(email1,email2){    
    reminderMail.to = `${matchObj.email}, ${matchObj.matchedEmail}`

    transporter.sendMail(reminderMail, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent:', info.messageId);
    })
}

export function sendMatchMail(email1,email2){    
    matchMail.to = `${matchObj.email}, ${matchObj.matchedEmail}`

    transporter.sendMail(matchMail, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent:', info.messageId);
    })
}

