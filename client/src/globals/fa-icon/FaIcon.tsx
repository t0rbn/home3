interface FaIconProps {
    icon: string
}
export default function FaIcon(props: FaIconProps) {
    return <i className={"fas fa-" + props.icon}></i>
}