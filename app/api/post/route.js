import connectMongo from '../../../utils/connectMongo';
import postModel from '../../../models/postModel';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectMongo();
        const posts = await postModel.find({});
        return new Response(JSON.stringify(posts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } finally {
        await mongoose.disconnect();
    }
}

export async function POST(request) {
    try {
        await connectMongo();
        const newPost = await request.json();
        const savedPost = await postModel.create(newPost);
        return new Response(JSON.stringify(savedPost), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } finally {
        await mongoose.disconnect();
    }
}
