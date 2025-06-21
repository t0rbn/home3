import {MetadataRoute} from 'next'
import {FAVICON_SIZES} from "@/app/icon";
import {theme} from "@/theme";

export default function manifest(): MetadataRoute.Manifest {
    const generateIconMetadata = () => {
        return FAVICON_SIZES.map(size => ({
            src: `/icon/${size}`,
            sizes: `${size}x${size}`,
            type: 'image/png'
        }))
    }

    return {
        name: 'home3',
        short_name: 'home3',
        start_url: '/' ,
        display: 'standalone',
        background_color: theme.backgroundDefault,
        theme_color: theme.backgroundDefault,
        icons: generateIconMetadata() as any, // type does not allow multiple purposes
    }
}

