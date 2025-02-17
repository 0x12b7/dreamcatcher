// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Address {
    function from(bytes32 data)
        internal
        pure
        returns (address) {
        return address(uint160(uint256(data)));
    }

    function hasCode(address source)
        internal
        view
        returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function load(address source)
        internal {
        require(hasCode(source), "ERR_SOURCE_HAS_NO_CODE_TO_RUN");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), source, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
                case 0 {
                    revert(0, returndatasize())
                }
                default {
                    return(0, returndatasize())
                }
        }
    }
}