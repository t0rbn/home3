import {TradfriPageContent} from "@/app/tradfri/PageContent";
import {apiUrl} from "@/utils/apiUrl";
import {TradfriApiGroup} from "@/types/Tradfri";

export const metadata = {
    title: 'Groups'
}

export default async function TradfriPage() {
    const groups: Array<TradfriApiGroup> = await fetch(apiUrl('/tradfri/api/groups')).then(res => res.json())
    return <TradfriPageContent groups={groups}/>
}