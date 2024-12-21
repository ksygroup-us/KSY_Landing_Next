import { NextResponse } from 'next/server';
import { sendMail, adminEmail } from '@/lib/utils/nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    
    // Email content for admin
    const adminMailOptions = {
      from: adminEmail,
      to: adminEmail,
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Company:</strong> ${formData.company}</li>
          <li><strong>Services:</strong> ${formData.services}</li>
          <li><strong>Country:</strong> ${formData.country}</li>
          <li><strong>Product Category:</strong> ${formData.productCategory}</li>
        </ul>
        <h2>Additional Information:</h2>
        <p>${formData.additionalInfo}</p>
      `,
    };

    // Email content for customer
    const customerMailOptions = {
      from: adminEmail,
      to: formData.email,
      subject: 'Thank You for Contacting KSY Group',
      html: `
        <h1>Thank You for Contacting KSY Group</h1>
        <p>Dear ${formData.firstName},</p>
        <p>We have received your inquiry and will get back to you shortly. Here's a summary of your submission:</p>
        <ul>
          <li><strong>Services Requested:</strong> ${formData.services}</li>
          <li><strong>Product Category:</strong> ${formData.productCategory}</li>
        </ul>
        <p>Our team will review your request and contact you within 1-2 business days.</p>
        <p>Best regards,<br>KSY Group Team</p>
      `,
    };

    // Send emails
    await Promise.all([
      sendMail(adminMailOptions),
      sendMail(customerMailOptions),
    ]);

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
} 