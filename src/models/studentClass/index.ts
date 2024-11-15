import mongoose, { SchemaTypes } from "mongoose";
import { DbCollections } from "@/config";
import { TypeStudentInClass } from "@/config/interface";

export interface StudentClass {
    studentId: any;
    classId: any;
    isActive: boolean;
    isDeleted: boolean;
    note: string;
    type: TypeStudentInClass;
    startDate: Date;
    endDate: Date;
}
const studentClassSchema = new mongoose.Schema<StudentClass>({
    classId: {
        type: SchemaTypes.ObjectId,
        ref: DbCollections.Classes,
        required: true
    },
    studentId: {
        type: SchemaTypes.ObjectId,
        ref: DbCollections.Students,
        required: true
    },
    endDate: Date,
    startDate: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    note: String,
    type: {
        type: String,
        enum: TypeStudentInClass,
        default: TypeStudentInClass.Promoted
    },
}, { timestamps: true });

const StudentClassModel = mongoose.model(DbCollections.StudentClasses, studentClassSchema);

export default StudentClassModel;