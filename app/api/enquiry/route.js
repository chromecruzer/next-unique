import connectMongo from "@/utils/connectMongo";
import mongoose from "mongoose";
import enquiryModel from '@/models/enquiryModel';

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body, 'end point hit');

        const { name, email, message } = body;
        const enquiryBody = { name, email, message };

        await connectMongo();
        await enquiryModel.create(enquiryBody);

        return new Response(JSON.stringify({ message: 'Enquiry has been sent successfully!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err._message }), {   // use message or _message to view logs of mongo db 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
}
