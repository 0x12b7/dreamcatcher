// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import { Address } from "./address.sol";
import { SetL } from "./set.sol";

interface ModuleI {
    function selectors() external pure returns (bytes4[32] memory);
}


interface IKernel {
    function installModule() external;
    function uninstallModule() external;
}

interface KernelI {
    function transfer_root_access(address account) external;
    function install_module(ModuleI module) external;
    function uninstall_module(ModuleI module) external;
}


contract Kernel {
    using Address for *;

    struct KernelLoc {
        mapping(bytes4 => address) selector_to_module;
        mapping(address => bytes4[]) module_to_selectors;
        mapping(address => bool) is_installed;
        mapping(address => bool) is_root_admin;
        bool lock;
    }

    struct KernelDisk {
        mapping(bytes4 => address) selector_to_module;
        mapping(address => bytes4[]) module_to_selectors;
        address[] installed_modules;
        mapping(address => bool) is_installed;
        address root_access;
        bool non_reentrant_lock_enabled;
        uint8 max_module_count;
        
    }


    bytes32 internal constant KERNEL_STORAGE_LOC = keccak256("storage.kernel");

    function _loc()
        internal
        pure
        returns (KernelDisk memory sl) {
        bytes32 position = KERNEL_STORAGE_LOC;
        assembly {
            sl.slot := position
        }
    }


    modifier non_reentrant() {
        require(!_loc().non_reentrancy_lock_enabled, "");
        _loc().non_reentrant_lock_enabled = true;
        _;
        _loc().non_reentrant_lock_enabled = false;
    }

    modifier only_root_admin() {
        require(msg.sender == _loc().root_access);
        _;
    }


    constructor(address root_access, ModuleI[] memory initial_modules) {
        _loc().root_access = root_access;
        install_module(initial_modules);
    }


    fallback()
        external
        payable {
        _loc().selector_to_module[msg.sig].load_contract();
    }

    receive()
        external
        payable 
        {}


    function transfer_root_access(address account)
        external 
        only_root_admin()
        non_reentrant() {
        _loc().root_access = account;
        return;
    }


    function install_module(ModuleI module)
        external
        only_root_admin()
        non_reentrant() {
        address module_address = address(module);
        require(module_address.has_code(), "ERR_INVALID_MODULE");
        require(!_loc().is_installed[module_address], "ERR_ALREADY_INSTALLED");
        bytes4[] memory selectors = module.selectors();
        require(selectors.length > 0, "ERR_NO_SELECTORS");
        uint8 i = 0;
        while (i < selectors.length) {
            bytes4 selector = selectors[i];
            require(_loc().selector_to_module[selector] == address(0), "ERR_SELECTOR_COLLISION");
            _loc().selector_to_module[selector] = module_address;
            _loc().module_to_selectors[module_address].push(selector);
            unchecked {
                i++;
            }
        }
        _loc().installed_modules.push(module_address);
        _loc().is_installed[module_address] = true;
        return;
    }

    function uninstall_module(ModuleI module)
        external 
        only_root_admin()
        non_reentrant() {
        address module_address = address(module);
        require(_loc().is_installed[module_address], "ERR_MODULE_NOT_FOUND");
        _de_alloc_module(module);
        _mark_module_as_uninstalled();

        bytes4[] memory selectors = _loc().module_to_selectors[module_address];
        uint8 i = 0;
        while (i < selectors.length) {
            delete _loc().selector_to_module[selectors[i]];
            unchecked {
                i++;
            }
        }
        delete _loc().module_to_selectors[module_address];
        address[] storage module_addresses = _loc().installed_modules;
        i = 0;
        while (i < module_addresses.length) {
            if (module_addresses[i] == module_address) {
                module_addresses[i] = module_addresses[module_addresses.length - 1];
                module_addresses.pop();
                break;
            }
            unchecked {
                i++;
            }
        }
        _loc().is_installed[module_address] = false;
        return true;
    }


    function _de_alloc_module(ModuleI module)
        private {
        address module_address = address(module);
        bytes4[] memory selectors = _loc().module_to_selectors[module_address];
        uint8 i = 0;
        while (i < selectors.length) {
            delete _loc().selector_to_module[selectors[i]];
            unchecked {
                i++;
            }
        }
        delete _loc().module_to_selectors[module_address];
        return;
    }

    function _mark_module_as_uninstalled()
        private {
        
    }





    function _unpackSelectorSlots(bytes4[32] memory selectorSlots)
        internal
        pure
        returns (bytes4[] memory selectors) {
        uint8 count = 0;
        uint8 i = 0;
        while (i < 32) {
            if (selectorSlots[i] == bytes4(0)) break;
            count++;
            unchecked {
                i++;
            }
        }
        selectors = new bytes4[](count);
        i = 0;
        while (i < count) {
            selectors[i] = selectorSlots[i];
            unchecked {
                i++;
            }
        }
        return selectors;
    }
}