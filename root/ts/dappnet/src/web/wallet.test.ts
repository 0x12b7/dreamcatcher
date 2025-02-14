import { Wallet } from "@web";

(await (await (await Wallet())
    .expect("Failed to the initialize wallet.")
    .use(0n))
    .expect("Failed to pick the address.")
    .query({
        to: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
        signature: Wallet.SignatureBuilder()
            .name("implementation")
            .external()
            .view()
            .returns("address")
            .build()
            .expect() as Wallet.NonAmbientSignature
    }))
    .expect()
    .parse((response): response is unknown => {
        return true;
    })
    .toResult(undefined)
    .map(response => {
        console.log("RESPONSE_RECEIVED", response);
        return;
    })
    .expect("A response was required but not received.");