import config from "@/config.json"

import {MockTradfriService} from "@/app/tradfri/api/MockTradfriService";
import {TradfriService} from "@/app/tradfri/api/TradfriService";

export function getTradfriService() {
    if (config.tradfri.mock) {
        return MockTradfriService
    }
    return TradfriService
}