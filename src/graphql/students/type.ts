import { AccountInput } from "../accounts/type";
import { UserInput } from "../users/type";

export interface Student {
    code?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    userId?: string | any;
}

export interface StudentInput extends Student, UserInput, AccountInput {
    name: string;
    address: string;
    identity?: string;
    dob?: Date;
}

export interface StudentsFitlerInput {
    filter: {
        name: string;
        phoneNumber: string;
        email: string;
        identity: string;

        // classId, schoolYearId
        classId?: string;
        schoolYearId?: string;
        gradeLevelId?: string;
        isNotInThisClass?: boolean;
    },
    pagination: {
        page: number;
        limit: number;
    }
}