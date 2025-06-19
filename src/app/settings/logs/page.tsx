import LogService from "@/services/LogService";

export default function LogsPage() {
    return <pre>{LogService.getLiveLog().join('\n')}</pre>
}