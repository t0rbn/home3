"use server"

import {getLight} from "@/actions/tradfri-actions";
import {notFound} from "next/navigation";
import {LightControlPageContent} from "@/app/tradfri/lights/[id]/PageContent";

export async function generateMetadata({params}: any) {
    const id = (await params).id;
    const light = await getLight(id)
    return {title: light?.name}
}

export default async function LightControlPage({params}: { params: Promise<any> }) {
    const id = (await params).id;
    const light = await getLight(Number.parseInt(id))

    if (!light) {
        return notFound()
    }

    return <LightControlPageContent light={light}/>

}