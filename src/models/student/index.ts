import mongoose, { Types } from "mongoose";
import { Student } from "@/graphql/students/type";
import { DbCollections } from "@/config";

const studentSchema = new mongoose.Schema<Student>({
    code: {
        type: String,
        unique: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Types.ObjectId,
        ref: DbCollections.Users,
        required: true,
        unique: true
    },
}, { timestamps: true });

const StudentModel = mongoose.model(DbCollections.Students, studentSchema);

export default StudentModel;