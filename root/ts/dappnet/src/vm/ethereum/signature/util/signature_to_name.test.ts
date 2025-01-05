import type { EventSignature } from "@core.vm.ethereum";
import type { ExternalPureSignature } from "@core.vm.ethereum";
import type { ExternalViewSignature } from "@core.vm.ethereum";
import type { ExternalSignature } from "@core.vm.ethereum";
import { signatureToName } from "@core.vm.ethereum";
import { panic } from "reliq";

/** @script */
let eventSignature: EventSignature = "event SomeEvent(uint256, address)";
let externalPureSignature: ExternalPureSignature = "function someFunction(uint256) external pure returns (address)";
let externalViewSignature: ExternalViewSignature = "function someFunction(uint256) external view returns (address)";
let externalSignature: ExternalSignature = "function someFunction(uint256) external";

let result0: string = signatureToName(eventSignature);
let result1: string = signatureToName(externalPureSignature);
let result2: string = signatureToName(externalViewSignature);
let result3: string = signatureToName(externalSignature);

if (result0 !== "SomeEvent") panic("ERR_SIGNATURE_TO_NAME_FAILED_TO_PARSE_EVENT_SIGNATURE");
if (result1 !== "someFunction") panic("ERR_SIGNATURE_TO_NAME_FAILED_TO_PARSE_EXTERNAL_PURE_SIGNATURE");
if (result2 !== "someFunction") panic("ERR_SIGNATURE_TO_NAME_FAILED_TO_PARSE_EXTERNAL_VIEW_SIGNATURE");
if (result3 !== "someFunction") panic("ERR_SIGNATURE_TO_NAME_FAILED_TO_PARSE_EXTERNAL_SIGNATURE");