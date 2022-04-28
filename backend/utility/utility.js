const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');

module.exports.generateOTP = () => {
    return otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
}

module.exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'teammedassistant@gmail.com',
        pass: 'Medassist161024'
    }
});

module.exports.mailOptions = {
    from: 'teammedassistant@gmail.com',
    to: '',
    subject: '',
    text: ''
};

module.exports.mailOptionsPdf = {
    from: 'teammedassistant@gmail.com',
    to: '',
    subject: '',
    text: '',
    attachments:[
      {
        filename: '',
        content: ''
      }
    ]
};

module.exports.generateUHID = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    UHID = [];
    UHID[0] = alphabets.charAt(Math.floor(Math.random() * 26));
    UHID[1] = alphabets.charAt(Math.floor(Math.random() * 26));
    UHID[2] = digits.charAt(Math.floor(Math.random() * 10));
    UHID[3] = digits.charAt(Math.floor(Math.random() * 10));
    uhid = UHID.join('');
    return uhid;
}
