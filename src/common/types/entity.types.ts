import { registerEnumType } from "@nestjs/graphql"

export enum SystemRoles {
    Customer = "customer",
    Delivery = "delivery",
    Manager = "manager"
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
    Wallet = "wallet",
    Vnpay = "vnpay"
}

registerEnumType(PaymentMethod, {
    name: "PaymentMethod",
})

export enum OrderStatus {
    UnCompleted = "uncompleted",
    Processing = "processing",
    PendingPickUp = "pendingPickUp",
    Delivering = "delivering",
    Completed = "completed",
    Canceled = "canceled"
}

registerEnumType(OrderStatus, {
    name: "OrderStatus",
})

export enum RouteStatus {
    Pending = "pending",
    Delivering = "delivering",
    Completed = "completed"
}

registerEnumType(RouteStatus, {
    name: "RouteStatus",
})

export enum ServicePricingType {
    ByVolume = "volume",
    ByAmount = "amount"
}

registerEnumType(ServicePricingType, {
    name: "ServicePricingType",
})

export enum StopType {
    PickUp = "pickup",
    Delivery = "delivery"
}

registerEnumType(StopType, {
    name: "StopType",
})

export enum TransactionType {
    TopUp = "topUp",
    Pay = "pay",
    UseWallet = "useWallet",
    Refund = "refund"
}

registerEnumType(StopType, {
    name: "StopType",
})

export enum TransactionStatus {
    NotCompleted = "notCompleted",
    Failed = "failed",
    Success = "success"
}

registerEnumType(TransactionStatus, {
    name: "PaymentStatus",
})

