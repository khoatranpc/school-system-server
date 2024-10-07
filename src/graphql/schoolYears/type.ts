import { FormatNameSchoolYear } from "@/config/interface";

export interface SchoolYear {
    name?: FormatNameSchoolYear;
    startDate?: Date;
    endDate?: Date;
    isDeleted?: boolean;
    status?: 'ACTIVE' | 'FINISH'
}
export interface SchoolYearInput {
    startDate?: Date;
    endDate?: Date;
    status?: 'ACTIVE' | 'FINISH';
    name?: FormatNameSchoolYear;
}

export interface SchoolYearFilter {
    isDeleted?: boolean;
}