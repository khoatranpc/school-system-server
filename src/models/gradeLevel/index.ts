import { DbCollections } from "@/config";
import { GradeLevel } from "@/graphql/gradeLevels/type";
import mongoose from "mongoose";

const gradeLevelSchema = new mongoose.Schema<GradeLevel>({
    des: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    level: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const GradeLevelModel = mongoose.model(DbCollections.GradeLevel, gradeLevelSchema);

export default GradeLevelModel;