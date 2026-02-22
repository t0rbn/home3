import Logger from "@/utils/Logger";

export async function GET() {
    const ls = new Logger("restart action")
    ls.log("restarting app")
    process.exit()
}