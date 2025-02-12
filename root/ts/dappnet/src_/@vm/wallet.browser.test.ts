import { Wallet } from "./wallet.browser";

let { SignatureBuilder } = Wallet;
/// When created will prompt the user to sign in to their metamask.
(await (await Wallet())
    .expect()
    .use(0n) /// Pick which user account to make the transaction with, defaults to first.
    .query({
        to: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
        signature: 
            SignatureBuilder()
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
    .expect();