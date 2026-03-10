const nodemailer = require('nodemailer');

/**
 * Email Service for Tecvinson Academy
 * Handles all email notifications - applications, waitlist, admin alerts
 */

// Create reusable transporter
const createTransporter = () => {
    // Check if we have email configuration
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ Email service not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env');
        return null;
    }

    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

/**
 * Send application confirmation email to student
 */
const sendApplicationConfirmation = async (applicationData) => {
    const transporter = createTransporter();
    if (!transporter) {
        console.log('📧 Email skipped (not configured):', applicationData.email);
        return { success: false, message: 'Email service not configured' };
    }

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: applicationData.email,
        subject: 'Application Received - Tecvinson Academy',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #3B9790; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
                    .details { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #3B9790; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    ul { list-style: none; padding: 0; }
                    li { padding: 8px 0; border-bottom: 1px solid #eee; }
                    strong { color: #3B9790; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎓 Application Received!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${applicationData.firstName} ${applicationData.lastName},</p>
                        
                        <p>Thank you for applying to <strong>Tecvinson Academy</strong>! We're excited about your interest in joining our program.</p>
                        
                        <div class="details">
                            <h3>📋 Application Summary</h3>
                            <ul>
                                <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
                                <li><strong>Email:</strong> ${applicationData.email}</li>
                                <li><strong>Phone:</strong> ${applicationData.phoneNumber}</li>
                                <li><strong>Course:</strong> ${applicationData.course}</li>
                                <li><strong>Country:</strong> ${applicationData.country}</li>
                                <li><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</li>
                            </ul>
                        </div>
                        
                        <h3>⏭️ What Happens Next?</h3>
                        <ol>
                            <li><strong>Review Process:</strong> Our admissions team will carefully review your application</li>
                            <li><strong>Aptitude Test:</strong> Qualified candidates will be invited to take an aptitude assessment</li>
                            <li><strong>Final Decision:</strong> You'll receive an email with our decision within 5-7 business days</li>
                        </ol>
                        
                        <p><strong>📧 Keep an eye on your inbox</strong> (and spam folder) for updates from us!</p>
                        
                        <p>If you have any questions in the meantime, feel free to reply to this email or contact us at <a href="mailto:support@tecvinsonacademy.com">support@tecvinsonacademy.com</a>.</p>
                        
                        <p>Best regards,<br>
                        <strong>The Tecvinson Academy Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>Tecvinson Academy | Building Africa's Tech Talent<br>
                        <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Application confirmation sent to:', applicationData.email);
        return { success: true, message: 'Confirmation email sent' };
    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Send waitlist confirmation email to student
 */
const sendWaitlistConfirmation = async (waitlistData, cohortInfo = null) => {
    const transporter = createTransporter();
    if (!transporter) {
        console.log('📧 Email skipped (not configured):', waitlistData.email);
        return { success: false, message: 'Email service not configured' };
    }

    const cohortName = cohortInfo ? cohortInfo.name : 'the upcoming cohort';

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: waitlistData.email,
        subject: 'You\'re on the Waitlist - Tecvinson Academy',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #FFA500; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
                    .details { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #FFA500; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    .highlight { background: #FFF3CD; padding: 15px; border-radius: 5px; margin: 20px 0; }
                    ul { list-style: none; padding: 0; }
                    li { padding: 8px 0; border-bottom: 1px solid #eee; }
                    strong { color: #FFA500; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎯 You're on the Waitlist!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${waitlistData.firstName} ${waitlistData.lastName},</p>
                        
                        <p>Thank you for your interest in <strong>Tecvinson Academy</strong>! You've been successfully added to the waitlist for ${cohortName}.</p>
                        
                        <div class="details">
                            <h3>📋 Waitlist Registration</h3>
                            <ul>
                                <li><strong>Name:</strong> ${waitlistData.firstName} ${waitlistData.lastName}</li>
                                <li><strong>Email:</strong> ${waitlistData.email}</li>
                                <li><strong>Course:</strong> ${waitlistData.course}</li>
                                <li><strong>Preferred Cohort:</strong> ${cohortName}</li>
                                <li><strong>Registered:</strong> ${new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</li>
                            </ul>
                        </div>
                        
                        <div class="highlight">
                            <strong>⚡ What Being on the Waitlist Means:</strong>
                            <ul style="margin-top: 10px;">
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
                        
                        <p><strong>💡 Pro Tip:</strong> Make sure to add our email to your contacts so you don't miss our notification!</p>
                        
                        <p>We'll be in touch soon with updates on your waitlist status.</p>
                        
                        <p>Best regards,<br>
                        <strong>The Tecvinson Academy Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>Tecvinson Academy | Building Africa's Tech Talent<br>
                        <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Waitlist confirmation sent to:', waitlistData.email);
        return { success: true, message: 'Waitlist confirmation email sent' };
    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Send admin notification for new application
 */
const sendAdminNotification = async (applicationType, applicationData) => {
    const transporter = createTransporter();
    if (!transporter) {
        return { success: false, message: 'Email service not configured' };
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tecvinsonacademy.com';

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: adminEmail,
        subject: `New ${applicationType} - ${applicationData.firstName} ${applicationData.lastName}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #333; color: white; padding: 20px; text-align: center; }
                    .content { background: #f9f9f9; padding: 30px; }
                    .details { background: white; padding: 20px; margin: 20px 0; border: 1px solid #ddd; }
                    ul { list-style: none; padding: 0; }
                    li { padding: 8px 0; border-bottom: 1px solid #eee; }
                    .button { display: inline-block; padding: 12px 24px; background: #3B9790; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>🔔 New ${applicationType}</h2>
                    </div>
                    <div class="content">
                        <p>A new ${applicationType.toLowerCase()} has been submitted.</p>
                        
                        <div class="details">
                            <h3>Applicant Details</h3>
                            <ul>
                                <li><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</li>
                                <li><strong>Email:</strong> ${applicationData.email}</li>
                                <li><strong>Phone:</strong> ${applicationData.phoneNumber}</li>
                                <li><strong>Course:</strong> ${applicationData.course}</li>
                                <li><strong>Country:</strong> ${applicationData.country}</li>
                                <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                            </ul>
                        </div>
                        
                        <p><strong>Reason for Applying:</strong></p>
                        <p style="background: white; padding: 15px; border-left: 3px solid #3B9790;">${applicationData.reason}</p>
                        
                        <a href="https://tecvinsonacademy.com/admin/students" class="button">View in Admin Panel</a>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Admin notification sent for new', applicationType);
        return { success: true, message: 'Admin notification sent' };
    } catch (error) {
        console.error('❌ Admin notification failed:', error.message);
        return { success: false, message: error.message };
    }
};

/**
 * Send status update email (acceptance/rejection)
 */
const sendStatusUpdateEmail = async (applicantData, newStatus, additionalMessage = '') => {
    const transporter = createTransporter();
    if (!transporter) {
        return { success: false, message: 'Email service not configured' };
    }

    const statusConfig = {
        approved: {
            subject: '🎉 Congratulations! You\'ve been accepted - Tecvinson Academy',
            title: 'Application Approved!',
            color: '#28a745',
            message: `We're thrilled to inform you that your application has been <strong>approved</strong>! Welcome to the Tecvinson Academy family.`
        },
        rejected: {
            subject: 'Application Status Update - Tecvinson Academy',
            title: 'Application Update',
            color: '#dc3545',
            message: 'Thank you for your interest in Tecvinson Academy. After careful review, we regret to inform you that we are unable to offer you a place in this cohort.'
        },
        accepted: {
            subject: '🎊 Spot Available! Accept Your Place - Tecvinson Academy',
            title: 'Your Waitlist Spot is Ready!',
            color: '#28a745',
            message: `Great news! A spot has opened up in your preferred cohort. You have <strong>48 hours</strong> to accept your place.`
        }
    };

    const config = statusConfig[newStatus] || statusConfig.approved;

    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: applicantData.email,
        subject: config.subject,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: ${config.color}; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
                    .message-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid ${config.color}; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    .button { display: inline-block; padding: 12px 24px; background: ${config.color}; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>${config.title}</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${applicantData.firstName} ${applicantData.lastName},</p>
                        
                        <div class="message-box">
                            <p>${config.message}</p>
                            ${additionalMessage ? `<p>${additionalMessage}</p>` : ''}
                        </div>
                        
                        <p>If you have any questions, please don't hesitate to reach out to our team.</p>
                        
                        <p>Best regards,<br>
                        <strong>The Tecvinson Academy Team</strong></p>
                    </div>
                    <div class="footer">
                        <p>Tecvinson Academy | Building Africa's Tech Talent<br>
                        <a href="https://tecvinsonacademy.com">www.tecvinsonacademy.com</a></p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Status update (${newStatus}) sent to:`, applicantData.email);
        return { success: true, message: 'Status update email sent' };
    } catch (error) {
        console.error('❌ Status update email failed:', error.message);
        return { success: false, message: error.message };
    }
};

module.exports = {
    sendApplicationConfirmation,
    sendWaitlistConfirmation,
    sendAdminNotification,
    sendStatusUpdateEmail
};
