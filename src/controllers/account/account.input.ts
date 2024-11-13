import { AuthInput, SystemRoles } from "@common"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateProfileInputData {
    @ApiProperty()
        username : string
    @ApiProperty()
        fullName : string
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

export class ChangePasswordInputData {
    @ApiProperty()
        oldPassword: string
    @ApiProperty()
        newPassword: string
}

export class ChangePasswordInput implements AuthInput<ChangePasswordInputData>{
    accountId: string
    data: ChangePasswordInputData
}

export class UpdateAccountRoleInputData {
    @ApiProperty()
        updateAccountRoleId : string
    @ApiProperty()
        roleNames : Array<SystemRoles>
}

export class UpdateAccountRoleInput implements AuthInput<UpdateAccountRoleInputData>{
    accountId: string
    data: UpdateAccountRoleInputData
}