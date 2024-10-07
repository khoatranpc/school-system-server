export interface SchoolYear {
    startDate?: Date;
    endDate?: Date;
    isDeleted?: boolean;
    status?: 'ACTIVE' | 'FINISH'
}