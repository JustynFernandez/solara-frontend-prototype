import { z } from "zod";
export const requestHelpSchema = z.object({
    whatNeeded: z
        .string()
        .min(3, "Please describe what you need (at least 3 characters)")
        .max(200, "Please keep it under 200 characters"),
    whenNeeded: z
        .string()
        .min(2, "Please specify when you need help")
        .max(100, "Please keep it under 100 characters"),
    description: z
        .string()
        .min(10, "Please provide more details (at least 10 characters)")
        .max(1000, "Please keep it under 1000 characters"),
    contactMethod: z
        .string()
        .min(5, "Please provide a valid contact method")
        .refine((val) => val.includes("@") || /^\+?[\d\s\-()]+$/.test(val), "Please enter a valid email or phone number"),
});
export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be under 50 characters"),
    location: z.string().min(1, "Please select a location"),
    bio: z.string().max(500, "Bio must be under 500 characters").optional(),
    roles: z.array(z.string()).min(1, "Please select at least one role"),
    skills: z.array(z.string()).optional(),
});
/**
 * Validate a single field against a schema
 */
export function validateField(schema, fieldName, value) {
    const fieldSchema = schema.shape[fieldName];
    if (!fieldSchema)
        return null;
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
        return result.error.issues?.[0]?.message || "Invalid value";
    }
    return null;
}
/**
 * Get disabled reason based on missing required fields
 */
export function getDisabledReason(fields, requiredFields) {
    const missing = requiredFields.filter((field) => !fields[field]?.trim());
    if (missing.length === 0)
        return "";
    const fieldLabels = {
        whatNeeded: "what you need",
        whenNeeded: "when you need it",
        description: "description",
        contactMethod: "contact method",
        email: "email",
        password: "password",
        name: "name",
        location: "location",
    };
    const labels = missing.map((f) => fieldLabels[f] || f);
    return `Please fill in: ${labels.join(", ")}`;
}
