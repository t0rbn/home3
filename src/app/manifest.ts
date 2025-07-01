import {MetadataRoute} from 'next'
import {theme} from "@/theme";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'home3',
        short_name: 'home3',
        display: 'standalone',

        start_url: '/',
        scope: '/',

        background_color: theme.backgroundDefault,
        theme_color: theme.backgroundDefault,
        icons: [
            {
                src: `/icon.svg`,
                type: 'image/svg',
                sizes: 'any',
                purpose: "any"
            }
        ]
    }
}

