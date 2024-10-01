
export interface Account {
    _id: string;
    email: string;
    phoneNumber: string;
    password: string;
    isDeleted: Boolean;
}
export interface AccountInput {
    _id?: string;
    email: string;
    phoneNumber: string;
    password: string;
}
export interface AuthenticatedInput {
    identifier: string;
    password: string
}