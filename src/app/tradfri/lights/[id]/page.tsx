import {notFound} from "next/navigation";
import {LightControlPageContent} from "@/app/tradfri/lights/[id]/PageContent";
import {Metadata} from "next";
import {TradfriApiLight} from "@/types/Tradfri";
import {apiUrl} from "@/utils/apiUrl";

export async function generateMetadata({params}: any): Promise<Metadata> {
    const id = Number.parseInt((await params).id);
    const light: TradfriApiLight = await fetch(apiUrl(`/tradfri/api/lights/${id}`)).then(res => res.json())
    return {title: light?.name || 'Light'}
}

export default async function LightControlPage({params}: { params: Promise<any> }) {
    const id = (await params).id;
    const light: TradfriApiLight = await fetch(apiUrl(`/tradfri/api/lights/${id}`)).then(res => res.json())

    if (!light) {
        return notFound()
    }

    return <LightControlPageContent light={light}/>
}

