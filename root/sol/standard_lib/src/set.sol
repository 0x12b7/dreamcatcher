// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

library SetL {
    struct Set {
        mapping(bytes32 => uint256) keys;
        bytes32[] data;
    }

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
        uint256 key_to_delete = key - 1;
        uint256 last_key = set.data.length - 1;
        if (last_key != key_to_delete) {
            bytes32 last_data = set.data[last_key];
            set.data[key_to_delete] = last_data;
            set.keys[last_data] = key;
        }
        set.data.pop();
        delete set.keys[data];
        return true;
    }
}