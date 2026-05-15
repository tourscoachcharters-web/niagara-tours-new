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
      // Once your domain is verified in Resend, update this "from" address:
      from: 'Niagara Travels <info@niagaratravels.ca>',
      
      // We put an array here so it sends a copy to the customer AND a copy to you!
      to: [email, 'tourscoachcharters@gmail.com'], 
      
      subject: `Booking Confirmed: ${tourName} - ${bookingId}`,
      html: `
        <div style="font-family: sans-serif; max-w-xl; margin: 0 auto;">
          <h2 style="color: #0C3136;">Booking Confirmed!</h2>
          <p>Hi ${fullName},</p>
          <p>Thank you for booking with Niagara Travels. Your reservation for <strong>${tourName}</strong> is confirmed.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${tourDate}</p>
            <p style="margin: 5px 0;"><strong>Pickup:</strong> ${pickup}</p>
            <p style="margin: 5px 0;"><strong>Total Paid:</strong> ${total}</p>
          </div>
          
          <p>If you have any questions, please reply to this email or call us at (416) 444-3000.</p>
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