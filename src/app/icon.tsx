import {ImageResponse} from 'next/og'
import {theme} from "@/theme";

export const contentType = 'image/png'

export const FAVICON_SIZES = [16, 32, 48, 64, 128, 256, 512] // sizes to generate icon in

export function generateImageMetadata() {
    return FAVICON_SIZES.map((dimension) => ({
        contentType: 'image/png',
        size: {width: dimension, height: dimension},
        id: `${dimension}`,
    }))
}

// Render PNG Image from SVG (or any other valid JSX), see https://nextjs.org/docs/app/api-reference/functions/image-response
export default function Icon(params: { id: string }) {
    const containerDivStyle = {
        width: params.id + 'px',
        height: params.id + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }

    return new ImageResponse(
        <div style={containerDivStyle}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="100%"
                width="100%"
                viewBox="0 -960 960 960"
                strokeWidth="1%"
                fill={theme.foregroundDefault}
            >
                <defs>
                    <linearGradient id="Gradient1" >
                        <stop id="stop1" offset="0%" stop-color={theme.foregroundDefault}/>
                        <stop id="stop3" offset="100%" stop-color="pink" />
                    </linearGradient>
                </defs>
                <path xmlns="http://www.w3.org/2000/svg" d="M400-240q-33 0-56.5-23.5T320-320v-50q-57-39-88.5-100T200-600q0-117 81.5-198.5T480-880q117 0 198.5 81.5T760-600q0 69-31.5 129.5T640-370v50q0 33-23.5 56.5T560-240H400Zm0 160q-17 0-28.5-11.5T360-120v-40h240v40q0 17-11.5 28.5T560-80H400Z"/>
            </svg>
        </div>,
        {
            width: Number.parseInt(params.id),
            height: Number.parseInt(params.id)
        }
    )
}
