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
    { province: "Hà Nội", airport: "Nội Bài" },
    { province: "Hải Phòng", airport: "Cát Bi" },
    { province: "Quảng Ninh", airport: "Vân Đồn" },
    { province: "Thanh Hóa", airport: "Thọ Xuân" },
    { province: "Nghệ An", airport: "Vinh" },
    { province: "Quảng Bình", airport: "Đồng Hới" },
    { province: "Thừa Thiên Huế", airport: "Phú Bài" },
    { province: "Đà Nẵng", airport: "Đà Nẵng" },
    { province: "Quảng Nam", airport: "Chu Lai" },
    { province: "Bình Định", airport: "Phù Cát" },
    { province: "Khánh Hòa", airport: "Cam Ranh" },
    { province: "Gia Lai", airport: "Pleiku" },
    { province: "Đắk Lắk", airport: "Buôn Ma Thuột" },
    { province: "Lâm Đồng", airport: "Liên Khương" },
    { province: "Ninh Thuận", airport: "Thành Sơn" },
    { province: "Bình Thuận", airport: "Phan Thiết" }, 
    { province: "Bà Rịa - Vũng Tàu", airport: "Côn Đảo" },
    { province: "Hồ Chí Minh", airport: "Tân Sơn Nhất" },
    { province: "Cần Thơ", airport: "Cần Thơ" },
    { province: "Kiên Giang", airport: "Rạch Giá" },
    { province: "Cà Mau", airport: "Cà Mau" },
    { province: "Đồng Nai", airport: "Long Thành" } 
]

export const checkFlightRoute = (fromProvince: string, toProvince: string) : boolean => {
    const fromAirport = provinces.some(airport => airport.province === fromProvince)
    const toAirport = provinces.some(airport => airport.province === toProvince)

    if (!fromAirport || !toAirport || fromProvince === toProvince) {
        return false
    }

    return true
}