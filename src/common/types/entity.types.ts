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

export enum DriverStatus {
    Ready = "ready",
    Idle = "idle",
    Delivering = "delivering"
}

registerEnumType(DriverStatus, {
    name: "DriverStatus",
})

export enum DeliveryStatus {
    PendingPickUp = "pendingPickUp",
    PickedUp = "pickedUp",
    Delivering = "delivering",
    Delivered = "delivered"
}

registerEnumType(DeliveryStatus, {
    name: "DeliveryStatus",
})

export enum PaymentMethod {
    Cash = "cash",
    Banking = "banking"
}

registerEnumType(PaymentMethod, {
    name: "PaymentMethod",
})

export enum OrderStatus {
    Pending = "pending",
    Delivering = "delivering",
    Delivered = "delivered"
}

registerEnumType(OrderStatus, {
    name: "OrderStatus",
})

export enum RouteStatus {
    Pending = "Pending",
    Delivering = "Delivering",
    Delivered = "Completed"
}

registerEnumType(RouteStatus, {
    name: "OrderStatus",
})

export enum ServicePricingType {
    ByVolume = "volume",
    ByAmount = "amount"
}

registerEnumType(ServicePricingType, {
    name: "ServicePricingType",
})