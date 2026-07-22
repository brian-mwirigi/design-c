import nodemailer from 'nodemailer';

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const { name, phone, email, company, interest, message } = req.body || {};

    if (!name || !phone || !email || !message) {
      sendJson(res, 400, { error: 'Missing required fields' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.SMTP_TO || 'keithfountsolutionslimited@gmail.com';

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipient,
      subject: `Project enquiry: ${interest || 'General enquiry'}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Interested in: ${interest || 'General enquiry'}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact mail sent:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact mail error:', error);
    sendJson(res, 500, { error: 'Unable to send email' });
  }
}
