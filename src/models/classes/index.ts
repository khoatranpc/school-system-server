import mongoose from "mongoose";
import { DbCollections } from "@/config";
import { Class } from "@/graphql/classes/type";

const classSchema = new mongoose.Schema<Class>({
    gradeLevelId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: DbCollections.GradeLevel
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    schoolYearId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: DbCollections.SchoolYears
    },
}, { timestamps: true });


const ClassModel = mongoose.model(DbCollections.Classes, classSchema);

export default ClassModel;
