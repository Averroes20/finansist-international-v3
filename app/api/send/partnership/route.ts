import transporter from '@/lib/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const coverLetter = formData.get('coverLetter') as File;
    const fileBuffer = await coverLetter.arrayBuffer();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const companyName = formData.get('companyName') as string;
    const message = formData.get('message') as string;

    // Email ke perusahaan Anda
    await transporter.sendMail({
      from: email,
      to: process.env.COMPANY_EMAIL,
      subject: `Partnership Request from ${companyName}`,
      html: `
        <h2>New Partnership Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      attachments: [
        {
          filename: coverLetter.name,
          content: Buffer.from(fileBuffer),
        },
      ],
    });

    // Email konfirmasi ke partner
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Partnership Request Received',
      html: `
        <h2>Thank you for your partnership request</h2>
        <p>Dear ${name},</p>
        <p>We have received your partnership request and will review it shortly.</p>
        <p>We will contact you soon.</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Partnership request sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send partnership request',
      },
      { status: 500 }
    );
  }
}
