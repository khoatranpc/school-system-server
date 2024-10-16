export interface TeacherPosition {
    code?: string;
    name?: string;
    des?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}

export interface TeacherPositionFilter {
    code?: string;
    name?: string;
    des?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}
export interface CreateTeacherPositionInput {
    code?: string;
    name?: string;
    des?: string;
    isActive?: boolean;
    isDeleted?: boolean;
}