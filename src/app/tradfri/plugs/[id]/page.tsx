import {getGroups} from "@/actions/tradfri-actions";
import {notFound} from "next/navigation";
import {PlugControlPageContent} from "@/app/tradfri/plugs/[id]/PageContent";

async function getPlugById(id: string) {
    const groups = await getGroups()
    return groups?.flatMap((g) => g.plugs).find((p => `${p.id}` === id))
}

export async function generateMetaData({params}: any) {
    const id = (await params).id;
    return {title: (await getPlugById(id))?.name}
}


export default async function PlugControlPage({params}: { params: Promise<any> }) {
    const id = (await params).id;
    const plug = await getPlugById(id)

    if (!plug) {
        return notFound()
    }
    return <PlugControlPageContent plug={plug}/>
}


