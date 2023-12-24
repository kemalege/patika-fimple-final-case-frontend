import { z } from "zod"

export type TLoginSchema = z.infer<typeof loginSchema>

export const loginSchema = z.object({
    userName: z.string().trim().min(1, { message: "Kullanıcı adı boş bırakılamaz" }) ,
    password: z.string().min(1, { message: "Parola boş bırakılamaz" }) 
  
})