// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library Math {
    using Math for *;

    function slice_of(uint256 value, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return value
            .div(one_hundred_percent_(decimals), decimals)
            .mul(percentage, decimals);
    }

    
    function percentage_gain(uint256 old_value, uint256 new_value, uint8 decimals)
        internal
        pure
        returns (uint256 percentage) {
        return
            new_value <= old_value ? 0 :
            old_value
                .sub(new_value)
                .div(old_value, decimals)
                .mul(one_hundred_percent_(decimals), decimals);
    }

    function percentage_loss(uint256 old_value, uint256 new_value, uint8 decimals)
        internal
        pure
        returns (uint256 percentage) {
        return
            new_value >= old_value ? 0 :
            old_value
                .sub(new_value)
                .div(old_value, decimals)
                .mul(one_hundred_percent_(decimals), decimals);
    }


    function add_percentage(uint256 value, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return value
            .div(one_hundred_percent_(decimals), decimals)
            .mul(percentage, decimals)
            .add(value);
    }

    function sub_percentage(uint256 value, uint256 percentage, uint8 decimals)
        internal
        pure
        returns (uint256) {
        return value
            .div(one_hundred_percent_(decimals), decimals)
            .mul(percentage, decimals)
            .sub(value);
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
            require(y <= x, "ERR_U_256_UNDERFLOW");
            return x - y;
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
        only_supported_decimals_(decimals);
        return muldiv(x, y, decimals.representation());
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
        only_supported_decimals_(decimals);
        return muldiv(x, decimals.representation(), y);
    }


    function to_precision(uint256 value, uint8 old_precision)
        internal
        pure
        returns (uint256) {
        return to_precision(value, old_precision, 18);
    }

    function to_precision(uint256 value, uint8 old_precision, uint8 new_precision)
        internal
        pure
        returns (uint256) {
        check_precision_(old_precision);
        check_precision_(new_precision);
        return value == 0 ? value : old_precision == new_precision ? value : _muldiv(value, new_precision.representation(), old_precision);
    }


    function clamp(uint256 value, uint256 min, uint256 max)
        internal
        pure
        returns (uint256) {
        return value < min ? min : value > max ? max : value;
    }


    function representation(uint8 precision)
        internal
        pure
        returns (uint256) {
        return 10**precision;
    }

    function one_hundred_percent_(uint8 precision)
        private
        pure
        returns (uint256) {
        return 100 * representation(precision);
    }


    function check_precision_(uint8 precision)
        private
        pure {
        require(precision >= 2, "ERR_INCOMPATIBLE_PRECISION");
        return;
    }

    function muldiv_(uint256 x, uint256 y, uint256 z) 
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