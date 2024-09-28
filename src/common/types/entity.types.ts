import { registerEnumType } from "@nestjs/graphql"

export enum SystemRoles {
    User = "user",
    Instructor = "instructor",
    Moderator = "moderator",
    Administrator = "administrator",
}

registerEnumType(SystemRoles, {
    name: "SystemRoles",
})