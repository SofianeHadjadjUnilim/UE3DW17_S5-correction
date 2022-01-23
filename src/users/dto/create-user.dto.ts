export class CreateUserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
