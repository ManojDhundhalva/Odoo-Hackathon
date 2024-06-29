import * as nodemailer from '../config/nodemailer.js';

export const book_appointment_disposer = (user, email, name, date) => {
    let htmlString = nodemailer.renderTemplate({user: user, name: name, date: date}, '/book_appointment_disposer.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: email,
        subject: 'Appointment Booked!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}

export const book_appointment_user = (disposer, email, name, date) => {
    let htmlString = nodemailer.renderTemplate({disposer: disposer, name: name, date: date}, '/book_appointment_user.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: email,
        subject: 'Appointment Booked!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}