// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Math {
    using Math for *;
    
    function slice_of(uint256 x, uint256 percentage)
        internal
        pure
        returns (uint256) {
        return slice_of(x, percentage);
    }

    function slice_of(uint256 x, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return mul(div(x, 100 * representation(decimals), decimals), percentage);
    }

    function percentageGain(uint256 oldValue, uint256 newValue)
        internal
        pure
        returns (uint256 percentage) {
        return percentageGain(oldValue, newValue, 18);
    }

    function percentage_gain(uint256 oldValue, uint256 newValue, uint8 decimals)
        internal
        pure
        returns (uint256 percentage) {
        if (oldValue <= newValue) return 0;
        return newValue
            .sub(oldValue, decimals)
            .div(oldValue, decimals)
            .mul(100 * (10**decimals), decimals);
    }

    function percentageLoss(uint256 oldValue, uint256 newValue, uint8 decimals)
        internal
        pure
        returns (uint256 percentage) {
        if (newValue >= oldValue) return 0;
        return oldValue
            .sub(newValue, decimals)
            .div(oldValue, decimals)
            .mul(100 * (10**decimals), decimals);
    }


    function clamp(uint256 value, uint256 min, uint256 max)
        internal
        pure
        returns (uint256) {
        if (value < min) return min;
        if (value > max) return max;
        return value;
    }


    function add_percentage(uint256 value, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return value
            .div(100 * (10**decimals), decimals)
            .mul(percentage, decimals)
            .add(value);
    }

    function sub_percentage(uint256 value, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return value
            .div(100 * (10**decimals), decimals)
            .mul(percentage, decimals)
            .sub(value);
    }


    /**
     * @notice The percentage of `x` in `y` with 18 decimals of precision.
     * @return percentage The percentage with 18 decimals of precision.
     */
    function percentageOf(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256 percentage) {
        return percentageOf(x, y, 18);
    }

    function percentageOf(uint256 x, uint256 y, uint8 decimals) 
        internal 
        pure 
        returns (uint256 percentage) {   
        return mul(div(x, y, decimals), 100 * representation(decimals), decimals);
    }

    function transform(uint256 x, uint8 oldDecimals, uint8 newDecimals) 
        internal 
        pure 
        returns (uint256) {        
        if (x == 0) return x;
        if (oldDecimals == newDecimals) return x;
        return muldiv(x, 10**newDecimals, 10**oldDecimals);
    }

    function add(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        unchecked {
            uint256 z = x + y;
            require (z >= x, "ERR_U_256_OVERFLOW");
            return z;
        }
    }

    function sub(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        unchecked {
            uint256 z = x - y;
            require (y <= x, "ERR_U_256_UNDERFLOW");
            return z;
        }
    }

    function mul(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        return mul(x, y, 18);
    }
    
    function mul(uint256 x, uint256 y, uint8 decimals) 
        internal 
        pure 
        returns (uint256) {
        return muldiv(x, y, representation(decimals));
    }
    
    function div(uint256 x, uint256 y) 
        internal 
        pure 
        returns (uint256) {
        return div(x, y, 18);
    }
    
    function div(uint256 x, uint256 y, uint8 decimals) 
        internal 
        pure 
        returns (uint256) {

        return muldiv(x, representation(decimals), y);
    }

    /**
     * @notice Multiplies `x` by `y` and then divides by `z` with full precision.
     * @dev Reverts with `ERR_U_256_DIV_BY_ZERO` on division by zero.
     * @dev Reverts with `ERR_U_256_MUL_DIV_OVERFLOW` on overflow.
     */
    function muldiv(uint256 x, uint256 y, uint256 z) 
        internal 
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

    /**
     * ***Brief*** 
     * The base representation for `decimals`, ie. 18 -> 10^18.
     */
    function representation(uint8 decimals) 
        internal 
        pure 
        returns (uint256) {
        return 10**decimals;
    }
}