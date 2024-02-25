import {redirect, RedirectType} from "next/navigation";

export default function Home() {
    redirect("/scenes", RedirectType.replace)
}
