import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mailhog',
  port: Number(process.env.SMTP_PORT || 1025)
});

export async function sendVerifyEmail(to, token) {
  const link = `${process.env.PUBLIC_URL}/auth/verify?token=${token}`;
  await transporter.sendMail({
    from: 'no-reply@messenger.local',
    to,
    subject: 'Подтверждение регистрации',
    html: `<p>Подтвердите регистрацию: <a href="${link}">${link}</a></p>`
  });
}
