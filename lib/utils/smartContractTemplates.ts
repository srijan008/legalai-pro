export function getEscrowTemplate(): string {
  return `
pragma solidity ^0.8.20;

contract Escrow {
    address public payer;
    address public payee;
    address public arbiter;

    constructor(address _payer, address _payee, address _arbiter) payable {
        payer = _payer;
        payee = _payee;
        arbiter = _arbiter;
    }

    function release() external {
        require(msg.sender == arbiter, "Only arbiter can release");
        payable(payee).transfer(address(this).balance);
    }

    function refund() external {
        require(msg.sender == arbiter, "Only arbiter can refund");
        payable(payer).transfer(address(this).balance);
    }
}
`
}
