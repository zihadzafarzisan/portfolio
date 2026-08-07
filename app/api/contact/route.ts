import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    
    // TODO: Integrate with Resend or EmailJS for actual email sending
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@zisan.dev',
    //   to: 'hello@zisan.dev',
    //   subject: `New message from ${validatedData.name}`,
    //   text: validatedData.message,
    // });
    
    console.log('Contact form submission:', validatedData);
    
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
