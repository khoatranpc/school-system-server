import { Role } from "@/config";

export interface User {
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    identity?: string;
    dob?: Date;
    isDeleted?: boolean;
    accountId?: string;
    role?: Role;
    gender?: string;
}
export interface UserInput {
    name?: string;
    address?: string;
    isDeleted?: boolean;
    role?: Role;
    identity?: string;
    dob?: Date;
    gender?: string;
}

export interface GetOneUser {
    [k: string]: any;
}