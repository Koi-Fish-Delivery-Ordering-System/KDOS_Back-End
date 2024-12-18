import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class SignInInput {
    @ApiProperty()
        username: string
    @ApiProperty()
        password: string
}

export class SignUpInput {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: "youremail@gmail.com", description: "Email" })
        email: string

    @MinLength(8)
    @ApiProperty({ description: "Password" })
        password: string

    @IsNotEmpty()
    @ApiProperty({ example: "sample123", description: "User Login Name" })
        username: string

    @IsNotEmpty()
    @ApiProperty({ example: "sample123", description: "User's Full Name" })
        fullName: string

    @IsNotEmpty()
    @ApiProperty({ example: "84903304720", description: "User's Phone Number" })
        phone: string

}