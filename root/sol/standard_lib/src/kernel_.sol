// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import { Address } from "../base/address.sol";

interface IModule {
    function name() external view returns (string memory);
    function version() external view returns (uint8);
    function selectors()
        external
        pure
        returns (bytes4[] memory);
}

interface IKernel {
    event OwnershipTransfer$(address indexed oldOwner, address indexed newOwner);
    function ownershipHistory$()
        external
        view
        returns (address[] memory);
    function owner$()
        external
        view
        returns (address);

    
    function $transferOwnership(address account) external;
    function $renounceOwnership() external;
    function $mounted(uint8 slot) external view returns (IModule);
    function $mounted() external view returns (IModule[] memory);
    function $mount(IModule[] memory modules) external;
    function $mount(IModule module, bytes4[] memory selectors) external;
    function $mount(IModule module, bytes4 selector) external;
    function $mount(IModule module) external;
    function $remount(IModule[] memory modules) external;
    function $remount(IModule module, bytes4[] memory selectors) external;
    function $remount(IModule module, bytes4 selector) external;
    function $remount(IModule module) external;
    function $unmount(bytes4[] memory selectors) external;
    function $unmount(bytes4 selector) external;
    function $unmount(IModule module) external;
}

library Kernel {
    using Kernel for *;
    using Address for *;
    event Mount(address indexed module, bytes4[] selectors);
    event Unmount(address indexed module, bytes4[] selectors);
    event AdminTransfer(address oldAdmin, address newAdmin);

    struct StorageLayout {
        mapping(bytes4 => address) _selectorToModule;
        mapping(address => bytes4[]) _moduleToSelectors;
        mapping(address => bool) _moduleIsMounted;
        address[] _mounted;
        address _admin;
    }

    function admin(StorageLayout storage kernel)
        internal
        view
        returns (address) {
        return kernel._admin;
    }

    function transferAdmin(StorageLayout storage kernel, address account)
        internal {
        address oldAdmin = kernel.admin();
        address newAdmin = account;
        require(newAdmin != oldAdmin, "");
        kernel._admin = account;
        emit AdminTransfer(oldAdmin, newAdmin);
        return;
    }

    function renounceAdmin(StorageLayout storage kernel)
        internal {
        kernel._admin = address(0);
        return;
    }

    function mounted(StorageLayout storage kernel)
        internal
        view
        returns (address[] memory) {
        return kernel._mounted;
    }

    function mount(StorageLayout storage kernel, IModule[] memory modules)
        internal {
        uint8 i = 0;
        while (i < modules.length) {
            IModule module = modules[i];
            kernel.mount(module);
            unchecked {
                i++;
            }
        }
        return;
    }

    function mount(StorageLayout storage kernel, IModule module)
        internal {
        address moduleAddress = address(module);
        require(moduleAddress.hasCode(), "");
        require(!kernel._moduleIsMounted[moduleAddress], "");
        bytes4[] memory selectors = module.selectors();
        require(selectors.length > 0, "");
        require(selectors.length < 64, "");
        uint8 i = 0;
        while (i < selectors.length) {
            bytes4 selector = selectors[i];
            require(kernel._selectorToModule[selector] == address(0), "");
            kernel._selectorToModule[selector] = moduleAddress;
            kernel._moduleToSelectors[moduleAddress].push(selector);
            unchecked {
                i++;
            }
        }
        kernel._mounted.push(moduleAddress);
        kernel._moduleIsMounted[moduleAddress] = true;
        emit Mount(moduleAddress, selectors);
        return;
    }

    function unmount(StorageLayout storage kernel, IModule module)
        internal {
        address moduleAddress = address(module);
        require(kernel._moduleIsMounted[moduleAddress], "");
        bytes4[] memory selectors = kernel._moduleToSelectors[moduleAddress];
        uint8 i = 0;
        while (i < selectors.length) {
            delete kernel._selectorToModule[selectors[i]];
            unchecked {
                i++;
            }
        }
        delete kernel._moduleToSelectors[moduleAddress];
        address[] storage moduleAddresses = kernel.mounted;
        i = 0;
        while (i < moduleAddresses.length) {
            if (moduleAddresses[i] == moduleAddress) {
                moduleAddresses[i] = moduleAddress[moduleAddresses.length - 1];
                moduleAddresses.pop();
                break;
            }
            unchecked {
                i++;
            }
        }
        kernel._moduleIsMounted[moduleAddress] = false;
        emit Unmount(moduleAddress, selectors);
        return;
    }
}

contract KernelImpl {
    using Kernel for *;

    bytes32 private constant SLOT = keccak256("*");

    function _loc()
        private
        pure
        returns (Kernel.StorageLayout storage sl) {
        bytes32 slot = SLOT;
        assembly {
            sl.slot := slot
        }
    }

    constructor(
        address admin, 
        IModule[] memory initialModules,
        uint8 maxModuleMountedCount,
        uint8 maxModuleSelectorCount) {
        _loc().transferAdmin(admin);
        _loc().mount(initialModules);
    }

    function admin()
        external
        view
        returns (address) {
        return _loc().admin();
    }
}