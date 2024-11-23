// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;
import {Set} from "./Set.sol";

library EnumerableSet {
    function has(Set storage set, bytes32 item)
        internal
        view
        returns (bool) {
        return set.keys[item] != 0;
    }

    function length(Set storage set)
        internal
        view
        returns (uint256) {
        return set.data.length;
    }

    function get(Set storage set, uint256 key)
        internal
        view
        returns (bytes32) {
        require(key < length(set), "ERR_KEY_OUT_OF_BOUNDS");
        return set.data[key];
    }

    function get(Set storage set)
        internal
        view
        returns (bytes32[] memory) {
        return set.data;
    }

    function push(Set storage set, bytes32 item)
        internal 
        returns (bool) {
        if (has(set, item)) return false;
        set.data.push(item);
        set.keys[item] = set.data.length;
        return true;
    }

    function pop(Set storage set, bytes32 item)
        internal
        returns (bool) {
        uint256 key = set.keys[item];
        if (key == 0) return false;
        uint256 delKey = key - 1;
        uint256 lastKey = set.data.length - 1;
        if (lastKey != delKey) {
            bytes32 lastItem = set.data[lastKey];
            set.data[delKey] = lastItem;
            set.keys[lastItem] = key;
        }
        set.data.pop();
        delete set.keys[item];
        return true;
    }
}