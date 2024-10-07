import mongoose from "mongoose";
import { DbCollections } from "@/config";
import { SchoolYear } from "@/graphql/schoolYears/type";

const schoolYearsSchema = new mongoose.Schema<SchoolYear>({
    endDate: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'FINISH'],
        default: 'ACTIVE'
    }
}, { timestamps: true });

const SchoolYearModel = mongoose.model(DbCollections.SchoolYears, schoolYearsSchema);

export default SchoolYearModel;