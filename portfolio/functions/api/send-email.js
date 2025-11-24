import nodemailer from 'nodemailer';

export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const { name, email, message } = await request.json();

        // Validate environment variables
        if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
            console.error('Missing SMTP environment variables');
            return new Response(JSON.stringify({ error: 'Server configuration error: Missing SMTP settings' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: parseInt(env.SMTP_PORT || '587'),
            secure: env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
            // Fail fast if connection hangs
            connectionTimeout: 5000, // 5 seconds
            greetingTimeout: 5000,
            socketTimeout: 5000,
        });

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"${name}" <${env.SMTP_USER}>`, // sender address (must be authenticated user usually)
            to: env.SMTP_USER, // list of receivers (send to yourself)
            replyTo: email, // set reply-to as the user's email
            subject: `Portfolio Contact: ${name}`, // Subject line
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `, // html body
        });

        return new Response(JSON.stringify({ message: 'Email sent successfully', messageId: info.messageId }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Email sending error:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
