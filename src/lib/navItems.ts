import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard"
                },
                {
                    title: "Profile",
                    href: "/my-profile",
                    icon: "User"
                }
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Lock"
                },
            ]
        }
    ];
};

export const doctorNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "My Patients",
                href: "/doctor/dashboard/patients",
                icon: "Users"
            },
            {
                title: "Appointments",
                href: "/doctor/dashboard/appointments",
                icon: "CalendarDays"
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText"
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock"
            },
            {
                title: "My Reviews",
                href: "/doctor/dashboard/my-reviews",
                icon: "Star"
            }
        ]
    }
];

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "ShieldCheck"
            },
            {
                title: "Doctors",
                href: "/admin/dashboard/doctors-management",
                icon: "Stethoscope"
            },
            {
                title: "Patients",
                href: "/admin/dashboard/patients-management",
                icon: "Users"
            }
        ]
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "CalendarCheck"
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock"
            },
            {
                title: "Specialties",
                href: "/admin/dashboard/specialties-management",
                icon: "BuildingHospital"
            },
            {
                title: "Doctor Schedules",
                href: "/admin/dashboard/doctor-schedules-management",
                icon: "CalendarClock"
            },
            {
                title: "Doctor Specialties",
                href: "/admin/dashboard/doctor-specialties-management",
                icon: "Stethoscope"
            },
            {
                title: "Payments",
                href: "/admin/dashboard/payments-management",
                icon: "CreditCard"
            },
            {
                title: "Prescriptions",
                href: "/admin/dashboard/prescriptions-management",
                icon: "FileText"
            },
            {
                title: "Reviews",
                href: "/admin/dashboard/reviews-management",
                icon: "Star"
            }
        ]
    }
];

export const patientNavItems: NavSection[] = [
    {
        title: "Appointments",
        items: [
            {
                title: "My Appointments",
                href: "/dashboard/my-appointments",
                icon: "CalendarDays"
            },
            {
                title: "Book Appointment",
                href: "/dashboard/book-appointment",
                icon: "CalendarPlus"
            }
        ]
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText"
            },
            {
                title: "My Reviews",
                href: "/dashboard/my-reviews",
                icon: "Star"
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "HeartPulse"
            }
        ]
    }
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonItems = getCommonNavItems(role);

    switch (role) {
        case "DOCTOR":
            return [...commonItems, ...doctorNavItems];
        case "ADMIN":
        case "SUPER_ADMIN":
            return [...commonItems, ...adminNavItems];
        case "PATIENT":
            return [...commonItems, ...patientNavItems];
        default:
            return commonItems;
    }
};