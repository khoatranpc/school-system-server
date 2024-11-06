import { ObjectId } from "mongoose";

export interface Class {
    gradeLevelId?: string | ObjectId;
    name?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    schoolYearId?: string | ObjectId;
    _id?: string | ObjectId;
}

export interface ClassFilterInput {
    gradeLevelId?: string;
    name?: string;
    isActive?: string;
    isDeleted?: boolean;
    schoolYearId?: string;
    limit?: number;
    page?: number;
}

export interface CreateListClass {
    classes: Class[];
}

export interface DetailClassInput {
    classId: string;
}