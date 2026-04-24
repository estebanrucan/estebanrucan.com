import './globals.css'

export const metadata = {
    metadataBase: new URL('https://estebanrucan.com'),
    title: 'Neural Interface | Esteban Rucán',
    description: 'Portafolio interactivo de Esteban Rucán — AI Engineer especializado en IA Generativa, Agentes de IA, MLOps y NLP.',
    authors: [{ name: 'Esteban Rucán' }],
    openGraph: {
        title: 'Neural Interface | Esteban Rucán',
        description: 'Portafolio interactivo con estética cyberpunk de Esteban Rucán, AI Engineer.',
        type: 'website',
        locale: 'es_CL',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Neural Interface | Esteban Rucán',
        description: 'Portafolio interactivo de Esteban Rucán, AI Engineer.',
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#050505',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body>{children}</body>
        </html>
    )
}
