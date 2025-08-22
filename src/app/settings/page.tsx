import {ListLayout} from "@/components/layout/Layouts";
import LogService from "@/services/LogService";
import {Button, MainActionButton} from "@/components/buttons/Buttons";
import {restartApp} from "@/actions/restart-action";

export default function SettingsPage() {
    return <ListLayout>
        <Button onClick={restartApp} label="restart service" icon="refresh" />
        <pre>{LogService.getLiveLog().join('\n')}</pre>
    </ListLayout>
}