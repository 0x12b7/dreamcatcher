// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {IERC20} from "./IERC20.sol";

interface IERC20Burnable is IERC20 {
    function burn(uint256 amount) external;
    function burnFrom(address account, uint256 amount);
}