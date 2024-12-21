import { NextResponse } from 'next/server';
import { sendMail, adminEmail } from '@/lib/utils/nodemailer';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-subscription?token=${verificationToken}&email=${encodeURIComponent(email)}`;

    // Email content
    const mailOptions = {
      from: adminEmail,
      to: email,
      subject: 'Verify Your Newsletter Subscription',
      html: `
        <h1>Welcome to KSY Group Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. Please click the link below to verify your subscription:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 6px;">Verify Subscription</a>
        <p>If you didn't request this subscription, please ignore this email.</p>
      `,
    };

    // Send verification email
    await sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Verification email sent successfully' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 