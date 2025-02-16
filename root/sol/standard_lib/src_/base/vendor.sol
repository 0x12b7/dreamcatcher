// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import { Math } from "./math.sol";

library Vendor {
    using Math for *;

    function net_tender_value_per_share(uint256 total_tender, uint256 total_supply, uint8 decimals)
        internal
        pure
        returns (uint256 assets) {
        return total_tender.div(total_supply, decimals);
    }

    function preview_withdraswal(uint256 tender_out, uint256 total_tender, uint256 total_supply, uint8 decimals)
        internal
        pure
        returns (uint256 supply_in) {
        return
            tender_out == 0 ? 0 :
            total_tender == 0 && total_supply == 0 ? tender_out * 10**decimals :
            total_tender != 0 && total_supply == 0 ? 0 :
            total_tender == 0 && total_supply != 0 ? 0 :
            tender_out
                .mul(total_supply, decimals)
                .div(total_tender, decimals);
    }

    function preview_deposit_with_percentage_fee(uint256 supply_out, uint256 total_tender, uint256 total_supply, uint256 fee_percentage, uint8 decimals)
        internal
        pure
        returns (uint256 tender_in) {
        
    }

    function preview_deposit(uint256 supply_out, uint256 total_tender, uint256 total_supply, uint8 decimals)
        internal
        pure
        returns (uint256 tender_in) {
        return
            supply_out == 0 ? 0 :
            total_tender == 0 && total_supply == 0 ? 0 :
            total_tender != 0 && total_supply == 0 ? 0 :
            total_tender == 0 && total_supply != 0 ? 0 :
            supply_out
                .mul(total_tender, decimals)
                .div(total_supply, decimals);
    }

    function preview_mint_with_fixed_fee(uint256 tender_in, uint256 total_tender, uint256 total_supply, uint256 initial_mint, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 supply_out) {
        return preview_mint(tender_in - fee, total_tender, total_supply, initial_mint, decimals);
    }

    function preview_mint_with_percentage_fee(uint256 tender_in, uint256 total_tender, uint256 total_supply, uint256 initial_mint, uint256 fee_percentage, uint8 decimals)
        internal
        pure
        returns (uint256 supply_out) {
        return preview_mint(tender_in.sub_percentage(fee_percentage, decimals), total_tender, total_supply, initial_mint, decimals);
    }

    function preview_mint(uint256 tender_in, uint256 total_tender, uint256 total_supply, uint256 initial_mint, uint8 decimals)
        internal
        pure
        returns (uint256 supply_out) {
        return
            tender_in == 0 ? 0 :
            total_tender == 0 && total_supply == 0 ? initial_mint * decimals.representation() :
            total_tender != 0 && total_supply == 0 ? initial_mint * decimals.representation() :
            total_tender == 0 && total_supply != 0 ? 0 :
            tender_in
                .mul(total_supply, decimals)
                .div(total_tender, decimals);
    }

    function preview_burn_with_fixed_fee(uint256 supply_in, uint256 total_tender, uint256 total_supply, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_out) {
        return preview_burn(supply_in - fee, total_tender, total_supply, decimals);
    }

    function previewBurnWithPercentageFee(uint256 supplyIn, uint256 totalTender, uint256 totalSupply, uint256 percentageFee, uint8 decimals)
        internal
        pure
        returns (uint256 tenderOut) {
        return preview_burn(supply_in.sub_percentage(fee_percentage), total_tender, total_supply, decimals);
    }



    function preview_tender_for_supply_out_with_fee_as_supply(uint256 supply_out, uint256 total_tender, uint256 total_supply, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_in) {
        
    }



    function preview_tender_for_supply_out_with_fee_as_supply(uint256 supply_out, uint256 total_tender, uint256 total_supply, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_in) {
        return preview_tender_for_supply_out(supply_out + fee, total_tender, total_supply, decimals);
    }

    function preview_tender_for_supply_out(uint256 supply_out, uint256 total_tender, uint256 total_supply, uint8 decimals)
        internal
        pure
        returns (uint256 tender_in) {
        return 
            supply_out == 0 ? 0 :
            total_tender == 0 && total_supply == 0 ? 0 :
            total_tender != 0 && total_supply == 0 ? 0 :
            total_tender == 0 && total_supply != 0 ? 0 :
            supply_out
                .mul(total_tender, decimals)
                .div(total_supply, decimals);
    }

    function preview_withdrawal_with_percentage_fee_as_tender(uint256 supply_in, uint256 total_tender, uint256 total_supply, uint256 percentage_fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_out) {
        return preview_withdrawal(supply_in, total_tender, total_supply, decimals).sub_percentage(percentage_fee);
    }

    function preview_withdrawal_with_percentage_fee_as_supply(uint256 supply_in, uint256 total_tender, uint256 total_supply, uint256 percentage_fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_out) {
        return preview_withdrawal(supply_in.sub_percentage(percentage_fee), total_tender, total_supply, decimals);
    }

    function preview_withdrawal_with_fee_as_tender(uint256 supply_in, uint256 total_tender, uint256 total_supply, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_out) {
        return preview_withdrawal(supply_in, total_tender, total_supply, decimals) - fee;
    }

    function preview_withdrawal_with_fee_as_supply(uint256 supply_in, uint256 total_tender, uint256 total_supply, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 tender_out) {
        return preview_withdrawal(supply_in - fee, total_tender, total_supply, decimals);
    }

    function preview_withdrawal(uint256 supply_in, uint256 total_tender, uint256 total_supply, uint8 decimals)
        internal
        pure
        returns (uint256 tender_out) {
        return
            supply_in == 0 ? 0 :
            total_tender == 0 && total_supply == 0 ? 0 :
            total_tender != 0 && total_supply == 0 ? 0 :
            total_tender == 0 && total_supply != 0 ? 0 :
            supply_in
                .mul(total_tender, decimals)
                .div(total_supply, decimals);
    }



    function previewWithdrawalWithFeeAsSupply(uint256 supplyIn, uint256 totalTender, uint256 totalSupply, uint256 fee, uint8 decimals)
        internal
        pure
        returns (uint256 tenderOut) {
        return previewWithdrawal(supplyIn - fee, totalTender, totalSupply, decimals);
    }

    function previewWithdrawal(uint256 supplyIn, uint256 totalTender, uint256 totalSupply, uint8 decimals)
        internal
        pure
        returns (uint256 tenderOut) {
        return
            supplyIn == 0 ? 0 :
            totalTender == 0 && totalSupply == 0 ? 0 :
            totalTender != 0 && totalSupply == 0 ? 0 :
            totalTender == 0 && totalSupply != 0 ? 0 :
            supplyIn
                .mul(totalTender, decimals)
                .div(totalSupply, decimals);
    }
}