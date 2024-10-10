import { registerEnumType } from "@nestjs/graphql"

export enum SystemRoles {
    User = "user",
    Delivery = "delivery",
    Manager = "manager",
    HealthCare = "healthcare",
}

registerEnumType(SystemRoles, {
    name: "SystemRoles",
})

export enum FishGender {
    Male = "male",
    Female = "female"
}

registerEnumType(FishGender, {
    name: "FishGender",
})

export enum TransportType {
    Road = "road",
    Air = "air",
}

registerEnumType(TransportType, {
    name: "TransportType",
})
