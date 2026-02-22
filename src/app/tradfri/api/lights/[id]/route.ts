import {NextRequest, NextResponse} from "next/server";
import {getTradfriService} from "@/app/tradfri/api/getTradfriService";

export async function GET(req: NextRequest, ctx: RouteContext<'/tradfri/api/lights/[id]'>) {
    const {id} = await ctx.params
    const numId = Number.parseInt(id)
    if (isNaN(numId)) {
        return NextResponse.json(null, {status: 400, statusText: 'id must be integer'})
    }
    return NextResponse.json(await getTradfriService().getLight(numId))
}

export async function POST(req: NextRequest, ctx: RouteContext<'/tradfri/api/lights/[id]'>) {
    const {id} = await ctx.params
    const numId = Number.parseInt(id)
    if (isNaN(numId)) {
        return NextResponse.json(null, {status: 400, statusText: 'id must be integer'})
    }

    const body = await req.json()

    console.table(body)
    if (body.action === 'brightness') {
        await getTradfriService().setLightBrightness(numId, body.value)
        return NextResponse.json(null, {status: 200})
    }
    if (body.action === 'color') {
        await getTradfriService().setLightColor(numId, body.value)
        return NextResponse.json(null, {status: 200})
    }

    return NextResponse.json(null, {status: 400, statusText: 'unknown action'})

}