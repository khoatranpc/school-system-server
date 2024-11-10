import { Degree } from "@/config/interface";

export interface Teacher {
    userId: any;
    isActive: boolean;
    isDeleted: boolean;
    code: string;
    startDate: Date;
    endDate: Date;
    teacherPositionsId: any[];
    degrees: {
        type: Degree;
        school: string;
        major: string;
        year: number;
        isGraduated: boolean;
    }[]
}
export interface CreateTeacherInput {
    startDate: number;
    teacherPositionsId: string[];
    degrees: Degree[];
    name: string;
    email: string;
    phoneNumber: string
    address: string
    identity: string
    dob: Number
}

export interface TeachersFilterInput {
    filter: {
        searchValue?: string;

        code: string;
        startDate: number;
        teacherPositionsId: string[];
        degrees: string[];
        name: string;
        email: string;
        phoneNumber: string;
        address: string;
        identity: string;
        dob: number;
        isActive: boolean;
        isDeleted: boolean;
    }
    pagination: {
        limit?: number;
        page?: number;
    }
}