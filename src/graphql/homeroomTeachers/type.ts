import { Obj, Pagination } from "@/config/interface";

export interface HomeroomTeacher extends Obj {
    classId: any;
    teacherId: any;
    schoolYearId: any;
    isActive: boolean;
    isDeleted: boolean;
}

export interface FilterHomeroomTeacher {
    searchValue: string;
    classId: string;
    schoolYearId: string;
}

export interface FindHomeRoomTeacher {
    filter: FilterHomeroomTeacher,
    pagination: Pagination
}

export interface SaveHomeRoomTeacher {
    teacherId: string;
    classId: string;
    schoolYearId: string;
    isActive: boolean;
    isDeleted: boolean;
}