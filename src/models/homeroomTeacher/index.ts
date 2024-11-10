import mongoose, { SchemaTypes } from "mongoose";
import { DbCollections } from "@/config";
import { HomeroomTeacher } from "@/graphql/homeroomTeachers/type";

const schema = new mongoose.Schema<HomeroomTeacher>({
    classId: {
        type: SchemaTypes.ObjectId,
        ref: DbCollections.Classses,
        required: true
    },
    schoolYearId: {
        type: SchemaTypes.ObjectId,
        ref: DbCollections.SchoolYears,
        required: true
    },
    teacherId: {
        type: SchemaTypes.ObjectId,
        ref: DbCollections.Teachers,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


const HomeroomTeacherModel = mongoose.model(DbCollections.HomeRoomTeachers, schema);

export default HomeroomTeacherModel;