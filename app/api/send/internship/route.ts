import { runCors } from '@/lib/middleware/cors';
import transporter from '@/lib/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await runCors(request);
    const formData = await request.formData();

    const cv = formData.get('cv') as File;
    const fileBuffer = await cv.arrayBuffer();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const desirablePosition = formData.get('desirablePosition') as string;
    const collegePlace = formData.get('collegePlace') as string;
    const currentCollege = formData.get('currentCollege') as string;
    const gpa = formData.get('gpa') as string;

    await transporter.sendMail({
      from: email,
      to: process.env.COMPANY_EMAIL,
      subject: `Internship Request from ${name}`,
      html: `
        <h2>New Internship Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Desirable Position:</strong> ${desirablePosition}</p>
        <p><strong>College Place:</strong> ${collegePlace}</p>
        <p><strong>Current College:</strong> ${currentCollege}</p>
        <p><strong>GPA:</strong> ${gpa}</p>
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
      subject: 'Internship Request Received',
      html: `
        <h2>Internship Request Received</h2>
        <p>Thank you for your internship request. We will contact you soon.</p>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Internship request sent successfully!',
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
