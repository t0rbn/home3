import {AppNavigation} from "@/components/navigation/AppNavigation";
import {connection} from "next/server";

export default async function MenuPage() {
    await connection();
    return <AppNavigation />
}