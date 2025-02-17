// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

interface IKernel {
    function is_admin(address account) external view returns (bool);
    function has_module(bytes4 selector) external view returns (bool);
    function has_module(address module_address) external view returns (bool);
    function grant_admin_role(address account) external;
    function revoke_admin_role(address account) external;
}

struct KernelLoc {
    mapping(bytes4 => address) selector_to_module;
    mapping(address => bytes4[]) module_to_selectors;
    mapping(address => bool) is_installed;
    mapping(address => bool) is_admin;
    bool lock;
}

contract Kernel {
    bytes32 private constant SLOT = keccak256("*");

    function _loc()
        internal
        pure
        returns (KernelLoc storage loc) {
        bytes32 slot = SLOT;
        assembly {
            loc.slot := slot
        }
    }

    modifier non_reentrant() {
        require(!_loc().lock, "ERR_REENTRANT_CALLS_ARE_FORBIDDEN");
        _loc().lock = true;
        _;
        _loc().lock = false;
    }

    modifier only_admin() {
        require(is_admin(msg.sender), "");
        _;
    }

    constructor() {}

    function is_admin(address account)
        public
        view
        returns (bool) {
        return _loc().is_admin[account];
    }

    function has_module(bytes4 selector)
        public
        view
        returns (bool) {
        return _loc().selector_to_module[selector] != address(0);
    }

    function has_module(address module_address)
        public
        view
        returns (bool) {
        return _loc().is_installed[module_address];
    }

    function grant_admin_role(address account)
        public
        non_reentrant() 
        only_admin() {
        _loc().is_admin[account] = true;
        return;
    }

    function revoke_admin_role(address account)
        public 
        non_reentrant() 
        only_admin() {
        _loc().is_admin[account] = false;
        return;
    }
}