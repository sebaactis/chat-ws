import z from 'zod';

const registerValidation = z.object({
    username: z.string().min(3).max(25),
    password: z.string().min(3),
    confPassword: z.string().min(3)
})

export default registerValidation;