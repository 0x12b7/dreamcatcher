// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

struct Set {
    mapping(bytes32 => uint256) keys;
    bytes32[] data;
}

library SetImpl {
    function has(Set storage set, bytes32 data)
        internal
        view
        returns (bool) {
        return set.keys[data] != 0;
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

    function insert(Set storage set, bytes32 data)
        internal
        returns (bool) {
        if (has(set, data)) return false;
        set.data.push(data);
        set.keys[data] = set.data.length;
        return true;
    }

    function remove(Set storage set, bytes32 data)
        internal
        returns (bool) {
        uint256 key = set.keys[data];
        if (key == 0) return false;
        uint256 keyToDelete = key - 1;
        uint256 lastKey = set.data.length - 1;
        if (lastKey != keyToDelete) {
            bytes32 lastData = set.data[lastKey];
            set.data[keyToDelete] = lastData;
            set.keys[lastData] = key;
        }
        set.data.pop();
        delete set.keys[data];
        return true;
    }
}