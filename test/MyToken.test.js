const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let token;
  let owner, user;

  beforeEach(async function () {
    // Pega duas contas do Hardhat local
    [owner, user] = await ethers.getSigners();

    // Compila e instancia o contrato
    const Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy("TokenA", "TKA", ethers.parseEther("1000")); // 1000 tokens
  });

  it("Deve atribuir supply inicial ao deployer", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.parseEther("1000"));
  });

  it("Deve permitir usar faucet para mint adicional", async function () {
    // Owner usa faucet para enviar 500 tokens para user
    await token.faucet(user.address, ethers.parseEther("500"));
    const userBalance = await token.balanceOf(user.address);
    expect(userBalance).to.equal(ethers.parseEther("500"));
  });

  it("Deve permitir transferir tokens entre contas", async function () {
    // Owner envia 100 tokens para user
    await token.transfer(user.address, ethers.parseEther("100"));
    const userBalance = await token.balanceOf(user.address);
    const ownerBalance = await token.balanceOf(owner.address);
    expect(userBalance).to.equal(ethers.parseEther("100"));
    expect(ownerBalance).to.equal(ethers.parseEther("900"));
  });
});