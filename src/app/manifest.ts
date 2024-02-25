import {MetadataRoute} from 'next'
import {FAVICON_SIZES} from "@/app/icon";
import scss from "../js-exports.module.scss";

export default function manifest(): MetadataRoute.Manifest {
    const generateIconMetadata = () => {
        return FAVICON_SIZES.map(size => ({
            src: `/icon/${size}`,
            sizes: `${size}x${size}`,
            type: 'image/png',
        }))
    }

    return {
        name: 'home3',
        short_name: 'home3',
        start_url: '/' ,
        display: 'standalone',
        background_color: scss.colorBackground,
        theme_color: scss.colorBackground,
        icons: generateIconMetadata()
    }
}