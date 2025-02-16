// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import { Math } from "./math.sol";

library PoolMath {
    using Math for *;

    struct Pool {
        uint256 total_tender;
        uint256 total_supply;
        uint8 precision;
    }

    function preview_deposit_requirement(Pool memory pool, uint256 supply_out)
        internal
        pure
        returns (uint256 tender_in) {
        return
            supply_out == 0 ? 0 :
            pool.total_tender == 0 && pool.total_supply == 0 ? supply_out :
            pool.total_tender != 0 && pool.total_supply == 0 ? supply_out :
            pool.total_tender == 0 && pool.total_supply != 0 ? 0 :
            supply_out
                .mul(pool.total_tender, pool.precision)
                .div(pool.total_supply, pool.precision);
    }

    function preview_deposit(Pool memory pool, uint256 tender_in, uint256 initial_mint)
        internal
        pure
        returns (uint256 supply_out, Pool memory pool_after) {
        if (tender_in == 0) return 0;
        if (pool.total_tender == 0 && pool.total_supply != 0) return 0;
        if (pool.total_tender == 0 && pool.total_supply == 0) return initial_mint;
        if (pool.total_tender != 0 && pool.total_supply == 0) return initial_mint;
        supply_out = tender_in
            .mul(pool.total_supply, pool.precision)
            .div(pool.total_tender, pool.precision);
        pool.total_tender += tender_in;
        pool.total_supply += supply_out;
        return (supply_out, pool);
    }

    function preview_withdrawal_requirement(Pool memory pool, uint256 tender_out)
        internal
        pure
        returns (uint256 supply_in, bool success) {
        return
            tender_out == 0 ? (0, false) :
            pool.total_tender == 0 && pool.total_supply == 0 ? (0, false) :
            pool.total_tender != 0 && pool.total_supply == 0 ? (0, false) :
            pool.total_tender == 0 && pool.total_supply != 0 ? (0, false) :
            tender_out
                .mul(pool.total_supply, pool.precision)
                .div(pool.total_tender, pool.precision);
    }

    function preview_withdrawal(Pool memory pool, uint256 supply_in)
        internal
        pure
        returns (uint256 tender_out) {
        return
            supply_in == 0 ? 0 :
            pool.total_tender == 0 && pool.total_supply == 0 ? 0 :
            pool.total_tender != 0 && pool.total_supply == 0 ? 0 :
            pool.total_tender == 0 && pool.total_supply != 0 ? 0 :
            tender_out
                .mul(pool.total_tender, pool.precision)
                .div(pool.total_supply, pool.precision);
    }
}