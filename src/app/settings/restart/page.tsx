import {Button, MainActionButton} from "@/components/buttons/Buttons";
import {restartApp} from "@/actions/restart-action";

export default  function RestartPage() {
    return <div>
        <MainActionButton onClick={restartApp} label="restart service" icon="refresh" />
    </div>
}