'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDoctorById } from '@/services/doctor.services'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, FileText, Briefcase, DollarSign, GraduationCap, Building2, Calendar, Clock, Star } from 'lucide-react'

interface ViewDoctorProps {
    doctorId: string
}

interface SpecialtyItem {
    id: string
    doctorId: string
    specialtyId: string
    specialty: {
        id: string
        title: string
        description?: string | null
        icon?: string | null
        createdAt: string
        updatedAt: string
        isDeleted?: boolean
        deletedAt?: string | null
    }
}

interface DoctorDetail {
    id: string
    name: string
    email: string
    profilePhoto?: string
    contactNumber?: string
    address?: string
    isDeleted?: boolean
    deletedAt?: string | null
    registrationNumber?: string
    experience?: number
    gender?: string
    appointmentFee?: number
    qualification?: string
    currentWorkingPlace?: string
    designation?: string
    averageRating?: number
    createdAt: string
    updatedAt: string
    userId: string
    user: {
        id: string
        name: string
        email: string
        emailVerified?: boolean
        role: string
        status: string
        needPasswordChange?: boolean
        isDeleted?: boolean
        deletedAt?: string | null
        image?: string | null
        createdAt: string
        updatedAt: string
    }
    specialties: SpecialtyItem[]
    appointments: unknown[]
    doctorSchedules: unknown[]
    reviews: unknown[]
}

export default function ViewDoctor({ doctorId }: ViewDoctorProps) {
    const { data: doctor, isPending, error } = useQuery({
        queryKey: ['doctor', doctorId],
        queryFn: () => getDoctorById(doctorId),
        enabled: !!doctorId
    })

    console.log('ViewDoctor - doctorId:', doctorId)
    console.log('ViewDoctor - isPending:', isPending)
    console.log('ViewDoctor - error:', error)
    console.log('ViewDoctor - doctor:', doctor)

    if (isPending) {
        return <ViewDoctorSkeleton />
    }

    if (error) {
        console.error('Error loading doctor:', error)
        return (
            <div className="p-6 text-center text-destructive">
                Failed to load doctor details
            </div>
        )
    }

    if (!doctor) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                Doctor not found
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                    {doctor.profilePhoto ? (
                        <img
                            src={doctor.profilePhoto}
                            alt={doctor.name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-border"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-12 h-12 text-muted-foreground" />
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-semibold">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.designation}</p>
                    <div className="flex items-center gap-4 text-sm">
                        <Badge variant={doctor.user.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {doctor.user.status}
                        </Badge>
                        {doctor.averageRating !== undefined && doctor.averageRating > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{doctor.averageRating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Email</span>
                        </div>
                        <p className="font-medium">{doctor.email}</p>
                    </CardContent>
                </Card>

                {doctor.contactNumber && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Contact Number</span>
                            </div>
                            <p className="font-medium">{doctor.contactNumber}</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.address && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Address</span>
                            </div>
                            <p className="font-medium">{doctor.address}</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.registrationNumber && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Registration Number</span>
                            </div>
                            <p className="font-medium">{doctor.registrationNumber}</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.experience !== undefined && doctor.experience > 0 && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Experience</span>
                            </div>
                            <p className="font-medium">{doctor.experience} years</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.gender && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Gender</span>
                            </div>
                            <p className="font-medium">{doctor.gender}</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.appointmentFee !== undefined && doctor.appointmentFee > 0 && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Appointment Fee</span>
                            </div>
                            <p className="font-medium">${doctor.appointmentFee}</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.qualification && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Qualification</span>
                            </div>
                            <p className="font-medium">{doctor.qualification}</p>
                        </CardContent>
                    </Card>
                )}

                {doctor.currentWorkingPlace && (
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Current Working Place</span>
                            </div>
                            <p className="font-medium">{doctor.currentWorkingPlace}</p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Specialties */}
            {doctor.specialties && doctor.specialties.length > 0 && (
                <Card>
                    <CardContent className="p-4 space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Specialties
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {doctor.specialties.map((item: SpecialtyItem) => (
                                <Badge key={item.specialty.id} variant="secondary">
                                    {item.specialty.title}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Total Appointments
                        </div>
                        <p className="text-2xl font-bold">{doctor.appointments?.length || 0}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            Scheduled Slots
                        </div>
                        <p className="text-2xl font-bold">{doctor.doctorSchedules?.length || 0}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Member Since
                        </div>
                        <p className="text-lg font-bold">
                            {new Date(doctor.createdAt).toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function ViewDoctorSkeleton() {
    return (
        <div className="space-y-6">
            {/* Profile Header Skeleton */}
            <div className="flex items-start gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                </div>
            </div>

            {/* Details Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 space-y-3">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-5 w-2/3" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Specialties Skeleton */}
            <Card>
                <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-5 w-1/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                </CardContent>
            </Card>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 space-y-2">
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
