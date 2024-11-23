// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {IERC20} from "../interface/IERC20.sol";
import {Math} from "../math/Math.sol";

library AddressSafeERC20 {
    using Math for uint256;

    function compatibleTotalSupply(IERC20 token)
        internal
        view
        returns (uint256) {
        return token.totalSupply().cst(token.decimals(), 18);
    }

    function compatibleBalanceOf(IERC20 token, address account)
        internal
        view
        returns (uint256) {
        return token.balanceOf(account).cst(token.decimals(), 18);
    }

    function compatibleTransfer(IERC20 token, address to, uint256 amount)
        internal
        returns (bool) {
        return token.transfer(to, amount.cst(18, token.decimals()));
    }

    function compatibleTransferFrom()
        internal
        return (bool) {
        
    }
}