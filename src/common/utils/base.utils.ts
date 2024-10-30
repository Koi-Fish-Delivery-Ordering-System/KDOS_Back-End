import {
    existsSync,
    promises as fsPromises
} from "fs"

export const makeDirectoryIfNotExisted = async (directory: string) => {
    if (!existsSync(directory)) {
        await fsPromises.mkdir(directory, { recursive: true })
    }
}

export const provinces = [
    { province: "Hà Nội" },
    { province: "Hải Phòng" },
    { province: "Quảng Ninh" },
    { province: "Thanh Hóa" },
    { province: "Nghệ An" },
    { province: "Quảng Bình" },
    { province: "Thừa Thiên Huế" },
    { province: "Đà Nẵng" },
    { province: "Quảng Nam" },
    { province: "Bình Định" },
    { province: "Khánh Hòa" },
    { province: "Gia Lai" },
    { province: "Đắk Lắk" },
    { province: "Lâm Đồng" },
    { province: "Ninh Thuận" },
    { province: "Bình Thuận" },
    { province: "Bà Rịa - Vũng Tàu" },
    { province: "Hồ Chí Minh" },
    { province: "Cần Thơ" },
    { province: "Kiên Giang" },
    { province: "Cà Mau" },
    { province: "Đồng Nai" }
]

export const checkFlightRoute = (fromProvince: string, toProvince: string) : boolean => {
    const fromAirport = provinces.some(airport => airport.province === fromProvince)
    const toAirport = provinces.some(airport => airport.province === toProvince)

    if (!fromAirport || !toAirport || fromProvince === toProvince) {
        return false
    }

    return true
}