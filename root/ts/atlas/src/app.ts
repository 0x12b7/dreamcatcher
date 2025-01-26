import { Directory } from "@root";
import { execPath } from "process";

(async () => {
    let root: Directory = Directory(execPath).expect("Failed to initialize directory.");
    
})();