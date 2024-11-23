// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Introspection {
    function hasCode(address account)
        internal
        view
        returns (bool) {
        return codeLength(account) != 0;
    }

    function codeLength(address src)
        internal
        view
        returns (uint256) {
        uint256 result;
        assembly {
            result := extcodesize(account)
        }
        return result;
    }

    
    function supportsInterface(address src, bytes4 id)
        internal
        view
        returns (bool) {
        
    }
}