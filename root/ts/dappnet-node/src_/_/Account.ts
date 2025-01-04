import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Wallet } from "ethers";
import { JsonRpcProvider } from "ethers";

export type Account = {
    address(): Promise<Result<string, unknown>>;
    nonce(): Promise<Result<bigint, unknown>>;
    nextNonce(): Promise<Result<bigint, unknown>>;
};
export function Account(_key: string, _url: string): Ok<Account> | Err<[unknown]> {
    let _wallet: Wallet;
    let _jsonRpcProvider: JsonRpcProvider;
    
    /** @constructor */ {
        let r: Result<void, unknown> = 
            Result.wrap(() => {
                _jsonRpcProvider = new JsonRpcProvider(_url);
                _wallet = new Wallet(_key, _jsonRpcProvider);
            });
        if (r.err()) return Err([r.val()]);
        return Ok({
            address,
            nonce,
            nextNonce
        });
    }

    async function address(): Promise<Ok<string> | Err<unknown>> {
        return await Result.wrapAsync(_wallet.getAddress);
    }

    async function nonce(): Promise<Ok<bigint> | Err<unknown>> {
        let nonce: Awaited<ReturnType<typeof nextNonce>> = await nextNonce();
        if (nonce.err()) return nonce;
        return Ok(nonce.unwrapSafely() - 1n);
    }

    async function nextNonce(): ReturnType<Account["nextNonce"]> {
        return await Result.wrapAsync(async () => BigInt(await _wallet.getNonce()));
    }

    async function query(query: QueryTransaction) {
        let address$: Awaited<ReturnType<typeof address>> = await address();
        if (address$.err()) return address$;
        let nextNonce$: Awaited<ReturnType<typeof nextNonce>> = await nextNonce();
        if (nextNonce$.err()) return nextNonce$;

        return Result.wrap(async () => {
            _wallet.sendTransaction({
                from: address$.unwrapSafely(),
                to: query.to,
                nonce: Number(nextNonce$.unwrapSafely()),
                gasPrice:
            });

                await (await _wallet.sendTransaction({
                from: (await address()).unwrap()
            })).wait(Number(query))
        });
    }
}


export type QueryTransaction = {
    key: string;
    url: string;
    signature: EvmExternalViewSignature;
    args?: Array<unknown>;
};

export type Contract = {
    get(query: QueryTransaction): Promise<Result<unknown, unknown>>;
    send(): Promise<Result<unknown, unknown>>;
};
export function Contract(_address: string): Contract {

    /***/ {
        return {
            query
        };
    }

    function get(...[query]: Parameters<Contract["query"]>): ReturnType<Contract["query"]> {
        
    }

    function mut()
}



let minter: Contract = Contract("");

minter.get({
    key: "",
    url: "",
    to: ""
});

minter.mut({

});