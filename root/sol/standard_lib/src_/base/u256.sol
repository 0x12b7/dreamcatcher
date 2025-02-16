// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library U256 {
    function from(int256 value)
        internal
        pure
        returns (uint256) {
        if (value < 0) return uint256(-value);
        return uint256(value);
    }
}