const { Resend } = require('resend');

/**
 * Email Service for Tecvinson Academy
 * Handles all email notifications using Resend
 */

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_replace_me');

const FROM_EMAIL = process.env.FROM_EMAIL || 'Tecvinson Academy <noreply@tecvinsonacademy.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tecvinsonacademy.com';

/**
 * Core send helper — returns { success, message }
 * Never throws, so callers don't need try/catch.
 */
const send = async ({ to, subject, html }) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('⚠️  RESEND_API_KEY not set — email skipped:', subject);
        return { success: false, message: 'Email service not configured' };
    }
    try {
        const { error } = await resend.emails.send({ from: FROM_EMAIL, to: Array.isArray(to) ? to : [to], subject, html });
        if (error) {
            console.error('❌ Resend error:', error);
            return { success: false, message: error.message };
        }
        console.log(`✅ Email sent → ${to} | ${subject}`);
        return { success: true };
    } catch (err) {
        console.error('❌ Email exception:', err.message);
        return { success: false, message: err.message };
    }
};

/**
 * Send application confirmation email to student
 */
const sendApplicationConfirmation = async (applicationData) => {
    return send({
        to: applicationData.email,
        subject: 'Application Received - Tecvinson Academy',
        html: `
            <!DOCTYPE html><html><head><style>
                body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
                .container{max-width:600px;margin:0 auto;padding:20px}
                .header{background:#3B9790;color:white;padding:20px;text-align:center;border-radius:5px 5px 0 0}
                .content{background:#f9f9f9;padding:30px;border-radius:0 0 5px 5px}
                .details{background:white;padding:20px;margin:20px 0;border-left:4px solid #3B9790}
                .footer{text-align:center;margin-top:30px;color:#666;font-size:12px}
                ul{list-style:none;padding:0} li{padding:8px 0;border-bottom:1px solid #eee}
                strong{color:#3B9790}
            </style></head><body>
            <div class="container">
                <div class="header"><h1>🎓 Application Received!</h1></div>
                <div class="content">
                    <p>Dear ${applicationData.firstName} ${applicationData.lastName},</p>
                    <p>Thank you for applying to <strong>Tecvinson Academy</strong>! We're excited about your interest in joining our program.</p>
                    <div class="details">
                        <h3>📋 Application Summary</h3>
                        <ul>
                            <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
                            <li><strong>Email:</strong> ${applicationData.email}</li>
                            <li><strong>Phone:</strong> ${applicationData.phoneNumber || '—'}</li>
                            <li><strong>Course:</strong> ${applicationData.course || applicationData.courseOfInterest || '—'}</li>
                            <li><strong>Country:</strong> ${applicationData.country || '—'}</li>
                            <li><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</li>
                        </ul>
                    </div>
                    <h3>⏭️ What Happens Next?</h3>
                    <ol>
                        <li><strong>Review Process:</strong> Our admissions team will carefully review your application</li>
                        <li><strong>Aptitude Test:</strong> Qualified candidates will be invited to take an aptitude assessment</li>
                        <li><strong>Final Decision:</strong> You'll receive an email with our decision within 5–7 business days</li>
                    </ol>
                    <p><strong>📧 Keep an eye on your inbox</strong> (and spam folder) for updates from us!</p>
                    <p>Best regards,<br><strong>The Tecvinson Academy Team</strong></p>
                </div>
                <div class="footer"><p>Tecvinson Academy | Building Africa's Tech Talent<br>
                <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p></div>
            </div></body></html>`
    });
};

/**
 * Send waitlist confirmation email to student
 */
const sendWaitlistConfirmation = async (waitlistData, cohortInfo = null) => {
    const cohortName = cohortInfo ? (cohortInfo.title || cohortInfo.name) : 'the upcoming cohort';
    return send({
        to: waitlistData.email,
        subject: "You're on the Waitlist - Tecvinson Academy",
        html: `
            <!DOCTYPE html><html><head><style>
                body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
                .container{max-width:600px;margin:0 auto;padding:20px}
                .header{background:#FFA500;color:white;padding:20px;text-align:center;border-radius:5px 5px 0 0}
                .content{background:#f9f9f9;padding:30px;border-radius:0 0 5px 5px}
                .details{background:white;padding:20px;margin:20px 0;border-left:4px solid #FFA500}
                .footer{text-align:center;margin-top:30px;color:#666;font-size:12px}
                .highlight{background:#FFF3CD;padding:15px;border-radius:5px;margin:20px 0}
                ul{list-style:none;padding:0} li{padding:8px 0;border-bottom:1px solid #eee}
                strong{color:#FFA500}
            </style></head><body>
            <div class="container">
                <div class="header"><h1>🎯 You're on the Waitlist!</h1></div>
                <div class="content">
                    <p>Dear ${waitlistData.firstName} ${waitlistData.lastName},</p>
                    <p>Thank you for your interest in <strong>Tecvinson Academy</strong>! You've been successfully added to the waitlist for ${cohortName}.</p>
                    <div class="details">
                        <h3>📋 Waitlist Registration</h3>
                        <ul>
                            <li><strong>Name:</strong> ${waitlistData.firstName} ${waitlistData.lastName}</li>
                            <li><strong>Email:</strong> ${waitlistData.email}</li>
                            <li><strong>Course:</strong> ${waitlistData.course || '—'}</li>
                            <li><strong>Cohort:</strong> ${cohortName}</li>
                            <li><strong>Registered:</strong> ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</li>
                        </ul>
                    </div>
                    <div class="highlight">
                        <strong>⚡ What Being on the Waitlist Means:</strong>
                        <ul style="margin-top:10px">
                            <li>✓ You'll be notified immediately when spots become available</li>
                            <li>✓ Priority consideration for the next intake</li>
                            <li>✓ No application fee required when accepting your spot</li>
                        </ul>
                    </div>
                    <h3>⏭️ Next Steps</h3>
                    <ol>
                        <li><strong>Stay Tuned:</strong> Keep an eye on your email for updates</li>
                        <li><strong>Spot Available:</strong> We'll notify you as soon as a position opens</li>
                        <li><strong>Quick Response:</strong> Respond within 48 hours to secure your spot</li>
                    </ol>
                    <p>Best regards,<br><strong>The Tecvinson Academy Team</strong></p>
                </div>
                <div class="footer"><p>Tecvinson Academy | Building Africa's Tech Talent<br>
                <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p></div>
            </div></body></html>`
    });
};

/**
 * Send admin notification for new submission (application, waitlist, contact, etc.)
 */
const sendAdminNotification = async (applicationType, applicationData) => {
    const course = applicationData.course || applicationData.courseOfInterest || '—';
    return send({
        to: ADMIN_EMAIL,
        subject: `New ${applicationType} — ${applicationData.firstName} ${applicationData.lastName}`,
        html: `
            <!DOCTYPE html><html><head><style>
                body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
                .container{max-width:600px;margin:0 auto;padding:20px}
                .header{background:#1e293b;color:white;padding:20px;text-align:center}
                .content{background:#f9f9f9;padding:30px}
                .details{background:white;padding:20px;margin:20px 0;border:1px solid #ddd}
                ul{list-style:none;padding:0} li{padding:8px 0;border-bottom:1px solid #eee}
                .btn{display:inline-block;padding:12px 24px;background:#3B9790;color:white;text-decoration:none;border-radius:5px;margin-top:20px}
            </style></head><body>
            <div class="container">
                <div class="header"><h2>🔔 New ${applicationType}</h2></div>
                <div class="content">
                    <p>A new <strong>${applicationType.toLowerCase()}</strong> has just been submitted.</p>
                    <div class="details">
                        <h3>Details</h3>
                        <ul>
                            <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
                            <li><strong>Email:</strong> ${applicationData.email}</li>
                            <li><strong>Phone:</strong> ${applicationData.phoneNumber || '—'}</li>
                            <li><strong>Course:</strong> ${course}</li>
                            <li><strong>Country:</strong> ${applicationData.country || '—'}</li>
                            <li><strong>Time Zone:</strong> ${applicationData.timeZone || '—'}</li>
                            <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                        </ul>
                    </div>
                    ${applicationData.reason ? `<p><strong>Reason / Message:</strong></p>
                    <p style="background:white;padding:15px;border-left:3px solid #3B9790">${applicationData.reason}</p>` : ''}
                    ${applicationData.message ? `<p><strong>Message:</strong></p>
                    <p style="background:white;padding:15px;border-left:3px solid #3B9790">${applicationData.message}</p>` : ''}
                    <a href="https://tecvinsonacademy.com/admin" class="btn">View in Admin Panel</a>
                </div>
            </div></body></html>`
    });
};

/**
 * Send contact form notification to admin + confirmation to sender
 */
const sendContactNotification = async (contactData) => {
    // Admin notification
    await send({
        to: ADMIN_EMAIL,
        subject: `New Contact Message — ${contactData.firstName} ${contactData.lastName}`,
        html: `
            <!DOCTYPE html><html><head><style>
                body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
                .container{max-width:600px;margin:0 auto;padding:20px}
                .header{background:#1e293b;color:white;padding:20px;text-align:center}
                .content{background:#f9f9f9;padding:30px}
                .details{background:white;padding:20px;margin:20px 0;border:1px solid #ddd}
                ul{list-style:none;padding:0} li{padding:8px 0;border-bottom:1px solid #eee}
            </style></head><body>
            <div class="container">
                <div class="header"><h2>📩 New Contact Message</h2></div>
                <div class="content">
                    <div class="details">
                        <ul>
                            <li><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</li>
                            <li><strong>Email:</strong> ${contactData.email}</li>
                            <li><strong>Phone:</strong> ${contactData.phoneNumber || '—'}</li>
                            <li><strong>Received:</strong> ${new Date().toLocaleString()}</li>
                        </ul>
                    </div>
                    <p><strong>Message:</strong></p>
                    <p style="background:white;padding:15px;border-left:3px solid #3B9790">${contactData.message || '(no message)'}</p>
                </div>
            </div></body></html>`
    });

    // Confirmation to sender
    return send({
        to: contactData.email,
        subject: "We've received your message — Tecvinson Academy",
        html: `
            <!DOCTYPE html><html><head><style>
                body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
                .container{max-width:600px;margin:0 auto;padding:20px}
                .header{background:#3B9790;color:white;padding:20px;text-align:center;border-radius:5px 5px 0 0}
                .content{background:#f9f9f9;padding:30px;border-radius:0 0 5px 5px}
                .footer{text-align:center;margin-top:30px;color:#666;font-size:12px}
            </style></head><body>
            <div class="container">
                <div class="header"><h1>✅ Message Received</h1></div>
                <div class="content">
                    <p>Hi ${contactData.firstName},</p>
                    <p>Thank you for reaching out to <strong>Tecvinson Academy</strong>! We've received your message and will get back to you within 1–2 business days.</p>
                    <p>Best regards,<br><strong>The Tecvinson Academy Team</strong></p>
                </div>
                <div class="footer"><p>Tecvinson Academy | Building Africa's Tech Talent<br>
                <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p></div>
            </div></body></html>`
    });
};

/**
 * Send status update email (acceptance/rejection/waitlist accepted)
 */
const sendStatusUpdateEmail = async (applicantData, newStatus, additionalMessage = '') => {
    const statusConfig = {
        approved: {
            subject: "🎉 Congratulations! You've been accepted — Tecvinson Academy",
            title: 'Application Approved!', color: '#28a745',
            message: "We're thrilled to inform you that your application has been <strong>approved</strong>! Welcome to the Tecvinson Academy family."
        },
        rejected: {
            subject: 'Application Status Update — Tecvinson Academy',
            title: 'Application Update', color: '#dc3545',
            message: 'Thank you for your interest in Tecvinson Academy. After careful review, we regret to inform you that we are unable to offer you a place in this cohort.'
        },
        accepted: {
            subject: '🎊 Spot Available! Accept Your Place — Tecvinson Academy',
            title: 'Your Waitlist Spot is Ready!', color: '#28a745',
            message: "Great news! A spot has opened up in your preferred cohort. You have <strong>48 hours</strong> to accept your place."
        }
    };
    const config = statusConfig[newStatus] || statusConfig.approved;
    return send({
        to: applicantData.email,
        subject: config.subject,
        html: `
            <!DOCTYPE html><html><head><style>
                body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
                .container{max-width:600px;margin:0 auto;padding:20px}
                .header{background:${config.color};color:white;padding:20px;text-align:center;border-radius:5px 5px 0 0}
                .content{background:#f9f9f9;padding:30px;border-radius:0 0 5px 5px}
                .msg{background:white;padding:20px;margin:20px 0;border-left:4px solid ${config.color}}
                .footer{text-align:center;margin-top:30px;color:#666;font-size:12px}
            </style></head><body>
            <div class="container">
                <div class="header"><h1>${config.title}</h1></div>
                <div class="content">
                    <p>Dear ${applicantData.firstName} ${applicantData.lastName},</p>
                    <div class="msg">
                        <p>${config.message}</p>
                        ${additionalMessage ? `<p>${additionalMessage}</p>` : ''}
                    </div>
                    <p>If you have any questions, please don't hesitate to reach out to our team.</p>
                    <p>Best regards,<br><strong>The Tecvinson Academy Team</strong></p>
                </div>
                <div class="footer"><p>Tecvinson Academy | Building Africa's Tech Talent<br>
                <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p></div>
            </div></body></html>`
    });
};

module.exports = {
    sendApplicationConfirmation,
    sendWaitlistConfirmation,
    sendAdminNotification,
    sendContactNotification,
    sendStatusUpdateEmail
};
