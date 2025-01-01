// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

struct Set {
    mapping(bytes32 => uint256) keys;
    bytes32[] data;
}