import Logger from "@/utils/Logger";
import {connection} from "next/server";

export async function GET() {
    await connection()
    const ls = new Logger("restart action")
    ls.log("restarting app")
    process.exit()
}