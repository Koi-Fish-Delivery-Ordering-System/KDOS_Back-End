import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const createOrderSchema: SchemaObject = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                fromAddress: {
                    type: "string"
                },
                toAddress: {
                    type: "string",
                },
                fromProvince: {
                    type: "string"
                },
                toProvince: {
                    type: "string",
                },
                transportServiceId: {
                    type: "string",
                },
                receiverName: {
                    type: "string",
                },
                receiverPhone: {
                    type: "string",
                },
                totalPrice: {
                    type: "number"
                },
                notes: {
                    type: "string",
                },
                fishes:{
                    type: "array",
                    items:{
                        type: "object",
                        properties:{
                            name: {
                                type: "string",
                            },
                            gender: {
                                type: "string",
                            },
                            species: {
                                type: "string",
                            },
                            ageInMonth: {
                                type: "number",
                            },
                            weight: {
                                type: "number",
                            },
                            length:{
                                type: "number",
                            },
                            description: {
                                type: "number",
                            },
                            fishImageUrl: {
                                type: "string",
                            },
                            qualifications : {
                                type: "array",
                                items:{
                                    type: "string",
                                }
                            }
                        }
                    }
                },
                paymentMethod : {
                    type: "string",
                },
                servicePricingType :{
                    type: "string",
                },
                additionalServiceIds:{
                    type: "array",
                    items:{
                        type: "string"
                    }
                }
            },
        }
    }
}