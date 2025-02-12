import { EthereumVirtualMachine } from "./ethereum_virtual_machine.bun";
import { flag } from "reliq";

(await EthereumVirtualMachine("https://polygon.llamarpc.com")
    .expect("Failed to initialize 'EthereumVirtualMachine'.")
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
    .parse((response): response is unknown => {
        return true;
    })
    .toResult(undefined)
    .map(response => {
        console.log("RESPONSE_RECEIVED", response);
        return;
    })
    .expect("A response was required but not received.");