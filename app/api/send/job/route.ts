import transporter from '@/lib/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const cv = formData.get('cv') as File;
    const fileBuffer = await cv.arrayBuffer();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const lastEducation = formData.get('lastEducation') as string;
    const desirablePosition = formData.get('desirablePosition') as string;
    const collegePlace = formData.get('collegePlace') as string;

    await transporter.sendMail({
      from: email,
      to: process.env.COMPANY_EMAIL,
      subject: `Job Request from ${name}`,
      html: `
        <h2>New Job Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Desirable Position:</strong> ${desirablePosition}</p>
        <p><strong>College Place:</strong> ${collegePlace}</p>
        <p><strong>Last Education:</strong> ${lastEducation}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter}</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: Buffer.from(fileBuffer),
        },
      ],
    });

    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Job Request Received',
      html: `
        <h2>Job Request Received</h2>
        <p>Thank you for your job request. We will review your application and get back to you as soon as possible.</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Partnership request sent successfully!',
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
