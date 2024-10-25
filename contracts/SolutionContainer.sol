// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SolutionContainer {
    constructor(bytes memory solutionRuntime) {
        assembly {
            return(add(solutionRuntime, 0x20), mload(solutionRuntime))
        }
    }
}