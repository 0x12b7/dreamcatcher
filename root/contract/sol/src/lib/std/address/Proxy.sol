// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {Introspection} from "../introspection/Introspection.sol";

library Proxy {
    using Introspection for address;

    /// SECURITY The implementation may contain any kind of logic and 
    ///          potentially malicious code. Ensure to check and audit
    ///          the address. 
    function load(address impl)
        internal {
        require(impl.hasCode(), "ERR_CANNOT_LOAD_NON_CONTRACT");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
                case 0 {
                    revert (0, returndatasize())
                }
                default {
                    return (0, returndatasize())
                }
        }
    }
}