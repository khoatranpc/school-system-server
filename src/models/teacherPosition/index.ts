import mongoose from "mongoose";
import { TeacherPosition } from "@/graphql/teacherPositions/type";
import { DbCollections } from "@/config";

const teacherPositionSchema = new mongoose.Schema<TeacherPosition>({
    code: {
        type: String,
        required: true,
        unique: true
    },
    des: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const TeacherPositionModel = mongoose.model(DbCollections.TeacherPositions, teacherPositionSchema);

export default TeacherPositionModel;