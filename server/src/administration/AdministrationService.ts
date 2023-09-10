import Logger from "../utils/Logger";

export default class AdministratoinService {
    private logger;

    constructor() {
        this.logger = new Logger("AdministrationService")
    }

    public restartApp() {
        this.logger.warn("restarting application")
        process.exit()
    }
}