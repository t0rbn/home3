import {NextRequest, NextResponse} from "next/server";
import {getTradfriService} from "@/app/tradfri/api/getTradfriService";

export async function POST(req: NextRequest, ctx: RouteContext<'/tradfri/api/lights/[id]'>) {
    const {id} = await ctx.params
    const numId = Number.parseInt(id)
    if (isNaN(numId)) {
        return NextResponse.json(null, {status: 400, statusText: 'id must be integer'})
    }
    await getTradfriService().togglePlug(numId)
    return NextResponse.json(null, {status: 200})

}