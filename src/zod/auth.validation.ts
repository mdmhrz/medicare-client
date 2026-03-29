import { z } from "zod";
export const loginZodSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" })
    // .refine((value) => {
    //     // Password must contain at least one uppercase letter, one lowercase letter, and one number
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
    // }, {
    //     message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    // }),
});

export type IloginPayload = z.infer<typeof loginZodSchema>;