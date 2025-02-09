// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.19;

/// The disk is the base memory location. It is possiblee to store
/// multiple sets in a contract.

abstract contract Disk {
    bytes32 constant internal _LOC = bytes32(uint256(keccak256("eip1967.storage")) - 1);

    function _memory()
        internal
        pure
        returns (Counter.StorageLayout storage m) {
        bytes32 location = _LOC;
        assembly {
            m.slot := location
        }
    }
}


/// Fixed size arrays are ok
/// mappings get randomly
/// The Counter should implement the contract in full, there is no natural size limit
/// and this can be an entise application.
/// It is then broken down into relevant facets.
library Counter {
    event Increment(uint256 oldCount, uint256 newCount);
    event Decrement(uint256 oldCount, uint256 newCount);

    struct StorageLayout {
        /// base 1.0.0      The micro module it partains to and the version
        uint256 count;

        /// base 2.0.0      Some storage layouts can be extended.
        uint256 count2;     
    }

    function increment(StorageLayout memory my)
        internal
        returns (bool) {
        uint256 oldCount = my.count;
        uint256 newCount = my.count += 1;
        emit Increment(oldCount, newCount);
        return true;
    }

    function decrement(StorageLayout memory self)
        internal
        returns (bool) {
        uint256 oldCount = self.count;
        uint256 newCount = self.count -= 1;
        emit Decrement(oldCount, newCount);
        return true;
    }
}


/// The implementations can now be broken up and exposed on various facets. Which means we can deploy and manage larger smart contracts.

interface CounterFacetI {
    function increment() external returns (bool);
}

contract CounterFacet is Disk {

    function increment()
        external
        returns (bool) {
        return Counter.increment(_memory());
    }
}