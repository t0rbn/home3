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
                fill={theme.foregroundDefault}
                strokeWidth="1%"
            >
                <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/>
            </svg>
        </div>,
        {
            width: Number.parseInt(params.id),
            height: Number.parseInt(params.id)
        }
    )
}
