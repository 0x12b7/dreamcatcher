import { Error as Error0 } from "reliq";
import { Unsafe } from "reliq";

export namespace Logger {
    export type FailureMessage =
        | Error0<any>
        | Unsafe
        | string;
}

export type Logger = {
    logMessage(message: string): Logger;
    logSuccess(message: string): Logger;
    logFailure(message: Logger.FailureMessage): Logger;
};

export const Logger: Logger = (() => {
    let _this: Logger;
    let _logs: Array<string>;

    /** @constructor */ {
        _logs = [];
        return _this = { logMessage, logSuccess, logFailure };
    }

    function logMessage(message: string): Logger {
        _logs.push(`[message]: ${ message }`);
        return _this;
    }

    function logSuccess(message: string): Logger {
        _logs.push(`[success]: ${ message }`);
        return _this;
    }

    function logFailure(message: Logger.FailureMessage): Logger {
        if (typeof message === "string") {
            _logs.push(`[error]: ${ message }`);
            return _this;
        }
        if ("code" in message) {
            _logs.push(`[error]: ${ message.code }: ${ message.message.unlockOr("<<< UNAVAILABLE >>>") }` + message.stack);
            return _this;
        }
        return message
            .parse((instance): instance is Error => {
                return instance instanceof Error;
            })
            .toResult(undefined)
            .map(e => {
                _logs.push(`[error]: ${ e.name }: ${ e.message }`);
                return _this;
            })
            .recover(() => {
                _logs.push(`[error]: ${ message.unwrap() }`);
                return _this;
            })
            .unlock();
    }
})();