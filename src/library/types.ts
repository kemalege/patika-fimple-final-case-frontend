import { z } from "zod"

export type TLoginSchema = z.infer<typeof loginSchema>

export const loginSchema = z.object({
    userName: z.string().trim().min(1, { message: "Kullanıcı adı boş bırakılamaz" }) ,
    password: z.string().min(1, { message: "Parola boş bırakılamaz" }) 
  
})

export type TNewApplicationSchema = z.infer<typeof newApplicationSchema>

export const newApplicationSchema = z.object({
    firstName: z.string().min(1, { message: "Ad boş bırakılamaz" }),
    lastName: z.string().min(1, { message: "Soyad boş bırakılamaz" }),
    age: z.coerce.number().min(1, { message: "Lütfen yaşınınız giriniz" }),
    identity: z.string().min(11, { message: "Lütfen geçerli bir TC kimlik numarası giriniz" }).max(11, { message: "Lütfen geçerli bir TC kimlik numarası giriniz" }),
    address: z.string().min(3, { message: "Adres boş bırakılamaz." }),
    applicationReason: z.string().min(1, { message: "Başvuru nedeni boş bırakılamaz" }),
})

export type TSearchApplicationByCode = z.infer<typeof searchApplicationByCode>

export const searchApplicationByCode = z.object({
    code: z.string().trim().min(1, { message: "Lütfen bir kod giriniz" }) ,
})

export type TAddNewAnswerToApplication = z.infer<typeof addNewAnswerToApplication>

export const addNewAnswerToApplication = z.object({
    newAnswer: z.string().trim().min(1, { message: "Boş cevap girilemez" }) ,
})