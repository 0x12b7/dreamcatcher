// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import { IModule } from "./IModule.sol";

interface IKernel {
    function installModule(IModuleS32 module) external;
    function reinstallModule(IModuleS32 module) external;
    function uninstallModule(IModuleS32 module) external;
    function installSelectorsFrom(IModuleS32 module, bytes32[] memory selectors) external;
}