// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {Math} from "./Math.sol";

library RebalanceMath {
    using Math for uint256;

    struct MockAsset {
        uint256 allocation;
        uint256 price;
        uint256 amount;
    }

    struct Result {
        uint256 surplusAmount;
        uint256 deficitAmount;
    }

    function previewRebalance(MockAsset memory asset, uint256 assets)
        internal
        pure
        returns (Result memory) {
        require (asset.allocation <= 100e18, "ERR_ALLOCATION_OVERFLOW");
        require (asset.price > 0, "ERR_INVALID_PRICE");
        uint256 actualValue = asset.amount.mul(asset.price);
        uint256 targetValue = assets.mul(asset.allocation).div(100e18);
        require (actualValue <= assets, "ERR_ASSET_VALUE_OVERFLOW");
        if (targetValue > actualValue) 
            return 
                Result({
                    surplusAmount: 0,
                    deficitAmount: targetValue.sub(actualValue).div(asset.price)
                });
        return 
            Result({
                surplusAmount: actualValue.sub(targetValue).div(asset.price),
                deficitAmount: 0
            });
    }

    function previewRebalance(MockAsset[] memory assets)
        internal
        pure
        returns (Result[] memory) {
        require (assets.length > 0, "ERR_EMPTY_ASSET_ARRAY");
        uint256 sumValue;
        uint256 sumAllocation;
        uint256 i;
        while (i < assets.length) {
            MockAsset memory asset = assets[i];
            sumValue += asset.amount.mul(asset.price);
            sumAllocation += asset.allocation;
            unchecked {
                i++;
            }
        }
        require (sumAllocation == 100e18, "ERR_ALLOCATION_INCOMPLETE");
        require (sumValue > 0, "ERR_INVALID_SUM_VALUE");
        Result[] memory results = new Result[](assets.length);
        i = 0;
        while (i < assets.length) {
            MockAsset memory asset = assets[i];
            results[i] = previewRebalance(asset, sumValue);
            unchecked {
                i++;
            }
        }
        return results;
    }
}