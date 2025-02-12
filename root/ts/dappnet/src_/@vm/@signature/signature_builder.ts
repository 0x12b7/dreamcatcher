import type { Signature } from "./signature";
import type { Data } from "../data.s_mod/data";
import type { Result } from "reliq";
import type { Option } from "reliq";
import { Selector } from "./selector";
import { EventSignature } from "./event_signature";
import { ExternalSignature } from "./external_signature";
import { ExternalPureSignature } from "./external_pure_signature";
import { ExternalViewSignature } from "./external_view_signature";
import { Some } from "reliq";
import { None } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";

type Result$0<T1, T2> = Result<T1, T2>;

export type SignatureBuilder = {
    name(name: string): SignatureBuilder;
    event(): SignatureBuilder;
    external(): SignatureBuilder;
    pure(): SignatureBuilder;
    view(): SignatureBuilder;
    payload(...data: Array<Data>): SignatureBuilder;
    returns(...data: Array<Data>): SignatureBuilder;
    build(): SignatureBuilder.Result<Signature>;
};

export function SignatureBuilder(): SignatureBuilder {
    let _this: SignatureBuilder;
    let _name: Option<string>;
    let _type: Option<"event" | "external">;
    let _visibility: Option<"pure" | "view">;
    let _payload: Option<Array<Data>>;
    let _returns: Option<Array<Data>>;
    
    /***/ {
        _this = {
            name,
            event,
            external,
            pure,
            view,
            payload,
            returns,
            build
        };
        _name = None;
        _type = None;
        _visibility = None;
        _payload = None;
        _returns = None;
        return _this;
    }

    function name(name: string): SignatureBuilder {
        _name = Some(name);
        return _this;
    }

    function event(): SignatureBuilder {
        _type = Some<"event">("event");
        return _this;
    }

    function external(): SignatureBuilder {
        _type = Some<"external">("external");
        return _this;
    }

    function pure(): SignatureBuilder {
        _visibility = Some<"pure">("pure");
        return _this;
    }

    function view(): SignatureBuilder {
        _visibility = Some<"view">("view");
        return _this;
    }

    function payload(...data: Array<Data>): SignatureBuilder {
        _payload = Some(data);
        return _this;
    }

    function returns(...data: Array<Data>): SignatureBuilder {
        _returns = Some(data);
        return _this;
    }

    function build(): SignatureBuilder.Result<Signature> {
        if (_name.none()) return Err("SIGNATURE_BUILDER.ERR_MISSING_NAME");
        let name: string = _name.unwrap();
        if (_type.none()) return Err("SIGNATURE_BUILDER.ERR_MISSING_TYPE");
        let type: "event" | "external" = _type.unwrap();
        if (type === "event") {
            let selector: Selector = Selector.from(name, ..._payload.unwrapOr([]));
            let signature: EventSignature = EventSignature.from(selector);
            return Ok(signature);
        }
        if (type === "external") {
            let selector: Selector = Selector.from(name, ..._payload.unwrapOr([]));
            if (_visibility.none()) {
                let signature: ExternalSignature = ExternalSignature.from(selector);
                return Ok(signature);
            }
            let visibility: "pure" | "view" = _visibility.unwrap();
            if (visibility === "pure") {
                let signature: ExternalPureSignature = ExternalPureSignature.from(selector, ..._returns.unwrapOr([]));
                return Ok(signature);
            }
            if (visibility === "view") {
                let signature: ExternalViewSignature = ExternalViewSignature.from(selector, ..._returns.unwrapOr([]));
                return Ok(signature);
            }
        }
        return Err("SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE");
    }
}

export namespace SignatureBuilder {
    export type Result<T1> = Result$0<T1, ErrorCode>;

    export type ErrorCode =
        | "SIGNATURE_BUILDER.ERR_MISSING_NAME"
        | "SIGNATURE_BUILDER.ERR_MISSING_TYPE"
        | "SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE";
}