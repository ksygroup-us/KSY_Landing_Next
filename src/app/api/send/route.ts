import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, company, services, country, productCategory } = await request.json();

    console.log('Received data:', { email, firstName, lastName, company, services, country, productCategory });

    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const { data, error } = await resend.emails.send({
      from: 'KSY Group <noreply@ksygroup.us>',
      to: [email],
      subject: 'Thank you for contacting KSY Group',
      html: `
        <h1>Thank you for contacting KSY Group</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>We have received your inquiry and will get back to you shortly. Here's a summary of your submission:</p>
        <ul>
          <li>Company: ${company}</li>
          <li>Services: ${services}</li>
          <li>Country: ${country}</li>
          <li>Product Category: ${productCategory}</li>
        </ul>
        <p>Best regards,<br>KSY Group Team</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return Response.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return Response.json({ error: 'An unexpected error occurred while sending the email' }, { status: 500 });
  }
}