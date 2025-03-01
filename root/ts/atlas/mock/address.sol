// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Address {
    function zero()
        internal
        pure
        returns (address) {
        return address(0);
    }

    function from(bytes32 value)
        internal
        pure
        returns (address) {
        return address(uint160(uint256(value)));
    }

    function run(address implementation)
        internal {
        require(implementation != zero(), "ERR_INVALID_IMPLEMENTATION");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)
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