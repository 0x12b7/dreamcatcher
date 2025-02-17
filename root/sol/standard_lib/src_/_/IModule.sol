// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

interface IModuleS32 {
    function selectors() external pure returns (bytes32[32] memory);
}