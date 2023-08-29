import {PropsWithChildren} from "react";

export default function AppLayout(props: PropsWithChildren) {
    return <div>
        {props.children}
    </div>
}
