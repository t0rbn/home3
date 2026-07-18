import {PropsWithChildren} from "react";
import {Modal} from "@/components/modal/modal";

export default async function DeviceModalLayout(props: PropsWithChildren) {
    return <Modal>
        {props.children}
    </Modal>
}