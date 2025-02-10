// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Bytes32 {
    function from(address value)
        internal
        pure
        returns (bytes32) {
        return bytes32(uint256(uint160(value)));
    }

    function from(uint256 value)
        internal
        pure
        returns (bytes32) {
        return bytes32(value);
    }

    function from(string memory value)
        internal
        pure
        returns (bytes32) {
        require(bytes(value).length <= 32, "ERR_STRING_TOO_LONG");
        bytes32 result;
        assembly {
            result := mload(add(value, 32))
        }
        return result;
    }

    function from(bytes memory value)
        internal
        pure
        returns (bytes32) {
        require(value.length <= 32, "ERR_BYTES_TOO_LONG");
        bytes32 result;
        assembly {
            result := mload(add(value, 32))
        }
        return result;
    }

    function from(bool data)
        internal
        pure
        returns (bytes32) {
        return data ? bytes32(uint256(1)) : bytes32(uint256(0));
    }

    function hash(string memory value)
        internal
        pure
        returns (bytes32) {
        return keccak256(abi.encodePacked(value));
    }
}