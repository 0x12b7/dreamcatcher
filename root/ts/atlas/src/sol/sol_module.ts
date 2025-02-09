import { Tracker } from "@root";
import { Compiler } from "solion";

type SolMod = {

};

function SolMod(_dir: string) {
    let _tracker: Tracker;

    {
        let tracker: Tracker.Result<Tracker> = Tracker(_dir);
        if (tracker.err()) return tracker;
        _tracker = tracker.unwrap();

    }

    function track() {
        Compiler.compile({""})
    }
}

namespace SolMod {

    export type Error =
        | Tracker.Error;
}

export { SolMod };


/// lookup config file and then build


