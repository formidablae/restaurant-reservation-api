export interface IUser {
    name: string;
    email: string;
    password: string;
    // role?: 'superadmin' | 'restaurant_owner' | 'generic_user';
    createdAt?: Date;
    updatedAt?: Date;
}
