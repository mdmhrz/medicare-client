import { z } from "zod";
import { Gender } from "@/types/doctor.types";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
    doctor: z.object({
        name: z.string("Name is required").min(5, "Name must be at least 5 characters long").max(30, "Name must be at most 30 characters long"),
        email: z.string("Email is required").email("Invalid email format"),
        profilePhoto: z.string("Profile photo must be a string").optional(),
        contactNumber: z.string("Contact number is required").min(11, "Contact number must be at least 11 characters long").max(14, "Contact number must be at most 14 characters long"),
        address: z.string("Address must be a string").max(100, "Address must be at most 100 characters long").optional(),
        registrationNumber: z.string("Registration number must be a string").optional(),
        experience: z.coerce.number("Experience must be a number").int("Experience must be an integer").nonnegative("Experience must be non-negative").optional(),
        gender: z.nativeEnum(Gender, "Gender must be one of MALE, FEMALE, OTHER").optional(),
        appointmentFee: z.coerce.number("Appointment fee must be a number").nonnegative("Appointment fee must be non-negative"),
        qualification: z.string("Qualification is required").min(5, "Qualification must be at least 5 characters long").max(50, "Qualification must be at most 50 characters long"),
        currentWorkingPlace: z.string("Current working place is required").min(5, "Current working place must be at least 5 characters long").max(50, "Current working place must be at most 50 characters long"),
        designation: z.string("Designation is required").min(5, "Designation must be at least 5 characters long").max(50, "Designation must be at most 50 characters long"),
    }),
    specialties: z.array(z.string("Specialty must be a valid UUID")).min(1, "At least one specialty is required"),
});

export const updateDoctorZodSchema = z.object({
    doctor: z.object({
        name: z.string("Name must be string").min(5, "Name must be at least 5 characters").max(30, "Name must be at most 30 characters").optional(),
        profilePhoto: z.string("Profile photo must be a string").optional(),
        contactNumber: z.string("Contact number must be string").min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 14 characters").optional(),
        address: z.string("Address must be string").min(10, "Address must be at least 10 characters").max(100, "Address must be at most 100 characters").optional(),
        registrationNumber: z.string("Registration number must be string").optional(),
        experience: z.coerce.number("Experience must be a number").int("Experience must be an integer").nonnegative("Experience cannot be negative").optional(),
        gender: z.nativeEnum(Gender, "Gender must be one of MALE, FEMALE, OTHER").optional(),
        appointmentFee: z.coerce.number("Appointment fee must be a number").nonnegative("Appointment fee cannot be negative").optional(),
        qualification: z.string("Qualification must be string").min(2, "Qualification must be at least 2 characters").max(50, "Qualification must be at most 50 characters").optional(),
        currentWorkingPlace: z.string("Current working place must be string").min(2, "Current working place must be at least 2 characters").max(50, "Current working place must be at most 50 characters").optional(),
        designation: z.string("Designation must be string").min(2, "Designation must be at least 2 characters").max(50, "Designation must be at most 50 characters").optional(),
    }).optional(),
    specialties: z.array(z.object({
        specialtyId: z.string("Specialty ID must be a valid UUID"),
        shouldDelete: z.boolean("shouldDelete must be a boolean").optional(),
    })).optional()
});

export type ICreateDoctorPayload = z.infer<typeof createDoctorZodSchema>;
export type IUpdateDoctorPayload = z.infer<typeof updateDoctorZodSchema>;
