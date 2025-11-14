//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    // Construtor: define nome, símbolo e supply inicial
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        // Mint inicial para quem deployar
        _mint(msg.sender, initialSupply);
    }

    // Função opcional de faucet para testes
    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}