import {TradfriScene} from "@/types/Tradfri";
import Logger from "@/utils/Logger";

const logger = new Logger('SceneActivationTracker')

const activationCounts = new Map<number, number>()
let lastActivatedSceneId: number | undefined = undefined

export function recordActivation(sceneId: number): void {
    const newCount = (activationCounts.get(sceneId) ?? 0) + 1
    activationCounts.set(sceneId, newCount)
    lastActivatedSceneId = sceneId
    logger.log(`recorded activation of scene ${sceneId} (count: ${newCount})`)
}

export function orderScenes(scenes: Array<TradfriScene>): Array<TradfriScene> {
    const ordered = [...scenes].sort((a, b) => {
        const countDiff = (activationCounts.get(b.id) ?? 0) - (activationCounts.get(a.id) ?? 0)
        if (countDiff !== 0) {
            return countDiff
        }
        return a.name.localeCompare(b.name)
    })

    if (lastActivatedSceneId !== undefined) {
        const lastIndex = ordered.findIndex(s => s.id === lastActivatedSceneId)
        if (lastIndex !== -1) {
            const [lastActivated] = ordered.splice(lastIndex, 1)
            ordered.push(lastActivated)
        }
    }

    return ordered
}
