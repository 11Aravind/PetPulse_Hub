import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['order', 'product', 'user', 'system', 'payment'],
        required: true
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
