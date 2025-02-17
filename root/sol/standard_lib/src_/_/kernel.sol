// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

import {
    Set,
    SetImpl
} from "./Set.sol";

interface IModule {
    function hasSelector(bytes4 selector)
        external
        pure
        returns (bool);

    function selectors()
        external
        pure
        returns (bytes32[64] memory);
}

interface IKernel {
    event KernelAdminTransfer(address indexed oldAdmin, address indexed newAdmin);

    function admin()
        external
        view
        returns (address);

    function hasModuleFor(bytes4 selector)
        external
        view
        returns (bool);

    function hasModuleInstalled()
        external
        view
        returns (bool);

    function transferRootAccess(address account)
        external;

    function revokeRootAccess()
        external;
}

struct KernelStorageLayout {
    mapping(bytes4 => address) selectorToModule;
    mapping(address => bytes4[]) moduleToSelectors;
    address admin;
    uint8 lock;
}

contract Kernel is IKernel {
    using SetImpl for *;

    bytes32 private constant SLOT = keccak256("*");

    function _loc()
        internal
        pure
        returns (KernelStorageLayout storage sl) {
        bytes32 slot = SLOT;
        assembly {
            sl.slot := slot
        }
    }

    modifier nonReentrant() {
        require(_loc().lock == 0);
        _loc().lock = 1;
        _;
        _loc().lock = 0;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin(), "ERR_UNAUTHORIZED");
        _;
    }

    constructor() {}

    function admin()
        public
        view
        returns (address) {
        return _loc().admin;
    }

    
}