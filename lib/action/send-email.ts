'use server';

import transporter from '@/lib/nodemailer';

export async function submitInternshipRequest(formData: FormData) {
  try {
    const cv = formData.get('cv') as File;
    const fileBuffer = await cv.arrayBuffer();

    const applyLatter = formData.get('applyLatter') as File;
    const fileBuffer2 = await applyLatter.arrayBuffer();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const coverLetter = formData.get('currentUniversity') as string;
    const desirablePosition = formData.get('desirablePosition') as string;
    const campusAddress = formData.get('campusAddress') as string;
    const currentUniversity = formData.get('currentUniversity') as string;
    const gpa = formData.get('gpa') as string;

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: `Internship Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">New Internship Request</h2>
          <p style="margin: 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;"><strong>Desirable Position:</strong> ${desirablePosition}</p>
          <p style="margin: 0;"><strong>Current University:</strong> ${currentUniversity}</p>
          <p style="margin: 0;"><strong>Address University:</strong> ${campusAddress}</p>
          <p style="margin: 0;"><strong>Latest GPA:</strong> ${gpa}</p>
          <p><strong>Cover Letter:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
            ${coverLetter}
          </div>
        </div>
      `,
      attachments: [
        {
          filename: cv.name,
          content: Buffer.from(fileBuffer),
        },
        {
          filename: applyLatter.name,
          content: Buffer.from(fileBuffer2),
        },
      ],
    });

    // Kirim email ke pelamar
    await transporter.sendMail({
      from: `Finansis Intenational <${process.env.COMPANY_EMAIL}>`,
      to: `${name} <${email}>`,
      subject: 'Internship Request Received',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; text-align: center;">
          <h2 style="color: #0056b3;">Internship Request Received</h2>
          <p>Thank you for your internship request. We will review your application and contact you soon.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>HR Team</strong></p>
        </div>
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
    const degree = formData.get('degree') as string;
    const university = formData.get('university') as string;
    const major = formData.get('major') as string;
    const graduationYear = formData.get('graduationYear') as string;
    const desirablePosition = formData.get('desirablePosition') as string;
    const languages = JSON.parse(formData.get('language') as string) as { language: string; level: string }[];

    // Email ke perusahaan
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: `Job Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 20px;">

          <div>
            <h2 style="color: #0056b3; margin-bottom: 20px;">New Job Request</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Desirable Position:</strong> ${desirablePosition}</p>
            <p style="margin: 5px 0;"><strong>University:</strong> ${university}</p>
            <p style="margin: 5px 0;"><strong>Degree:</strong> ${degree}</p>
            <p style="margin: 5px 0;"><strong>Major:</strong> ${major}</p>
            <p style="margin: 5px 0;"><strong>Graduation Year:</strong> ${graduationYear}</p>

            <div style="margin-top: 20px;">
              <p style="margin-bottom: 10px;"><strong>Languages:</strong></p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background-color: #f1f1f1; text-align: left;">
                    <th style="padding: 8px; border: 1px solid #ddd;">Language</th>
                    <th style="padding: 8px; border: 1px solid #ddd;">Proficiency Level</th>
                  </tr>
                </thead>
                <tbody>
                  ${languages
                    .map(
                      (l) =>
                        `<tr>
                          <td style="padding: 8px; border: 1px solid #ddd;">${l.language || '-'}</td>
                          <td style="padding: 8px; border: 1px solid #ddd;">${l.level || '-'}</td>
                        </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>

            <p style="margin-top: 20px;"><strong>Cover Letter:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 20px;">
              ${coverLetter}
            </div>
          </div>

        </body>
        </html>
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
      from: `Finansis Intenational <${process.env.COMPANY_EMAIL}>`,
      to: `${name} <${email}>`,
      subject: 'Job Request Received',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; text-align: center;">
          <h2 style="color: #0056b3; margin-bottom: 20px;">Job Request Received</h2>
          <p style="margin-bottom: 20px;">
            Thank you for your job request. We have received your application and will review it thoroughly. 
            Our team will get back to you as soon as possible.
          </p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p style="font-weight: bold;">HR Team</p>
        </div>
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
      from: `${name} <${email}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
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
      from: `Finansis Intenational <${process.env.COMPANY_EMAIL}>`,
      to: `${name} <${email}>`,
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
