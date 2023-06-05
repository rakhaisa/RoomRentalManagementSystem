// Import necessary libraries
import Tenant from "../models/tenant.js";
import Message from "../models/message.js";
import nodemailer from 'nodemailer';

export const sendMail = async (req, res) => {
    const { to, subject, category, text } = req.body;

  // Create a transporter using your Gmail account credentials
  const transporter = nodemailer.createTransport({
    /*service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,*/
        
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password

    },
  });

  // Configure the email options
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      // Save the email to the database
      await Email.create({ to, subject, text });
      res.send('Email sent');
    }
  });
};


// Retrieve email addresses of all tenants
export const getEmailAddresses = async () => {
  try {
    const tenants = await Tenant.find({}, 'email'); // Retrieve only the email field
    const emailAddresses = tenants.map((tenant) => tenant.email);
    return emailAddresses;
  } catch (error) {
    console.error('Error retrieving email addresses:', error);
    return [];
  }
};

export const saveMessage = async (req, res) => {
  const messages = new Message(req.body);
  try {
      const insertedMessage = await messages.save();
      res.status(201).json(insertedMessage);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

export const getMessage = async (req, res) => {
  try {
      const messages = await Message.find();
      res.json(messages);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}


