import connectMongo from '../../../../utils/connectMongo';
import postModel from '../../../../models/postModel';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
    const { id } = params;

    try {
        // Connect to MongoDB
        await connectMongo();

        // Find the post by ID
        const post = await postModel.findOne({ _id: id });

        // Check if the post exists
        if (!post) {
            return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        // Return the post data
        return new Response(JSON.stringify(post), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        // Handle any errors that occurred
        return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    } finally {
        // Disconnect from MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    }
}
