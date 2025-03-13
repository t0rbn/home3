import {PropsWithChildren} from "react";
import {BackButton} from "@/features/navigation/back-button/BackButton";
import {Section} from "@/components/containers/section/Section";

export default function WithBackButtonLayout(props: PropsWithChildren) {
    return <>
        <Section level="primary"><BackButton/></Section>
        {props.children}
    </>

}