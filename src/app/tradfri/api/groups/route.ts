import {getTradfriService} from "@/app/tradfri/api/getTradfriService";

export async function GET() {
    return Response.json(await getTradfriService().getGroups())
}
