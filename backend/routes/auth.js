const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Operator = require('../models/Operator');
const { registerValidation, loginValidation } = require('../validation/user_val');
const { generateOTP, transporter, mailOptions, generateUHID } = require('../utility/utility');

const usersOtp = [];

router.post('/verification', async (req, res) => {

    // Validate request, if invalid return 400 Bad Request
    // var result = registerValidation(req.body);
    // if (result.error)
    // {
    //     res.status(400).json({ error: result.error.details[0].message });
    //     return;
    // }

    // Check if the user is already in the database
    if (req.body.usertype == 'patient')
    {
        result = await Patient.findOne({ email: req.body.email });
        if (result)
            return res.status(400).json({ error: 'Email already exists' });
    }
    else if (req.body.usertype == 'doctor')
    {
        result = await Doctor.findOne({ email: req.body.email });
        if (result)
            return res.status(400).json({ error: 'Email already exists' });
    }
    else if (req.body.usertype == 'operator')
    {
        result = await Operator.findOne({ email: req.body.email });
        if (result)
            return res.status(400).json({ error: 'Email already exists' });
    }

    // generate otp
    const otp = generateOTP();

    // set mail options
    mailOptions.to = req.body.email;
    mailOptions.subject = 'One Time Password';
    mailOptions.text = `Your OTP for registration is: ${otp}`;

    // send mail
    transporter.sendMail(mailOptions);

    res.status(200).json({ success: 'OTP sent successfully' });

    // check if { email: otp } already exists
    usersOtp.forEach((element, index) => {
        if (element.email == req.body.email) {
            usersOtp.splice(index, 1);
        }
    });

    // add { email: otp } to array
    const userOtp = {
        email: req.body.email,
        otp: otp
    };

    usersOtp.push(userOtp);
    console.log(usersOtp);

    // remove email: otp from array after timeout
    setTimeout(() => {
        usersOtp.forEach((element, index) => {
            if (element.email == req.body.email) {
                usersOtp.splice(index, 1);
            }
        });
        console.log('After timeout:');
        console.log(usersOtp);
    }, 180 * 1000);
});

router.post('/register', (req, res) => {
    flag = 0

    // validate OTP
    usersOtp.forEach(async (element) => {
        if (element.email == req.body.email) {
            flag = 1;
            if (element.otp == req.body.otp) {
                // hash the password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                // save the user
                if (req.body.usertype == 'patient')
                {
                    try {
                        var uhid;
                        var uhidResult;
                        do {
                            // generate a UHID
                            uhid = generateUHID();
                            // check if UHID is unique or not
                            uhidResult = await Patient.findOne({ uhid: uhid });
                        } while (uhidResult);
                        const patient = new Patient({
                            username: req.body.username,
                            gender: req.body.gender,
                            dob: req.body.dob,
                            bloodgroup: req.body.bloodgroup,
                            mobile: req.body.mobile,
                            email: req.body.email,
                            password: hashedPassword,
                            uhid: uhid
                        });
                        const result = await patient.save();
                        console.log(result);
                        mailOptions.to = req.body.email;
                        mailOptions.subject = 'Registration successful';
                        mailOptions.text = `You have successfully registered to MedAssist.
                        \nYour Unique Health ID (UHID) is: ${uhid}`;

                        // send mail
                        transporter.sendMail(mailOptions);
                        // res.status(201).json(result);
                        res.status(201).json({ success: 'Registered' });
                    } catch (err) {
                        console.log(err);
                    }
                }
                else if (req.body.usertype == 'doctor')
                {
                    try {
                        const doctor = new Doctor({
                            username: req.body.username,
                            degree: req.body.degree,
                            specialisation: req.body.specialisation,
                            email: req.body.email,
                            password: hashedPassword
                        });
                        const result = await doctor.save();
                        console.log(result);
                        // res.status(201).json(result);
                        res.status(201).json({ success: 'Registered' });
                    } catch (err) {
                        console.log(err);
                    }
                }
                else if (req.body.usertype == 'operator')
                {
                    try {
                        const operator = new Operator({
                            username: req.body.username,
                            email: req.body.email,
                            password: hashedPassword
                        });
                        const result = await operator.save();
                        console.log(result);
                        // res.status(201).json(result);
                        res.status(201).json({ success: 'Registered' });
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
            else {
                res.status(400).json({ error: 'Incorrect OTP' });
            }
        }
    });

    if (flag == 0) {
        res.status(400).json({ error: 'Timeout' });
    }
});

router.post('/login', async (req, res) => {
    // Validate request, if invalid return 400 Bad Request
    // const result = loginValidation(req.body);
    // if (result.error)
    //     return res.status(400).send(result.error.details[0].message);

    // Check if the user exists in the database
    let patient;
    let doctor;
    let operator;
    if (req.body.usertype == 'patient')
    {
        console.log(req.body);
        patient = await Patient.findOne({ email: req.body.email });
        if (!patient)
            return res.status(400).json({ error: 'Email does not exist' });
    }
    else if (req.body.usertype == 'doctor')
    {
        doctor = await Doctor.findOne({ email: req.body.email });
        if (!doctor)
            return res.status(400).json({ error: 'Email does not exist' });
    }
    else if (req.body.usertype == 'operator')
    {
        operator = await Operator.findOne({ email: req.body.email });
        if (!operator)
            return res.status(400).json({ error: 'Email does not exist' });
    }

    // Check if password is correct
    if (req.body.usertype == 'patient')
    {
        const pass = await bcrypt.compare(req.body.password, patient.password);
        if (!pass)
            return res.status(400).json({ error: 'Invalid password' });
    }
    else if (req.body.usertype == 'doctor')
    {
        const pass = await bcrypt.compare(req.body.password, doctor.password);
        if (!pass)
            return res.status(400).json({ error: 'Invalid password' });
    }
    else if (req.body.usertype == 'operator')
    {
        const pass = await bcrypt.compare(req.body.password, operator.password);
        if (!pass)
            return res.status(400).json({ error: 'Invalid password' });
    }

    // If user details are correct
    if (req.body.usertype == 'patient')
    {
        req.session.user = patient;
        req.session.usertype = 'patient';
    }
    else if (req.body.usertype == 'doctor')
    {
        req.session.user = doctor;
        req.session.usertype = 'doctor';
    }
    else if (req.body.usertype == 'operator')
    {
        req.session.user = operator;
        req.session.usertype = 'operator';
    }
    req.session.isAuth = true;
    // console.log(req.session.id);
    // console.log(req.session);
    // console.log(req.session.cookie);
    res.status(200).json({ success: 'Logged In' });
});

router.get('/isauthenticated/patient', (req, res) => {
    if (req.session.isAuth && req.session.usertype == 'patient')
        res.status(200).json({ auth: true });
    else
        res.status(403).json({ auth: false });
    });

router.get('/isauthenticated/doctor', (req, res) => {
    if (req.session.isAuth && req.session.usertype == 'doctor')
    {
        res.status(200).json({ auth: true });
        console.log('true');
    }
    else
    {
        res.status(403).json({ auth: false });
        console.log('false');
    }
});

router.get('/isauthenticated/operator', (req, res) => {
    if (req.session.isAuth && req.session.usertype == 'operator')
        res.status(200).json({ auth: true });
    else
        res.status(403).json({ auth: false });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            res.status(500).json({ err: 'Could not log out' });
        else
            res.status(200).json({ success: 'Logged out successfully' });
    });
});

module.exports = router;
