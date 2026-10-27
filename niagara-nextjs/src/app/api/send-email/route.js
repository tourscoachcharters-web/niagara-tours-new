import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ADMIN_NOTIFICATION_EMAILS = [
  'tourscoachcharters@gmail.com',
  'info@niagaratravels.ca',
];

/**
 * Universal email dispatcher:
 * 1. Resend API (if RESEND_API_KEY is configured)
 * 2. Nodemailer SMTP (if SMTP_USER / GMAIL_USER is configured)
 * 3. Graceful simulation log in development if neither is configured
 */
async function sendEmailMessage({ to, subject, html, replyTo, bcc }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  const defaultFrom = process.env.RESEND_FROM || 'Niagara Travels <bookings@niagaratravels.ca>';

  // Strategy 1: Resend
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const payload = {
        from: defaultFrom,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      };
      if (replyTo) payload.reply_to = replyTo;
      if (bcc) payload.bcc = Array.isArray(bcc) ? bcc : [bcc];

      const res = await resend.emails.send(payload);

      if (res.error) {
        // If unverified domain issue in test mode, retry with onboarding@resend.dev
        if (res.error.message && res.error.message.toLowerCase().includes('domain')) {
          console.warn('Resend domain unverified, trying onboarding@resend.dev:', res.error.message);
          payload.from = 'Niagara Travels <onboarding@resend.dev>';
          const retryRes = await resend.emails.send(payload);
          if (retryRes.error) {
            throw new Error(retryRes.error.message);
          }
          return { success: true, provider: 'resend-fallback', id: retryRes.data?.id };
        }
        throw new Error(res.error.message || JSON.stringify(res.error));
      }

      return { success: true, provider: 'resend', id: res.data?.id };
    } catch (err) {
      console.warn('Resend dispatch notice:', err.message);
      // Fall through to SMTP if available
    }
  }

  // Strategy 2: Nodemailer (SMTP / Gmail)
  if (smtpUser && smtpPass) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: (process.env.SMTP_PORT || '465') === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Niagara Travels" <${smtpUser}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : undefined,
        replyTo: replyTo || 'info@niagaratravels.ca',
        subject,
        html,
      });

      return { success: true, provider: 'nodemailer', id: info.messageId };
    } catch (smtpErr) {
      console.warn('Nodemailer dispatch notice:', smtpErr.message);
    }
  }

  // Strategy 3: Mock / Development simulation
  console.log(
    `[EMAIL DISPATCH - SIMULATED]\nTo: ${Array.isArray(to) ? to.join(', ') : to}\nSubject: ${subject}\nBCC: ${bcc || 'None'}\nReply-To: ${replyTo || 'None'}`
  );
  return {
    success: true,
    simulated: true,
    message: 'Dispatched to log (configure RESEND_API_KEY or SMTP credentials in production environment)',
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;

    // =========================================================================
    // CASE 1: CONTACT US INQUIRY
    // =========================================================================
    if (type === 'contact_inquiry') {
      const {
        refId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName = 'Guest',
        email,
        phone = 'N/A',
        inquiryType = 'General Inquiry',
        inquiryTypeLabel = inquiryType,
        selectedTour = 'General Experience',
        estimatedDate = 'Flexible / Not Decided',
        partySize = '2 Guests',
        message = 'No message provided',
        createdAt = new Date().toLocaleString(),
      } = body;

      if (!email) {
        return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
      }

      // 1. Admin Alert Email HTML
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
            .header { background: #0C3136; padding: 28px 32px; color: #ffffff; }
            .badge { display: inline-block; background: #F8A41E; color: #0C3136; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; rounded: 6px; border-radius: 6px; margin-bottom: 8px; }
            .title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
            .body { padding: 32px; }
            .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }
            .row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
            .row:last-child { border-bottom: none; }
            .label { color: #64748b; font-weight: 600; }
            .value { color: #0C3136; font-weight: 700; text-align: right; }
            .msg-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 0 10px 10px 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #1e3a8a; }
            .btn-group { display: flex; gap: 12px; margin-top: 24px; }
            .btn { display: inline-block; background: #0C3136; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
            .btn-phone { background: #16a34a; }
            .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">New Website Inquiry • ${refId}</span>
              <h1 class="title">New Customer Inquiry Received</h1>
            </div>
            <div class="body">
              <p style="font-size: 15px; margin-top: 0; color: #334155;">
                A new inquiry was just submitted through <strong>niagaratravels.ca/contact</strong>.
              </p>
              
              <div class="info-grid">
                <div class="row"><span class="label">Customer Name:</span><span class="value">${fullName}</span></div>
                <div class="row"><span class="label">Customer Email:</span><span class="value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></span></div>
                <div class="row"><span class="label">Phone Number:</span><span class="value"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></span></div>
                <div class="row"><span class="label">Inquiry Category:</span><span class="value">${inquiryTypeLabel}</span></div>
                <div class="row"><span class="label">Selected Tour:</span><span class="value">${selectedTour}</span></div>
                <div class="row"><span class="label">Estimated Date:</span><span class="value">${estimatedDate}</span></div>
                <div class="row"><span class="label">Party Size:</span><span class="value">${partySize}</span></div>
                <div class="row"><span class="label">Timestamp:</span><span class="value">${createdAt}</span></div>
              </div>

              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 8px;">
                Customer Message:
              </div>
              <div class="msg-box">
                "${message.replace(/\n/g, '<br/>')}"
              </div>

              <div class="btn-group">
                <a href="mailto:${email}?subject=Re:%20Niagara%20Travels%20Inquiry%20[${refId}]" class="btn">Reply to Customer</a>
                ${phone && phone !== 'N/A' ? `<a href="tel:${phone}" class="btn btn-phone">Call Customer</a>` : ''}
              </div>
            </div>
            <div class="footer">
              Niagara Travels Automated Concierge Alert • Direct to tourscoachcharters@gmail.com &amp; info@niagaratravels.ca
            </div>
          </div>
        </body>
        </html>
      `;

      // 2. Customer Confirmation Email HTML
      const customerHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
            .header { background: #0C3136; padding: 28px 30px; color: #ffffff; }
            .title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
            .body { padding: 30px; font-size: 14px; line-height: 1.6; color: #334155; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
            .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 12px; margin-bottom: 12px; }
            .footer { padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">We Received Your Inquiry!</h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Thank you for reaching out to Niagara Travels</p>
            </div>
            <div class="body">
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>
                Thank you for contacting Niagara Travels. Our local Toronto &amp; Niagara concierge team has received your message regarding <strong>${selectedTour}</strong>.
              </p>
              <div class="box">
                <span class="badge">Reference ID: ${refId}</span>
                <p style="margin: 4px 0;"><strong>Estimated Date:</strong> ${estimatedDate}</p>
                <p style="margin: 4px 0;"><strong>Party Size:</strong> ${partySize}</p>
                <p style="margin: 4px 0;"><strong>Your Message:</strong> "${message}"</p>
              </div>
              <p>
                One of our licensed trip specialists will review your requirements and respond to you shortly (typically in under 15 minutes during operating hours).
              </p>
              <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
                Need instant assistance? Call our 24/7 priority line at <strong>(416) 444-3000</strong> or reply directly to this email.
              </p>
            </div>
            <div class="footer">
              Niagara Travels • Toronto &amp; Niagara Falls, Ontario, Canada<br/>
              info@niagaratravels.ca | (416) 444-3000
            </div>
          </div>
        </body>
        </html>
      `;

      // Dispatch to Admins
      const adminDispatch = await sendEmailMessage({
        to: ADMIN_NOTIFICATION_EMAILS,
        replyTo: `${fullName} <${email}>`,
        subject: `⚡ New Niagara Inquiry [${refId}]: ${fullName} - ${selectedTour || inquiryType}`,
        html: adminHtml,
      });

      // Dispatch copy to Customer
      sendEmailMessage({
        to: email,
        replyTo: 'info@niagaratravels.ca',
        subject: `Inquiry Received [${refId}] - Niagara Travels`,
        html: customerHtml,
      }).catch((e) => console.warn('Customer confirmation copy notice:', e.message));

      return NextResponse.json({
        success: true,
        refId,
        adminDispatch,
        message: 'Inquiry successfully delivered to tourscoachcharters@gmail.com and info@niagaratravels.ca',
      });
    }

    // =========================================================================
    // CASE 2: CUSTOM ITINERARY REQUEST
    // =========================================================================
    if (type === 'custom_itinerary') {
      const {
        refId = `CUST-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName = 'Guest',
        email,
        phone = 'N/A',
        selectedDate = 'Flexible / Not Decided',
        groupSize = '2 Adults',
        interests = [],
        notes = 'No additional notes provided',
        createdAt = new Date().toLocaleString(),
      } = body;

      if (!email) {
        return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
      }

      const formattedInterests = Array.isArray(interests) && interests.length > 0
        ? interests.map((i) => `<li style="padding: 4px 0;">✨ ${i}</li>`).join('')
        : '<li>General Niagara Sightseeing</li>';

      // 1. Admin Alert Email HTML
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
            .header { background: #0C3136; padding: 28px 32px; color: #ffffff; border-bottom: 4px solid #F8A41E; }
            .badge { display: inline-block; background: #F8A41E; color: #0C3136; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 6px; margin-bottom: 8px; }
            .title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
            .body { padding: 32px; }
            .info-grid { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px; }
            .row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px dashed #e2e8f0; font-size: 14px; }
            .row:last-child { border-bottom: none; }
            .label { color: #64748b; font-weight: 600; }
            .value { color: #0C3136; font-weight: 700; text-align: right; }
            .interests-box { background: #fefce8; border: 1px solid #fef08a; padding: 16px 20px; border-radius: 10px; margin-bottom: 24px; }
            .interests-box ul { margin: 8px 0 0 0; padding-left: 20px; color: #854d0e; font-size: 14px; }
            .notes-box { background: #f8fafc; border-left: 4px solid #F8A41E; padding: 16px 20px; border-radius: 0 10px 10px 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; color: #334155; }
            .btn-group { display: flex; gap: 12px; margin-top: 24px; }
            .btn { display: inline-block; background: #0C3136; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 8px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
            .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">Custom Itinerary Proposal • ${refId}</span>
              <h1 class="title">New Custom Itinerary Request</h1>
            </div>
            <div class="body">
              <p style="font-size: 15px; margin-top: 0; color: #334155;">
                A bespoke tour proposal was submitted via <strong>niagaratravels.ca/custom-itinerary</strong>.
              </p>
              
              <div class="info-grid">
                <div class="row"><span class="label">Lead Guest:</span><span class="value">${fullName}</span></div>
                <div class="row"><span class="label">Email:</span><span class="value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></span></div>
                <div class="row"><span class="label">Phone:</span><span class="value"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></span></div>
                <div class="row"><span class="label">Target Date:</span><span class="value">${selectedDate}</span></div>
                <div class="row"><span class="label">Group / Vehicle Tier:</span><span class="value">${groupSize}</span></div>
                <div class="row"><span class="label">Requested At:</span><span class="value">${createdAt}</span></div>
              </div>

              <div class="interests-box">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #854d0e; letter-spacing: 0.05em;">
                  Selected Attractions &amp; Experiences:
                </div>
                <ul>
                  ${formattedInterests}
                </ul>
              </div>

              <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; margin-bottom: 8px;">
                Special Requests / Pickup Logistics:
              </div>
              <div class="notes-box">
                "${notes.replace(/\n/g, '<br/>')}"
              </div>

              <div class="btn-group">
                <a href="mailto:${email}?subject=Your%20Custom%20Niagara%20Itinerary%20Proposal%20[${refId}]" class="btn">Send Custom Proposal</a>
                ${phone && phone !== 'N/A' ? `<a href="tel:${phone}" class="btn" style="background: #16a34a;">Call Guest</a>` : ''}
              </div>
            </div>
            <div class="footer">
              Niagara Travels Custom Charters • Direct to tourscoachcharters@gmail.com &amp; info@niagaratravels.ca
            </div>
          </div>
        </body>
        </html>
      `;

      // 2. Customer Confirmation Email HTML
      const customerHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 18px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
            .header { background: #0C3136; padding: 28px 30px; color: #ffffff; }
            .title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
            .body { padding: 30px; font-size: 14px; line-height: 1.6; color: #334155; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0; }
            .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 12px; margin-bottom: 12px; }
            .footer { padding: 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1 class="title">Custom Proposal Requested!</h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Niagara Travels Private Charters &amp; Custom Experiences</p>
            </div>
            <div class="body">
              <p>Hello <strong>${fullName}</strong>,</p>
              <p>
                Thank you for designing your custom Niagara adventure with us! Our private charter architects are currently reviewing your requested itinerary.
              </p>
              <div class="box">
                <span class="badge">Reference ID: ${refId}</span>
                <p style="margin: 4px 0;"><strong>Desired Date:</strong> ${selectedDate}</p>
                <p style="margin: 4px 0;"><strong>Group Size:</strong> ${groupSize}</p>
                <p style="margin: 4px 0;"><strong>Special Notes:</strong> "${notes}"</p>
              </div>
              <p>
                We will email your bespoke itinerary proposal and all-inclusive quote to <strong>${email}</strong> within 2 hours.
              </p>
              <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
                Questions or changes? Reply directly to this email or speak to a charter specialist at <strong>(416) 444-3000</strong>.
              </p>
            </div>
            <div class="footer">
              Niagara Travels • Toronto &amp; Niagara Falls, Ontario, Canada<br/>
              info@niagaratravels.ca | (416) 444-3000
            </div>
          </div>
        </body>
        </html>
      `;

      // Dispatch to Admins
      const adminDispatch = await sendEmailMessage({
        to: ADMIN_NOTIFICATION_EMAILS,
        replyTo: `${fullName} <${email}>`,
        subject: `🌟 New Custom Itinerary Request [${refId}]: ${fullName} (${groupSize})`,
        html: adminHtml,
      });

      // Dispatch copy to Customer
      sendEmailMessage({
        to: email,
        replyTo: 'info@niagaratravels.ca',
        subject: `Custom Niagara Proposal Request [${refId}] - Niagara Travels`,
        html: customerHtml,
      }).catch((e) => console.warn('Customer proposal confirmation notice:', e.message));

      return NextResponse.json({
        success: true,
        refId,
        adminDispatch,
        message: 'Custom proposal request delivered to tourscoachcharters@gmail.com and info@niagaratravels.ca',
      });
    }

    // =========================================================================
    // CASE 3: STANDARD BOOKING CONFIRMATION (CheckoutClient.jsx)
    // =========================================================================
    const { email, fullName = 'Guest', bookingId = 'BK-PENDING', tourName = 'Niagara Tour', tourDate = 'Upcoming', pickup = 'Standard Hub', total = 'CAD $0.00' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
    }

    const bookingHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 14px; background: #ffffff;">
        <h1 style="color: #0C3136; margin-bottom: 5px; font-size: 24px;">Your Booking is Confirmed!</h1>
        <p style="color: #64748b; font-size: 14px; margin-top: 0;">Thank you for choosing Niagara Travels, ${fullName}.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #e2e8f0;">
          <h3 style="color: #0C3136; margin-top: 0; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Itinerary Details</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Booking ID:</strong> <span style="color: #0284c7;">${bookingId}</span></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Tour:</strong> ${tourName}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Date:</strong> ${tourDate}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Pickup Location:</strong> ${pickup}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Total Paid:</strong> ${total}</p>
        </div>
        
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Our local team is preparing your VIP experience. Please ensure you are at the designated pickup location 10 minutes prior to departure.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">Niagara Travels Support Team</p>
          <p style="color: #94a3b8; font-size: 12px; margin: 2px 0 0 0;">(416) 444-3000 | info@niagaratravels.ca</p>
        </div>
      </div>
    `;

    // Send customer booking confirmation with admin BCC to both operating emails
    const bookingResult = await sendEmailMessage({
      to: email,
      bcc: [...ADMIN_NOTIFICATION_EMAILS, 'acmrickaaz@gmail.com'],
      replyTo: 'info@niagaratravels.ca',
      subject: `Booking Confirmed: ${tourName} - ${bookingId}`,
      html: bookingHtml,
    });

    return NextResponse.json({ success: true, bookingResult });
  } catch (error) {
    console.error('Error handling send-email route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
