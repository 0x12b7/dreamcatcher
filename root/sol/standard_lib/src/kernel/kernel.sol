// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

interface IModule {
    function selectors() external pure returns (bytes4[] memory);
}

interface IKernel {
    event $OwnershipTransfer();
    event $Mount(address source, bytes4[] selectors);
    event $Unmount(bytes4[] selectors);
    function $supportsInterface(bytes4 interfaceId) external view returns (bool);
    function $checkPermissions(address[] memory accounts) external view returns (bool[] memory);
    function $checkPermissions(address account) external view returns (bool);
    function $checkPermissions() external view returns (bool);
    function $owners(uint256 key) external view returns (address);
    function $owners() external view returns (address[] memory);
    function $transferOwnership(address[] memory accounts) external;
    function $transferOwnership(address account) external;
    function $renounceOwnership() external;
    function $length() external view returns (uint256);
    function $moduleFor(bytes4 selector) external view returns (IModule);
    function $hasSelectors(bytes4[] memory selectors) external view returns (bool);
    function $hasSelectors(bytes4 selector) external view returns (bool);
    function $selectors(uint256 key) external view returns (bytes4);
    function $selectors() external view returns (bytes4[] memory);
    function $has(IModule module) external view returns (bool);
    function $mounted(uint256 key) external view returns (IModule);
    function $mounted() external view returns (IModule[] memory);
    function $mountDirectly(address source, bytes4[] memory selectors) external;
    function $mountDirectly(address source, bytes4 selector) external;
    function $mount(IModule[] memory modules) external;
    function $mount(IModule module, bytes4[] memory selectors) external;
    function $mount(IModule module, bytes4 selector) external;
    function $mount(IModule module) external;
    function $updateDirectly(address source, bytes[] memory selectors) external;
    function $updateDirectly(address source, bytes4 selector) external;
    function $update(IModule[] memory modules) external;
    function $update(IModule module, bytes4[] memory selectors) external;
    function $update(IModule module, bytes4 selector) external;
    function $update(IModule module) external;
    function $update(IModule oldModule, IModule newModule) external;
    function $unmountDirectly(bytes4[] memory selectors) external;
    function $unmountDirectly(bytes4 selector) external;
    function $unmount(IModule module) external;
    function $unmountAll() external;
}

contract Kernel {

    constructor() {}
}