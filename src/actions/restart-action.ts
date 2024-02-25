"use server";


import LogService from "@/services/LogService";

export async function restartApp() {
    const ls = new LogService("restart action")
    ls.log("restarting app")
    process.exit()
}