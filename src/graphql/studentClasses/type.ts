import { Pagination } from "@/config/interface";

export interface StudentClassesFilterInput {
    pagination: Pagination;
    filter: {
        classId: string;
    }
}