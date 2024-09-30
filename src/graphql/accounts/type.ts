
export interface Account {
    _id: String;
    email: String;
    phoneNumber: String;
    password: String;
    isDeleted: Boolean;
}
export interface AccountInput {
    _id?: String;
    email: String;
    phoneNumber: String;
    password: String;
}