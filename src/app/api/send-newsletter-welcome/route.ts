import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_123456789'); // Updated to use a direct string for the API key

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'KSY Group <newsletter@ksygroup.us>',
      to: [email],
      subject: 'Welcome to KSY Group Newsletter',
      html: `
        <h1>Welcome to KSY Group Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. We're excited to keep you updated on the latest chemical industry news and insights.</p>
        <p>Check out our latest article: <a href="https://ksygroup.us/newsletter">Latest Chemical Industry Trends</a></p>
        <p>If you have any questions, feel free to reach out to us.</p>
        <p>Best regards,<br>KSY Group Team</p>
      `,
    });

    // Create an API key
    const apiKeyResponse = await resend.apiKeys.create({ name: 'Production' });
    console.log('API Key Created:', apiKeyResponse); // Log the response for debugging

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
