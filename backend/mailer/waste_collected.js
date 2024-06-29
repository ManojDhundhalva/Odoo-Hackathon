import * as nodemailer from '../config/nodemailer.js';

export const waste_collected = (email, disposer) => {
    let htmlString = nodemailer.renderTemplate({disposer: disposer}, '/waste_collected.ejs');
    nodemailer.transporter.sendMail({
        from: 'dharmeshkota123@gmail.com',
        to: email,
        subject: 'Waste collected by Disposers!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }
        console.log('Link Sent!');
    });
}