import {getGroups} from "@/actions/tradfri-actions";
import {TradfriPageContent} from "@/app/tradfri/PageContent";

export const metadata = {
    title: 'Groups'
}


export default async function TradfriPage() {
    const groups = await getGroups();
    return <TradfriPageContent groups={groups} />
}