import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const msg = {
    to: email, // Your company email
    from: 'info@ksygroup.us', // Use your verified sender
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  const userMsg = {
    to: email,
    from: 'info@ksygroup.us', // Use your verified sender
    subject: 'Thank you for contacting ChemImport',
    text: `Dear ${name},

Thank you for reaching out to ChemImport. We have received your message and appreciate you taking the time to contact us.

Our team is reviewing your inquiry and we will get back to you as soon as possible, usually within 1-2 business days.

If your matter is urgent, please call us at (123) 456-7890.

Best regards,
The ChemImport Team`,
    html: `<h2>Dear ${name},</h2>
<p>Thank you for reaching out to ChemImport. We have received your message and appreciate you taking the time to contact us.</p>
<p>Our team is reviewing your inquiry and we will get back to you as soon as possible, usually within 1-2 business days.</p>
<p>If your matter is urgent, please call us at (123) 456-7890.</p>
<p>Best regards,<br>The ChemImport Team</p>`,
  };

  try {
    await sgMail.send(msg);
    await sgMail.send(userMsg);
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Message sending failed' }, { status: 500 });
  }
}