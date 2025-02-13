import { EthereumVirtualMachine } from "@bun";
import { flag } from "reliq";

(await EthereumVirtualMachine("https://polygon.llamarpc.com")
    .expect()
    .query({
        privateKey: flag(process.env?.["POLYGON_PRIVATE_KEY"]).expect("A private key is required."),
        to: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
        signature: EthereumVirtualMachine.SignatureBuilder()
            .name("implementation")
            .external()
            .view()
            .returns("address")
            .build()
            .expect() as EthereumVirtualMachine.NonAmbientSignature
    }))
    .expect("Failed to query smart contract.")
    .parse((response): response is string => {
        return typeof response === "string";
    })
    .toResult("ERR_UNRECOGNIZED_TYPE")
    .map(response => {
        console.log("RESPONSE_RECEIVED", response);
        return;
    })
    .expect("A response was required but was either not received or was of an unexpected type.")
