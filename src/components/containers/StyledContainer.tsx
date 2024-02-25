import {CSSProperties, PropsWithChildren} from "react";

interface StyledContainerProps {
    className?: string,
    style?: CSSProperties
}

export function StyledContainer(props: PropsWithChildren<StyledContainerProps>) {
    return <div className={props.className} style={props.style}>
        {props.children}
    </div>
}