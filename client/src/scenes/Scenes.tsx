import {useEffect, useState} from "react";
import {ApiScene} from "../../../shared/types/Scenes";
import {useScenesContext} from "./ScenesContext";

export default function Scenes() {
    const [scenes, setScenes]  = useState<Array<ApiScene>>([]);
    const context = useScenesContext();

    useEffect(() => {
        setScenes(context.scenes)
    }, [context.scenes]);

    if (!scenes.length) {
        return <div>Loading...</div>
    }
    return (<div>
        {scenes.map(s => <button key={s.id} onClick={() => context.activateSceneById(s.id)}>{s.name}</button>)}
    </div>)
}