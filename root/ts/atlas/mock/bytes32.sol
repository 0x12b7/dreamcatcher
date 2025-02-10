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

    function route(address to)
        internal {
        require(to != zero(), "ERR_ZERO_ADDRESS");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), to, 0, calldatasize(), 0, 0)
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

library UInt256 {
    function from(bytes32 value)
        internal
        pure
        returns (uint256) {
        return uint256(value);
    }

    function sliceOf(uint256 x, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return mul(div(x, 100 * UInt8.representation(decimals), decimals), percentage, decimals);
    }

    function sliceOf(uint256 x, uint256 percentage)
        internal
        pure
        returns (uint256) {
        return sliceOf(x, percentage, 18);
    }

    function yieldOf(uint256 x, uint256 y, uint8 decimals)
        internal
        pure
        returns (uint256 percentage) {
        if (x == 0) return 0;
        if (x >= y) return 100e18;
        return percentageOf(x, y, decimals);
    }

    function yieldOf(uint256 x, uint256 y)
        internal
        pure
        returns (uint256 percentage) {
        return percentageOf(x, y, 18);
    }

    function percentageOf(uint256 x, uint256 y, uint8 decimals)
        internal
        pure
        returns (uint256 percentage) {
        return mul(div(x, y, decimals), 100e18, decimals);
    }

    function cast(uint256 x, uint8 oldDecimals, uint8 newDecimals)
        internal
        pure
        returns (uint256) {
        if (x == 0) return x;
        if (oldDecimals == newDecimals) return x;
        uint256 newRepresentation = UInt8.representation(newDecimals);
        uint256 oldRepresentation = UInt8.representation(oldDecimals);
        return muldiv(x, newRepresentation, oldRepresentation);
    }

    function add(uint256 x, uint256 y)
        internal
        pure
        returns (uint256) {
        unchecked {
            uint256 z = x + y;
            require(z >= x, "ERR_UNSIGNED_INTEGER_OVERFLOW");
            return z;
        }
    }

    function sub(uint256 x, uint256 y)
        internal
        pure
        returns (uint256) {
        unchecked {
            uint256 z = x - y;
            require(y <= x, "ERR_UNSIGNED_INTEGER_UNDERFLOW");
            return z;
        }
    }

    function mul(uint256 x, uint256 y, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return muldiv(x, y, UInt8.representation(decimals));
    }

    function mul(uint256 x, uint256 y)
        internal
        pure
        returns (uint256) {
        return mul(x, y, 18);
    }

    function div(uint256 x, uint256 y, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return muldiv(x, UInt8.representation(decimals), y);
    }

    function div(uint256 x, uint256 y)
        internal
        pure
        returns (uint256) {
        return div(x, y, 18);
    }

    function muldiv(uint256 x, uint256 y, uint256 z) 
        internal 
        pure 
        returns (uint256) {
        unchecked {
            require (z > 0, "ERR_DIVISION_BY_ZERO");
            uint256 prod0;
            uint256 prod1;
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }
            if (prod1 == 0) return prod0 / z;
            require (z > prod1, "ERR_UNSIGNED_INTEGER_MULDIV_OVERFLOW");
            uint256 remainder;
            assembly {
                remainder := mulmod(x, y, z)
                prod1 := sub(prod1, gt(remainder, prod0))
                prod0 := sub(prod0, remainder)
            }
            uint256 twos = z & (~z + 1);
            assembly {
                z := div(z, twos)
                prod0 := div(prod0, twos)
                twos := add(div(sub(0, twos), twos), 1)
            }
            prod0 |= prod1 * twos;
            uint256 inverse = (3 * z) ^ 2;
            inverse *= 2 - z * inverse;
            inverse *= 2 - z * inverse;
            inverse *= 2 - z * inverse;
            inverse *= 2 - z * inverse;
            inverse *= 2 - z * inverse;
            inverse *= 2 - z * inverse;
            return prod0 * inverse;
        }
    }
}

library UInt8 {
    function representation(uint8 decimals)
        internal
        pure
        returns (uint256) {
        return 10 ** decimals;
    }
}

library FvalImpl {
    struct Fval {
        uint256 _value;
        uint8 _decimals;
    }

    function add(Fval memory x, Fval memory y)
        internal
        pure
        returns (Fval memory) {
        uint8 decimals0 = x._decimals;
        uint8 decimals1 = y._decimals;
        require(decimals0 == decimals1, "ERR_DECIMALS_MISMATCH");
        uint256 x$0 = x._value;
        uint256 y$0 = y._value;
        uint256 z = UInt256.add(x$0, y$0);
        return Fval({ _value: z, _decimals: decimals0 });
    }
}