// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {IERC20} from "./IERC20.sol";

interface IERC20Capped is IERC20 {
    function cap() external view returns (uint256);
}