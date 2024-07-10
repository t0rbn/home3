import {ImageResponse} from 'next/og'
import scss from "../js-exports.module.scss";

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
        backgroundColor: scss.colorBackground,
        borderRadius: '25%',
        padding: '10%'
    }

    return new ImageResponse(
        <div style={containerDivStyle}>
            <svg
                width="100%" height="100%"
                viewBox="0 0 136.9004 136.90034"
                version="1.1"
                id="svg5">
                <defs id="defs2"/>
                <g id="layer2" transform="translate(102.38933,-83.707662)">
                    <path id="path2901-7"
                          fill={scss.colorText}
                          d="m -33.939107,83.707662 c 1.14401,0 2.28057,0.03086 3.41081,0.08634 a 68.450174,68.450174 0 0 0 -3.41081,-0.08634 z m 0,0 c -3.27687,0 -6.49519,0.244959 -9.6492,0.690184 a 68.450174,68.450174 0 0 1 9.6492,-0.690184 z m -9.6492,0.690184 a 68.450174,68.450174 0 0 0 -0.14929,0.01894 c 0.0495,-0.0071 0.0997,-0.01194 0.14929,-0.01894 z m -0.14929,0.01894 c -3.23757,0.464271 -6.39901,1.159706 -9.47373,2.060525 a 68.450174,68.450174 0 0 1 9.47373,-2.060525 z m -9.47373,2.060525 a 68.450174,68.450174 0 0 0 -0.0218,0.0061 c 0.008,-0.0022 0.0145,-0.004 0.0218,-0.0061 z m -0.0218,0.0061 c -3.13228,0.918815 -6.16877,2.056384 -9.09716,3.393542 a 68.450174,68.450174 0 0 1 9.09716,-3.393542 z m -9.09716,3.393542 a 68.450174,68.450174 0 0 0 -0.0807,0.03621 c 0.0268,-0.01229 0.0539,-0.02395 0.0807,-0.03621 z m -0.0807,0.03621 c -2.91388,1.335114 -5.71579,2.867962 -8.39251,4.582841 a 68.450174,68.450174 0 0 1 8.39251,-4.582841 z m -8.39251,4.582841 a 68.450174,68.450174 0 0 0 -0.26849,0.172123 c 0.0893,-0.05778 0.17897,-0.114761 0.26849,-0.172123 z m -0.26849,0.172123 c -2.62388,1.698319 -5.12265,3.569898 -7.48284,5.601133 a 68.450174,68.450174 0 0 1 7.48284,-5.601133 z m -7.48284,5.601133 a 68.450174,68.450174 0 0 0 -0.39383,0.34148 c 0.13083,-0.11433 0.26213,-0.22812 0.39383,-0.34148 z m -0.39383,0.34148 c -2.32355,2.03054 -4.50698,4.21397 -6.53753,6.53753 a 68.450174,68.450174 0 0 1 6.53753,-6.53753 z m -6.53753,6.53753 a 68.450174,68.450174 0 0 0 -0.34147,0.39383 c 0.11335,-0.1317 0.22713,-0.263 0.34147,-0.39383 z m -0.34147,0.39383 c -2.03125,2.36018 -3.90282,4.85896 -5.60112,7.48283 a 68.450174,68.450174 0 0 1 5.60112,-7.48283 z m -5.60112,7.48283 a 68.450174,68.450174 0 0 0 -0.17213,0.2685 c 0.0573,-0.0896 0.11436,-0.17924 0.17213,-0.2685 z m -0.17213,0.2685 c -1.71488,2.67671 -3.24773,5.47862 -4.58284,8.39251 a 68.450174,68.450174 0 0 1 4.58284,-8.39251 z m -4.58284,8.39251 a 68.450174,68.450174 0 0 0 -0.0362,0.0807 c 0.0123,-0.0268 0.0239,-0.054 0.0362,-0.0807 z m -0.0362,0.0807 c -1.3381,2.93044 -2.47607,5.96923 -3.39522,9.10385 a 68.450174,68.450174 0 0 1 3.39522,-9.10385 z m 65.69166,-39.97273 a 68.450174,68.450174 0 0 1 2.64376,0.194967 c -0.8779,-0.077 -1.75667,-0.151424 -2.64376,-0.194967 z m 2.64376,0.194967 c 0.22728,0.01993 0.45741,0.03021 0.68405,0.05237 a 68.450174,68.450174 0 0 0 -0.68405,-0.05237 z m 0.68405,0.05237 A 68.450174,68.450174 0 0 1 6.6965129,97.079055 C -2.970517,89.935076 -14.581507,85.274687 -27.200477,84.041319 Z M 6.6965129,97.079055 c 0.0508,0.03751 0.10359,0.07255 0.1543,0.110286 a 68.450174,68.450174 0 0 0 -0.1543,-0.110286 z m 0.1543,0.110286 a 68.450174,68.450174 0 0 1 2.2521504,1.757498 c -0.7398,-0.599171 -1.48734,-1.189028 -2.2521504,-1.757498 z m 2.2521504,1.757498 c 0.1348,0.109176 0.27548,0.211236 0.40943,0.321414 a 68.450174,68.450174 0 0 0 -0.40943,-0.321414 z m 0.40943,0.321414 a 68.450174,68.450174 0 0 1 2.1039697,1.814877 c -0.69089,-0.61668 -1.38833,-1.226254 -2.1039697,-1.814877 z m 2.1039697,1.814877 c 0.1412,0.12602 0.28879,0.24493 0.42893,0.37211 a 68.450174,68.450174 0 0 0 -0.42893,-0.37211 z m 0.42893,0.37211 a 68.450174,68.450174 0 0 1 2.41704,2.30116 c -0.78666,-0.78666 -1.59301,-1.55338 -2.41704,-2.30116 z m 2.41704,2.30116 a 68.450174,68.450174 0 0 1 2.30116,2.41704 c -0.74778,-0.82403 -1.5145,-1.63038 -2.30116,-2.41704 z m 2.30116,2.41704 c 0.12718,0.14013 0.24609,0.28772 0.37211,0.42893 a 68.450174,68.450174 0 0 0 -0.37211,-0.42893 z m 0.37211,0.42893 a 68.450174,68.450174 0 0 1 1.81487,2.10397 c -0.58862,-0.71564 -1.1982,-1.41308 -1.81487,-2.10397 z m 1.81487,2.10397 c 0.11018,0.13395 0.21224,0.27463 0.32142,0.40943 a 68.450174,68.450174 0 0 0 -0.32142,-0.40943 z m 0.32142,0.40943 a 68.450174,68.450174 0 0 1 1.75748,2.25215 c -0.56847,-0.76482 -1.15831,-1.51235 -1.75748,-2.25215 z m 1.75748,2.25215 c 0.0377,0.0507 0.0728,0.10348 0.1103,0.1543 a 68.450174,68.450174 0 0 0 -0.1103,-0.1543 z m 0.1103,0.1543 a 68.450174,68.450174 0 0 1 13.03773,33.89699 c -1.23336,-12.61897 -5.89375,-24.22997 -13.03773,-33.89699 z m 13.03773,33.89699 c 0.0222,0.22664 0.0324,0.45676 0.0524,0.68405 a 68.450174,68.450174 0 0 0 -0.0524,-0.68405 z m 0.0524,0.68405 a 68.450174,68.450174 0 0 1 0.19497,2.64375 c -0.0435,-0.88708 -0.11797,-1.76586 -0.19497,-2.64375 z m 0.19497,2.64375 c 0.0555,1.13024 0.0863,2.2668 0.0863,3.4108 a 68.450174,68.450174 0 0 0 -0.0863,-3.4108 z m 0.0863,3.4108 c 0,1.14402 -0.0308,2.28057 -0.0863,3.41082 a 68.450174,68.450174 0 0 0 0.0863,-3.41082 z m -0.0863,3.41082 a 68.450174,68.450174 0 0 1 -0.19497,2.64376 c 0.077,-0.8779 0.15142,-1.75667 0.19497,-2.64376 z m -0.19497,2.64376 c -0.0199,0.22727 -0.0302,0.45741 -0.0524,0.68405 a 68.450174,68.450174 0 0 0 0.0524,-0.68405 z m -0.0524,0.68405 a 68.450174,68.450174 0 0 1 -13.03773,33.89699 c 7.14398,-9.66703 11.80437,-21.27803 13.03773,-33.89699 z m -13.03773,33.89699 c -0.0375,0.0508 -0.0727,0.10359 -0.1103,0.15429 a 68.450174,68.450174 0 0 0 0.1103,-0.15429 z m -0.1103,0.15429 a 68.450174,68.450174 0 0 1 -1.75748,2.25216 c 0.59917,-0.73981 1.18901,-1.48733 1.75748,-2.25216 z m -1.75748,2.25216 c -0.10918,0.13479 -0.21124,0.27548 -0.32142,0.40942 a 68.450174,68.450174 0 0 0 0.32142,-0.40942 z m -0.32142,0.40942 a 68.450174,68.450174 0 0 1 -1.81487,2.10398 c 0.61667,-0.69089 1.22625,-1.38833 1.81487,-2.10398 z m -1.81487,2.10398 c -0.12602,0.14119 -0.24493,0.28878 -0.37211,0.42893 a 68.450174,68.450174 0 0 0 0.37211,-0.42893 z m -0.37211,0.42893 a 68.450174,68.450174 0 0 1 -2.30116,2.41703 c 0.78666,-0.78666 1.55338,-1.59301 2.30116,-2.41703 z m -2.30116,2.41703 a 68.450174,68.450174 0 0 1 -2.41704,2.30117 c 0.82403,-0.74779 1.63038,-1.51451 2.41704,-2.30117 z m -2.41704,2.30117 c -0.14014,0.12718 -0.28773,0.24609 -0.42893,0.37211 a 68.450174,68.450174 0 0 0 0.42893,-0.37211 z m -0.42893,0.37211 a 68.450174,68.450174 0 0 1 -2.1039697,1.81487 c 0.7156397,-0.58862 1.4130797,-1.19819 2.1039697,-1.81487 z m -2.1039697,1.81487 c -0.13395,0.11018 -0.27463,0.21224 -0.40943,0.32141 a 68.450174,68.450174 0 0 0 0.40943,-0.32141 z m -0.40943,0.32141 a 68.450174,68.450174 0 0 1 -2.2521504,1.75749 c 0.7648104,-0.56847 1.5123504,-1.15832 2.2521504,-1.75749 z m -2.2521504,1.75749 c -0.0507,0.0377 -0.10348,0.0728 -0.1543,0.1103 a 68.450174,68.450174 0 0 0 0.1543,-0.1103 z m -0.1543,0.1103 a 68.450174,68.450174 0 0 1 -33.8969899,13.03773 c 12.61897,-1.23337 24.22996,-5.89376 33.8969899,-13.03773 z m -33.8969899,13.03773 c -0.22664,0.0222 -0.45677,0.0324 -0.68405,0.0524 a 68.450174,68.450174 0 0 0 0.68405,-0.0524 z m -0.68405,0.0524 a 68.450174,68.450174 0 0 1 -2.64376,0.19497 c 0.88709,-0.0436 1.76586,-0.11798 2.64376,-0.19497 z m -2.64376,0.19497 c -1.13025,0.0555 -2.2668,0.0863 -3.41081,0.0863 a 68.450174,68.450174 0 0 0 3.41081,-0.0863 z m -3.41081,0.0863 a 68.450174,68.450174 0 0 1 -9.6492,-0.69018 c 3.15401,0.44523 6.37233,0.69018 9.6492,0.69018 z m -9.6492,-0.69018 c -0.0496,-0.008 -0.0997,-0.0119 -0.14929,-0.019 a 68.450174,68.450174 0 0 0 0.14929,0.019 z m -0.14929,-0.019 a 68.450174,68.450174 0 0 1 -9.47373,-2.06053 c 3.07472,0.90083 6.23616,1.59626 9.47373,2.06053 z m -9.47373,-2.06053 c -0.008,-0.002 -0.0146,-0.004 -0.0218,-0.006 a 68.450174,68.450174 0 0 0 0.0218,0.006 z m -0.0218,-0.006 a 68.450174,68.450174 0 0 1 -9.09716,-3.39354 c 2.92838,1.33716 5.96488,2.47473 9.09716,3.39354 z m -9.09716,-3.39354 c -0.0268,-0.0123 -0.054,-0.0239 -0.0807,-0.0362 a 68.450174,68.450174 0 0 0 0.0807,0.0362 z m -0.0807,-0.0362 a 68.450174,68.450174 0 0 1 -8.39251,-4.58284 c 2.67672,1.71488 5.47862,3.24773 8.39251,4.58284 z m -8.39251,-4.58284 c -0.0896,-0.0574 -0.17924,-0.11436 -0.2685,-0.17213 a 68.450174,68.450174 0 0 0 0.2685,0.17213 z m -0.2685,-0.17213 a 68.450174,68.450174 0 0 1 -7.48283,-5.60113 c 2.36019,2.03125 4.85896,3.90282 7.48283,5.60113 z m -7.48283,-5.60113 c -0.13151,-0.11317 -0.26264,-0.22675 -0.39328,-0.34091 a 68.450174,68.450174 0 0 0 0.39328,0.34091 z m -0.39328,-0.34091 a 68.450174,68.450174 0 0 1 -6.54198,-6.54254 c 2.03181,2.32541 4.21672,4.51055 6.54198,6.54254 z m -6.54198,-6.54254 c -0.11172,-0.12786 -0.22288,-0.25622 -0.33367,-0.38492 a 68.450174,68.450174 0 0 0 0.33367,0.38492 z m -0.33367,-0.38492 a 68.450174,68.450174 0 0 1 -5.60503,-7.4873 c 1.69939,2.62554 3.57229,5.1258 5.60503,7.4873 z m -5.60503,-7.4873 c -0.0578,-0.0893 -0.11477,-0.17896 -0.17212,-0.2685 a 68.450174,68.450174 0 0 0 0.17212,0.2685 z m -0.17212,-0.2685 a 68.450174,68.450174 0 0 1 -4.58285,-8.39249 c 1.33512,2.91388 2.86797,5.71579 4.58285,8.39249 z m -4.58285,-8.39249 c -0.0123,-0.0269 -0.0239,-0.0539 -0.0362,-0.0807 a 68.450174,68.450174 0 0 0 0.0362,0.0807 z m -0.0362,-0.0807 a 68.450174,68.450174 0 0 1 -3.39521,-9.10386 c 0.91915,3.13462 2.05712,6.17341 3.39521,9.10386 z m 52.58264,-81.582605 a 2.2818988,2.2818988 0 0 0 -1.66112,0.890731 l -41.36645,54.097804 a 2.2818988,2.2818988 0 0 0 0.19775,2.99803 l 15.91043,15.91043 a 2.2818988,2.2818988 0 0 0 3.22754,0 l 14.29722,-14.29554 12.68511,12.68289 -14.29777,14.29777 a 2.2818988,2.2818988 0 0 0 0,3.22754 l 15.91044,15.90988 a 2.2818988,2.2818988 0 0 0 2.99803,0.19831 l 54.09781,-41.36646 a 2.2818988,2.2818988 0 0 0 0.22728,-3.42808 l -60.4621,-60.459854 a 2.2818988,2.2818988 0 0 0 -1.76417,-0.663451 z m 0.38102,5.733155 56.77555,56.77553 -50.44079,38.57063 -12.88454,-12.88455 14.29721,-14.29777 a 2.2818988,2.2818988 0 0 0 0,-3.22531 l -15.90986,-15.91043 a 2.2818988,2.2818988 0 0 0 -3.22588,0 l -14.29722,14.29555 -12.88509,-12.88511 z m -56.3611,28.17777 c -0.902003,3.07731 -1.598063,6.2416 -2.062763,9.48208 a 68.450174,68.450174 0 0 1 2.062763,-9.48208 z m -2.062763,9.48208 a 68.450174,68.450174 0 0 0 -0.019,0.14929 c 0.006,-0.0496 0.0119,-0.0998 0.019,-0.14929 z m -0.019,0.14929 c -0.44521,3.15402 -0.69018,6.37232 -0.69018,9.64919 a 68.450174,68.450174 0 0 1 0.69018,-9.64919 z m -0.69018,9.64919 c 0,3.27688 0.24497,6.49519 0.69018,9.64921 a 68.450174,68.450174 0 0 1 -0.69018,-9.64921 z m 0.69018,9.64921 a 68.450174,68.450174 0 0 0 0.019,0.14929 c -0.008,-0.0495 -0.012,-0.0997 -0.019,-0.14929 z m 0.019,0.14929 c 0.4647,3.24048 1.16076,6.40477 2.062763,9.48208 a 68.450174,68.450174 0 0 1 -2.062763,-9.48208 z"/>
                </g>
            </svg>
        </div>,
        {
            width: Number.parseInt(params.id),
            height:
                Number.parseInt(params.id)
        }
    )
}
