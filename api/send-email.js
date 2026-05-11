import { Resend } from 'resend';

// We use process.env so your key stays hidden on the server!
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Grab the booking data sent from your React frontend
    const { email, fullName, bookingId, tourName, tourDate, pickup, total } = req.body;

    const data = await resend.emails.send({
      from: 'Niagara Vista Tours <onboarding@resend.dev>',
      // ⚠️ IMPORTANT: Because you are on the Resend free tier, 'onboarding@resend.dev' 
      // can ONLY send emails to your verified Resend account email. 
      // Once you add a real domain (like info@niagaravistatours.com) to Resend, 
      // you can change this 'to' field to just the customer's `email` variable.
      to: 'tourscoachcharters@gmail.com', 
      subject: `Booking Confirmed: ${tourName}`,
      html: `
        <div style="font-family: sans-serif; max-w-xl; margin: 0 auto;">
          <h2 style="color: #0C3136;">Booking Confirmed!</h2>
          <p>Hi ${fullName},</p>
          <p>Thank you for booking with Niagara Vista Tours. Your reservation for <strong>${tourName}</strong> is confirmed.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${tourDate}</p>
            <p style="margin: 5px 0;"><strong>Pickup:</strong> ${pickup}</p>
            <p style="margin: 5px 0;"><strong>Total Paid:</strong> ${total}</p>
          </div>
          
          <p>Customer Email Provided: ${email}</p>
          <p>We look forward to seeing you!</p>
        </div>
      `
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    res.status(400).json({ error: error.message });
  }
}