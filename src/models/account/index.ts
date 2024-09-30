import mongoose from "mongoose";
import { Account } from "@/graphql/accounts/type";
import { DbCollections } from "@/config";

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
    }
}, { timestamps: true });

const AccountModel = mongoose.model(DbCollections.Accounts, accountSchema);
export default AccountModel;