// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library UInt256 {
    function from(bytes32 value)
        internal
        pure
        returns (uint256) {
        return uint256(value);
    }
}