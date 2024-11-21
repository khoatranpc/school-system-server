import { Pagination } from "@/config/interface";

export interface StudentClassesFilterInput {
    pagination: Pagination;
    filter: {
        classId: string;
    }
}

export interface AddStudentsToClassInput {
    classId: string;
    studentIds: string[];
}

export interface CountStudentInClass {
    classIds: string[];
}