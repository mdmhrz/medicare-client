

export default function CommonProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
            Common protected layout
            {children}</>
    );
}
