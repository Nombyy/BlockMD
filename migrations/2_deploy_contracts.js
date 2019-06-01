var Doctor = artifacts.require("./Doctor.sol");

module.exports = function(deployer) {
  deployer.deploy(Doctor);
};
