import mongoose, { Types } from "mongoose";
import { DbCollections, Role } from "@/config";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: String,
    dob: Date,
    name: {
        type: String,
        required: true
    },
    identity: String,
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: Role,
        default: Role.STUDENT
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    accountId: {
        type: Types.ObjectId,
        ref: DbCollections.Users
    }
}, { timestamps: true });

const UserModel = mongoose.model(DbCollections.Users, userSchema);
export default UserModel;