import { Router } from "express";
import nodemailer from 'nodemailer';

const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post('/send-credentials', async (req, res) => {
  console.log('Received email request:', req.body);
  
  const { to, agentCode, temporaryPassword, name } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your SHC Data Collection Credentials',
    html: `
      <h2>Welcome ${name}!</h2>
      <p>Your account has been created successfully. Here are your login credentials:</p>
      <p><strong>Agent Code:</strong> ${agentCode}</p>
      <p><strong>Password:</strong> ${temporaryPassword}</p>
      <p>Please change your password after your first login.</p>
      <p>Best regards,<br>SHC Data Collection Team</p>
    `
  };

  try {
    console.log('Attempting to send email with options:', mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: (error as Error).message 
    });
  }
});

export default router;