import type { AsyncResult } from "@root";

import {
    default as Axios
} from "axios";

async function get(url: string): AsyncResult<NetworkResponse, NetworkError> {
    (await Axios.get(url))
}

(await get())
    .and(response => {
        

    })