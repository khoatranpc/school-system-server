export interface GradeLevel {
    level?: number;
    name?: string,
    des?: string,
    isActive?: boolean,
    isDeleted?: boolean
}
export interface GradeLevelInput {
    level?: number;
    name?: string,
    des?: string,
}