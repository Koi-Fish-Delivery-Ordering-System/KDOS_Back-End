import { AuthInput, SystemRoles } from "@common"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateProfileInputData {
    @ApiProperty()
        username : string
    @ApiProperty()
        phone : string
    @ApiProperty()
        email : string
    @ApiProperty() 
        address : string

}

export class UpdateProfileInput implements AuthInput<UpdateProfileInputData>{
    accountId: string
    data: UpdateProfileInputData
}

export class AddRoleInputData {
    @ApiProperty()
        addAccountId : string
    @ApiProperty()
        name : SystemRoles
}

export class AddRoleInput implements AuthInput<AddRoleInputData>{
    accountId: string
    data: AddRoleInputData
}

export class RegisterDriverInputData {
    @ApiProperty()
        currentProvince : string
}

export class RegisterDriverInput implements AuthInput<RegisterDriverInputData>{
    accountId: string
    data: RegisterDriverInputData
}