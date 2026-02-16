import LogService from "@/services/LogService";

export async function GET() {
    const ls = new LogService("restart action")
    ls.log("restarting app")
    process.exit()
}