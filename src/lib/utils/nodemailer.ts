import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

// Create reusable transporter
const createTransporter = async () => {
  try {
    // Generate access token
    const accessToken = await oauth2Client.getAccessToken();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken?.token || '',
      },
    });

    // Verify connection
    await transporter.verify();
    return transporter;
  } catch (error) {
    console.error('Error creating mail transporter:', error);
    throw error;
  }
};

// Export async function to send mail
export const sendMail = async (mailOptions: nodemailer.SendMailOptions) => {
  const transporter = await createTransporter();
  return await transporter.sendMail(mailOptions);
};

export const adminEmail = process.env.GMAIL_USER; // Using GMAIL_USER as admin email