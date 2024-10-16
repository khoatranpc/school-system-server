import mongoose from "mongoose";
import { Teacher } from "@/graphql/teachers/type";
import { Degree } from "@/config/interface";
import { DbCollections } from "@/config";

const teacherSchema = new mongoose.Schema<Teacher>({
    code: {
        type: String,
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: DbCollections.Users,
        required: true
    },
    teacherPositionsId: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: DbCollections.TeacherPositions
    },
    degrees: [{
        type: {
            type: String,
            enum: Degree
        },
        school: String,
        major: String,
        year: Number,
        isGraduated: {
            type: Boolean,
            default: true
        }
    }]
}, { timestamps: true });

const TeacherModel = mongoose.model(DbCollections.Teachers, teacherSchema);

export default TeacherModel;