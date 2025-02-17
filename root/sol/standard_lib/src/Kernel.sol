// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

interface IKernel {
    function hasRootAccess(address account)
        external
        view
        returns (bool);

    function hasModuleFor(bytes4 selector)
        external
        view
        returns (bool);

    function hasModuleInstalled()
        external
        view
        returns (bool);
}