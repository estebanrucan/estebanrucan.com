import './globals.css'

export const metadata = {
    title: 'Neural Interface | Esteban Rucán',
    description: 'Neural Interface Portfolio',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}
