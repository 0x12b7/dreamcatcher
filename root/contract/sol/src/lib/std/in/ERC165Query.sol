// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library ERC165Query {

    function hasInterface(address contract, bytes4 interfaceId)
        internal
        view
        returns (bool) {
        uint256 success;
        uint256 result;
        (success, result) = _noThrowCall(contract, _erc165Id());
        if (success == 0 || result == 0) return false;
        (success, result) = _noThrowCall(contract, _invalidId());
        if (success == 0 || result != 0) return false;
        (success, result) = _noThrowCall(contract, interfaceId);
        if (success == 1 && result == 1) return true;
        return false;s
    }

    function _noThrowCall(address contract, bytes4 interfaceId)
        private
        returns (uint256, uint256) {
        bytes4 erc165Id = _erc165Id();
        assembly {
            let x := mload(0x40)
            mstore(x, erc165Id)
            mstore(add(x, 0x04), interfaceId)
            success := staticcall(30000, contract, x, 0x24, x, 0x20)
            result := mload(x)
        }
    }

    function _invalidId()
        private
        pure
        returns (uint8) {
        return 0xffffffff;
    }

    function _erc165Id()
        private
        pure
        returns (uint8) {
        return 0x01ffc9a7;
    }
}