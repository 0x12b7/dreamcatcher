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
    let this_: Logger;
    let logs_: Array<string>;

    /** @constructor */ {
        logs_ = [];
        return this_ = { logMessage, logSuccess, logFailure };
    }

    function logMessage(message: string): Logger {
        logs_.push(`[message]: ${ message }`);
        return this_;
    }

    function logSuccess(message: string): Logger {
        logs_.push(`[success]: ${ message }`);
        return this_;
    }

    function logFailure(message: Logger.FailureMessage): Logger {
        if (typeof message === "string") {
            logs_.push(`[error]: ${ message }`);
            return this_;
        }
        if ("code" in message) {
            logs_.push(`[error]: ${ message.code }: ${ message.message.unwrapOr("<<< UNAVAILABLE >>>") }` + message.stack);
            return this_;
        }
        return message
            .parse((instance): instance is Error => {
                return instance instanceof Error;
            })
            .toResult(undefined)
            .map(e => {
                logs_.push(`[error]: ${ e.name }: ${ e.message }`);
                return this_;
            })
            .recover(() => {
                logs_.push(`[error]: ${ message.inspect() }`);
                return this_;
            })
            .unwrap();
    }
})();