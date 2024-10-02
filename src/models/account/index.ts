import mongoose from "mongoose";
import { DbCollections, Role } from "@/config";
import { Account } from "@/graphql/accounts/type";

const accountSchema = new mongoose.Schema<Account>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Role,
        default: Role.STUDENT
    }
}, { timestamps: true });

const AccountModel = mongoose.model(DbCollections.Accounts, accountSchema);
export default AccountModel;