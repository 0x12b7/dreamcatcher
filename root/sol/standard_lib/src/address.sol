// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Address {
    function from(bytes32 data)
        internal
        pure
        returns (address) {
        return address(uint160(uint256(data)));
    }

    function has_code(address source)
        internal
        view
        returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function load_contract(address source)
        internal {
        require(source != zero(), "ERR_INVALID_SOURCE");
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