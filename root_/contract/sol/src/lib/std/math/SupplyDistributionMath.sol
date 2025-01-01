// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {Math} from "./Math.sol";

library SupplyDistributionMath {
    using Math for uint256;

    function previewMint(uint256 assetsIn, uint256 assets, uint256 supply, uint256 initialMint)
        internal
        pure
        returns (uint256) {
        require(initialMint > 1e18, "ERR_INITIAL_MINT_TOO_LOW");
        return
            assetsIn == 0 ? 0 :
            assets == 0 && supply == 0 ? initialMint :
            assets != 0 && supply == 0 ? initialMint :
            assets == 0 && supply != 0 ? 0 :
            assetsIn.mul(supply).div(assets);
    }

    funtion previewMint(uint256 assetsIn, uint256 assets, uint256 supply)
        internal
        pure
        returns (uint256) {
        return previewMint(assetsIn, assets, supply, _initialMint());
    }

    function previewBurn(uint256 supplyIn, uint256 assets, uint256 supply)
        internal
        pure
        returns (uint256) {
        return
            supplyIn == 0 ? 0 :
            assets == 0 && supply == 0 ? 0 :
            assets != 0 && supply == 0 ? 0 :
            assets == 0 && supply != 0 ? 0 :
            supplyIn.mul(assets).div(supply);
    }

    function _initialMint(uint256 amount, uint8 precision)
        private
        pure
        returns (uint256) {
        return Math.representation(precision) * amount;
    }

    function _initialMint()
        private
        pure
        returns (uint256) {
        return 1000000e18;
    }
}