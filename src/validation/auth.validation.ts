import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(11, { message: "Phone number is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    bio: z
      .string()
      .max(500, { message: "Bio cannot exceed 500 characters." })
      .optional(),
    role: z.enum(["user", "host"], { message: "Please select a role." }),
    interests: z.array(z.string()).optional(),
    profileImg: z.string().optional(),
    // Password Fields
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const adminFormSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    profileImg: z.string().optional(),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(1, { message: "Contact number is required." }),
    role: z.enum(["admin", "superadmin"], {
      message: "Role must be Admin or SuperAdmin.",
    }),

    // Password fields for creation only
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AdminFormValues = z.infer<typeof adminFormSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
