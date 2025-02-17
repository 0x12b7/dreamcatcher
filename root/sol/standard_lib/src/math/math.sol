// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Math {
    using Math for *;

    function representation(uint8 precision)
        internal
        pure
        returns (uint256) {
        return 10**precision;
    }

    function _oneHundredPercent(uint8 precision)
        private
        pure
        returns (uint256) {
        return 100 * precision.representation();
    }

    function _onlySupportedPrecision(uint8 precision)
        private
        pure {
        require(precision >= 2, "ERR_UNSUPPORTED_PRECISION");
        return;
    }

    function _muldiv(uint256 x, uint256 y, uint256 z) 
        private
        pure 
        returns (uint256) {
        unchecked {
            require (z > 0, "ERR_U_256_DIV_BY_ZERO");
            uint256 prod0;
            uint256 prod1;
            assembly {
                let mm := mulmod(x, y, not(0))
                prod0 := mul(x, y)
                prod1 := sub(sub(mm, prod0), lt(mm, prod0))
            }
            if (prod1 == 0) return prod0 / z;
            require (z > prod1, "ERR_U_256_MUL_DIV_OVERFLOW");
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