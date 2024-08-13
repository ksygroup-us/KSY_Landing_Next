import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  const msg = {
    to: email,
    from: 'info@ksygroup.us', // Use your verified sender
    subject: 'Welcome to ChemImport Newsletter',
    text: `Thank you for subscribing to the ChemImport newsletter!

We're excited to have you join our community of chemical industry professionals. You'll now receive regular updates on:

- Latest industry trends and insights
- New product announcements
- Exclusive offers and promotions
- Upcoming events and webinars

If you have any questions or need assistance, please don't hesitate to contact us.

Best regards,
The ChemImport Team`,
    html: `<h2>Thank you for subscribing to the ChemImport newsletter!</h2>
<p>We're excited to have you join our community of chemical industry professionals. You'll now receive regular updates on:</p>
<ul>
  <li>Latest industry trends and insights</li>
  <li>New product announcements</li>
  <li>Exclusive offers and promotions</li>
  <li>Upcoming events and webinars</li>
</ul>
<p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
<p>Best regards,<br>The ChemImport Team</p>`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}