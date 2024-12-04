'use server';

import transporter from '@/lib/nodemailer';

export async function submitInternshipRequest(formData: FormData) {
  try {
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

    // Kirim email ke perusahaan
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

    // Kirim email ke pelamar
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Internship Request Received',
      html: `
        <h2>Internship Request Received</h2>
        <p>Thank you for your internship request. We will contact you soon.</p>
      `,
    });

    return { success: true, message: 'Internship request sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send internship request' };
  }
}

export async function submitJobRequest(formData: FormData) {
  try {
    const cv = formData.get('cv') as File;
    const fileBuffer = await cv.arrayBuffer();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const lastEducation = formData.get('lastEducation') as string;
    const desirablePosition = formData.get('desirablePosition') as string;
    const collegePlace = formData.get('collegePlace') as string;

    // Email ke perusahaan
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

    // Email konfirmasi ke pelamar
    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Job Request Received',
      html: `
        <h2>Job Request Received</h2>
        <p>Thank you for your job request. We will review your application and get back to you as soon as possible.</p>
      `,
    });

    return { success: true, message: 'Job request sent successfully!' };
  } catch (error) {
    console.error('Error sending job request:', error);
    return { success: false, error: 'Failed to send job request' };
  }
}

export async function submitPartnershipRequest(formData: FormData) {
  try {
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

    return { success: true, message: 'Partnership request sent successfully!' };
  } catch (error) {
    console.error('Error sending partnership request:', error);
    return { success: false, error: 'Failed to send partnership request' };
  }
}
