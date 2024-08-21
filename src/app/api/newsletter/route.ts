import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/resend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    const data = await response.json();
    return NextResponse.json({ message: data.message }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}