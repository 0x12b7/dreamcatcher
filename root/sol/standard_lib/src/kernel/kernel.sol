// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import { Address } from "../base/address.sol";

interface IModule {
    function selectors()
        external
        pure
        returns (bytes32[] memory);
}

library Kernel {
    using Kernel for *;
    using Address for *;
    event Mount(address indexed module, bytes4[] selectors);
    event Unmount(address indexed module, bytes4[] selectors);

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

    function mounted(StorageLayout storage kernel)
        internal
        view
        returns (address[] memory) {
        return kernel._mounted;
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


    function _loc()
        private
        pure
        returns (Kernel.StorageLayout storage) {
        
    }

    constructor(address admin) {}
}