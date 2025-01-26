import * as Reliq from "reliq";

export type Logger = {
    logMessage(message: string): Logger;
    logSuccess(message: string): Logger;
    logFailure(message: string): Logger;
    logFailure(e: Reliq.Error<any> | Reliq.Unsafe): Logger;
};

export const Logger: Logger = (() => {
    let _logs: Array<string>;

    /** @constructor */ {
        return {};
    }

    function logMessage(message: string): Logger {

    }
})();