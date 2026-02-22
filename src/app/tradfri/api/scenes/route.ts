import {getTradfriService} from "@/app/tradfri/api/getTradfriService";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    return Response.json(await getTradfriService().getScenes())
}

export async function POST(req: NextRequest) {
    const id = Number.parseInt(await req.text())
    if (isNaN(id)) {
        return NextResponse.json(null, {status: 400})
    }
    await getTradfriService().activateScene(id)
    return NextResponse.json(null, {status: 200})
}