import {hexlify} from "ethers";
import {toUtf8Bytes} from "ethers";
import {toUtf8String} from "ethers";

export function stringToHex(string: string): string {
    return hexlify(toUtf8Bytes(string));
}

export function hexToString(string: string): string {
    return toUtf8String(hexlify(string));
}