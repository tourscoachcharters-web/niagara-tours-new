import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend with your hidden API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // 1. Grab the data sent from your CheckoutClient.jsx
    const body = await request.json();
    const { email, fullName, bookingId, tourName, tourDate, pickup, total } = body;

 // 2. Construct and send the email
    const { data, error } = await resend.emails.send({
      from: 'Niagara Tours <bookings@niagaratravels.ca>',
      to: email,
      bcc: 'acmrickaaz@gmail.com', // <-- Added your BCC here!
      subject: `Booking Confirmed: ${tourName} - ${bookingId}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h1 style="color: #0C3136; margin-bottom: 5px;">Your Booking is Confirmed!</h1>
          <p style="color: #64748b; font-size: 14px; margin-top: 0;">Thank you for choosing Niagara Travels, ${fullName}.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0C3136; margin-top: 0;">Itinerary Details</h3>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Tour:</strong> ${tourName}</p>
            <p><strong>Date:</strong> ${tourDate}</p>
            <p><strong>Pickup Location:</strong> ${pickup}</p>
            <p><strong>Total Paid:</strong> ${total}</p>
          </div>
          
          <p style="color: #334155; font-size: 14px; line-height: 1.5;">
            Our local team is preparing your VIP experience. Please ensure you are at the designated pickup location 10 minutes prior to departure.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Niagara Travels Support Team</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">(416) 444-3000 | info@niagaratravels.ca</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}