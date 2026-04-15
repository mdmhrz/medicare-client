'use client'

import React from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createDoctorZodSchema } from '@/zod/doctor.validation'
import { createDoctor } from '@/services/doctor.services'
import { getSpecialties, Specialty } from '@/services/specialty.services'
import AppField from '@/components/shared/form/AppField'
import AppSubmitButton from '@/components/shared/form/AppSubmitButton'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Gender, IDoctor } from '@/types/doctor.types'
import { Lock, User, Mail, Image, Phone, MapPin, FileText, Briefcase, DollarSign, GraduationCap, Building2, Badge } from 'lucide-react'
import { toast } from 'sonner'
import { updateDoctor } from '@/services/doctor.services'


interface CreateDoctorFormProps {
    onSuccess: () => void
    doctor?: IDoctor | null
}

export default function CreateDoctorForm({ onSuccess, doctor }: CreateDoctorFormProps) {
    const queryClient = useQueryClient()
    const isEditMode = !!doctor

    // Fetch specialties for dropdown
    const { data: specialtiesResponse, isPending: isSpecialtiesLoading } = useQuery({
        queryKey: ['specialties'],
        queryFn: () => getSpecialties(),
        staleTime: 5 * 60 * 1000
    })

    const specialties = Array.isArray(specialtiesResponse) ? specialtiesResponse : specialtiesResponse?.data || []

    const { mutateAsync, isPending } = useMutation({
        mutationFn: isEditMode
            ? (payload: any) => updateDoctor(doctor!.id.toString(), payload as any)
            : (payload: any) => createDoctor(payload as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
            onSuccess()
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || `Failed to ${isEditMode ? 'update' : 'create'} doctor`
            toast.error(errorMessage)
        }
    })

    const form = useForm({
        defaultValues: {
            password: '',
            doctor: {
                name: doctor?.name || '',
                email: doctor?.email || '',
                profilePhoto: doctor?.profilePhoto || '',
                contactNumber: doctor?.contactNumber || '',
                address: doctor?.address || '',
                registrationNumber: doctor?.registrationNumber || '',
                experience: doctor?.experience?.toString() || '',
                gender: doctor?.gender || '',
                appointmentFee: doctor?.appointmentFee?.toString() || '',
                qualification: doctor?.qualification || '',
                currentWorkingPlace: doctor?.currentWorkingPlace || '',
                designation: doctor?.designation || '',
            },
            specialties: doctor?.specialties?.map((s: any) => s.specialtyId) || [] as string[],
        },
        onSubmit: async ({ value }) => {
            if (isEditMode) {
                // Update payload structure
                const payload = {
                    doctor: {
                        name: value.doctor.name,
                        profilePhoto: value.doctor.profilePhoto || undefined,
                        contactNumber: value.doctor.contactNumber || undefined,
                        address: value.doctor.address || undefined,
                        registrationNumber: value.doctor.registrationNumber || undefined,
                        experience: value.doctor.experience ? Number(value.doctor.experience) : undefined,
                        gender: value.doctor.gender as Gender | undefined,
                        appointmentFee: value.doctor.appointmentFee ? Number(value.doctor.appointmentFee) : undefined,
                        qualification: value.doctor.qualification || undefined,
                        currentWorkingPlace: value.doctor.currentWorkingPlace || undefined,
                        designation: value.doctor.designation || undefined,
                    },
                    specialties: value.specialties.map((specialtyId: string) => ({
                        specialtyId,
                        shouldDelete: false
                    }))
                }
                await mutateAsync(payload)
            } else {
                // Create payload structure
                const payload = {
                    ...value,
                    doctor: {
                        ...value.doctor,
                        experience: Number(value.doctor.experience) || 0,
                        appointmentFee: Number(value.doctor.appointmentFee) || 0,
                        gender: value.doctor.gender as Gender | undefined,
                    }
                }
                await mutateAsync(payload)
            }
        }
    })

    return (
        <form
            method='POST'
            action="#"
            noValidate
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
            {/* Password - only show in create mode */}
            {!isEditMode && (
                <form.Field
                    name='password'
                    validators={{ onChange: createDoctorZodSchema.shape.password }}
                >
                    {(field) => (
                        <AppField
                            field={field}
                            label='Password'
                            type='password'
                            placeholder='Enter password'
                            prepend={<Lock className="h-4 w-4 text-muted-foreground" />}
                            required
                        />
                    )}
                </form.Field>
            )}

            {/* Doctor Name */}
            <form.Field
                name='doctor.name'
                validators={{ onChange: createDoctorZodSchema.shape.doctor.shape.name }}
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Name'
                        type='text'
                        placeholder='Dr. John Doe'
                        prepend={<User className="h-4 w-4 text-muted-foreground" />}
                        required
                    />
                )}
            </form.Field>

            {/* Email */}
            <form.Field
                name='doctor.email'
                validators={{ onChange: createDoctorZodSchema.shape.doctor.shape.email }}
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Email'
                        type='email'
                        placeholder='doctor@example.com'
                        prepend={<Mail className="h-4 w-4 text-muted-foreground" />}
                        required
                    />
                )}
            </form.Field>

            {/* Contact Number */}
            <form.Field
                name='doctor.contactNumber'
                validators={{ onChange: createDoctorZodSchema.shape.doctor.shape.contactNumber }}
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Contact Number'
                        type='text'
                        placeholder='+8801612345678'
                        prepend={<Phone className="h-4 w-4 text-muted-foreground" />}
                        required
                    />
                )}
            </form.Field>

            {/* Profile Photo */}
            <form.Field
                name='doctor.profilePhoto'
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Profile Photo'
                        type='text'
                        placeholder='https://example.com/photo.jpg'
                        prepend={<Image className="h-4 w-4 text-muted-foreground" />}
                    />
                )}
            </form.Field>

            {/* Address */}
            <form.Field
                name='doctor.address'
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Address'
                        type='text'
                        placeholder='City, Country'
                        prepend={<MapPin className="h-4 w-4 text-muted-foreground" />}
                    />
                )}
            </form.Field>

            {/* Registration Number */}
            <form.Field
                name='doctor.registrationNumber'
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Registration Number'
                        type='text'
                        placeholder='BMDC-12345'
                        prepend={<FileText className="h-4 w-4 text-muted-foreground" />}
                    />
                )}
            </form.Field>

            {/* Experience */}
            <form.Field
                name='doctor.experience'
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Experience (years)'
                        type='number'
                        placeholder='5'
                        prepend={<Briefcase className="h-4 w-4 text-muted-foreground" />}
                    />
                )}
            </form.Field>

            {/* Gender */}
            <form.Field
                name='doctor.gender'
            >
                {(field) => (
                    <div className="space-y-1.5 w-full">
                        <Label htmlFor={field.name} className="font-medium">
                            Gender
                        </Label>
                        <Select
                            value={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
                        >
                            <SelectTrigger className="h-11">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Select gender" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={Gender.MALE}>Male</SelectItem>
                                <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                <SelectItem value={Gender.OTHER}>Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {field.state.meta.errors.length > 0 && field.state.meta.isTouched && (
                            <p className="text-sm text-destructive">
                                {String(field.state.meta.errors[0])}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            {/* Appointment Fee */}
            <form.Field
                name='doctor.appointmentFee'
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Appointment Fee'
                        type='number'
                        placeholder='2000'
                        prepend={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                        required
                    />
                )}
            </form.Field>

            {/* Qualification */}
            <form.Field
                name='doctor.qualification'
                validators={{ onChange: createDoctorZodSchema.shape.doctor.shape.qualification }}
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Qualification'
                        type='text'
                        placeholder='MBBS, MD (Cardiology)'
                        prepend={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
                        required
                    />
                )}
            </form.Field>

            {/* Designation */}
            <form.Field
                name='doctor.designation'
                validators={{ onChange: createDoctorZodSchema.shape.doctor.shape.designation }}
            >
                {(field) => (
                    <AppField
                        field={field}
                        label='Designation'
                        type='text'
                        placeholder='Cardiologist'
                        prepend={<Badge className="h-4 w-4 text-muted-foreground" />}
                        required
                    />
                )}
            </form.Field>

            {/* Current Working Place */}
            <form.Field
                name='doctor.currentWorkingPlace'
                validators={{ onChange: createDoctorZodSchema.shape.doctor.shape.currentWorkingPlace }}
            >
                {(field) => (
                    <div className="md:col-span-2">
                        <AppField
                            field={field}
                            label='Current Working Place'
                            type='text'
                            placeholder='Hospital Name'
                            prepend={<Building2 className="h-4 w-4 text-muted-foreground" />}
                            required
                        />
                    </div>
                )}
            </form.Field>

            {/* Specialties */}
            <form.Field
                name='specialties'
                validators={{ onChange: createDoctorZodSchema.shape.specialties }}
            >
                {(field) => (
                    <div className="space-y-1.5 md:col-span-2">
                        <Label className="font-medium">
                            Specialties <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-3 data-table-wrapper">
                            {isSpecialtiesLoading ? (
                                <div className="text-sm text-muted-foreground">Loading...</div>
                            ) : specialties.length === 0 ? (
                                <div className="text-sm text-muted-foreground">No specialties available</div>
                            ) : (
                                specialties.map((specialty: Specialty) => (
                                    <div key={specialty.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`specialty-${specialty.id}`}
                                            checked={field.state.value.includes(specialty.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    field.handleChange([...field.state.value, specialty.id])
                                                } else {
                                                    field.handleChange(field.state.value.filter((id: string) => id !== specialty.id))
                                                }
                                            }}
                                        />
                                        <Label
                                            htmlFor={`specialty-${specialty.id}`}
                                            className="text-sm cursor-pointer flex-1"
                                        >
                                            {specialty.title}
                                        </Label>
                                    </div>
                                ))
                            )}
                        </div>
                        {field.state.meta.errors.length > 0 && field.state.meta.isTouched && (
                            <p className="text-sm text-destructive">
                                {typeof field.state.meta.errors[0] === 'string'
                                    ? field.state.meta.errors[0]
                                    : 'At least one specialty is required'}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            {/* Submit Button */}
            <form.Subscribe
                selector={(s) => {
                    const value = s.values as any
                    const isFormValid = isEditMode ? !!(
                        value.doctor?.name &&
                        value.doctor?.email &&
                        value.doctor?.contactNumber &&
                        value.doctor?.appointmentFee &&
                        value.doctor?.qualification &&
                        value.doctor?.currentWorkingPlace &&
                        value.doctor?.designation &&
                        value.specialties &&
                        value.specialties.length > 0
                    ) : !!(
                        value.password &&
                        value.doctor?.name &&
                        value.doctor?.email &&
                        value.doctor?.contactNumber &&
                        value.doctor?.appointmentFee &&
                        value.doctor?.qualification &&
                        value.doctor?.currentWorkingPlace &&
                        value.doctor?.designation &&
                        value.specialties &&
                        value.specialties.length > 0
                    )
                    return [s.canSubmit, s.isSubmitting, isFormValid] as const
                }}
            >
                {([canSubmit, isSubmitting, isFormValid]) => (
                    <div className="md:col-span-2">
                        <AppSubmitButton
                            className='w-full h-11 font-medium'
                            disabled={!isFormValid || isSubmitting || isPending}
                            isPending={isSubmitting}
                            pendingLabel={isEditMode ? 'Updating...' : 'Creating...'}
                        >
                            {isEditMode ? 'Update Doctor' : 'Create Doctor'}
                        </AppSubmitButton>
                    </div>
                )}
            </form.Subscribe>
        </form>
    )
}
