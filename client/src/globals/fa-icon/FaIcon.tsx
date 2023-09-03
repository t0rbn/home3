import {classNames} from "../../utils";

interface FaIconProps {
    icon: string
    className?: string,
}
export default function FaIcon(props: FaIconProps) {
    return <i className={classNames("fas",  `fa-${props.icon}`, props.className)}></i>
}