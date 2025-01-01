// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Math {
    function slc(uint256 x, uint256 percentage) 
        internal 
        pure 
        returns (uint256) {
        return mul(div(x, 100e18), percentage);
    }

    function lss(uint256 x, uint256 y, uint8 precision) 
        internal 
        pure 
        returns (uint256 percentage) {
        return sub(uint256(100e18), yld(x, y, precision));
    }

    function lss(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256 percentage) {
        return lss(x, y, 18);
    }

    function yld(uint256 x, uint256 y, uint8 precision) 
        internal 
        pure 
        returns (uint256 percentage) {
        if (x == 0) return 0;
        if (x >= y) return 100e18;
        return pct(x, y, precision);
    }

    function yld(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256 percentage) {
        return yld(x, y, 18);
    }

    function pct(uint256 x, uint256 y, uint8 precision) 
        internal 
        pure 
        returns (uint256 percentage) {   
        return mul(div(x, y, precision), 100e18, precision);
    }

    function pct(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256 percentage) {
        return pct(x, y, 18);
    }

    function cst(uint256 x, uint8 decimals0, uint8 decimals1) 
        internal 
        pure 
        returns (uint256) {        
        if (x == 0) return x;
        if (decimals0 == decimals1) return x;
        return muldiv(x, 10**decimals1, 10**decimals0);
    }

    function add(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        unchecked {
            uint256 z = x + y;
            require (z >= x, "ERR_UNSIGNED_INTEGER_OVERFLOW");
            return z;
        }
    }

    function sub(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        unchecked {
            uint256 z = x - y;
            require (y <= x, "ERR_UNSIGNED_INTEGER_UNDERFLOW");
            return z;
        }
    }

    function mul(uint256 x, uint256 y, uint8 precision) 
        internal 
        pure 
        returns (uint256) {
        return muldiv(x, y, representation(precision));
    }

    function mul(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        return mul(x, y, 18);
    }

    function div(uint256 x, uint256 y, uint8 precision) 
        internal 
        pure 
        returns (uint256) {
        return muldiv(x, representation(precision), y);
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

    function representation(uint8 decimals) 
        internal 
        pure 
        returns (uint256) {
        return 10**decimals;
    }
}