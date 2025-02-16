interface I20 {
    function totalSupply()
        external
        view
        returns (uint256);
    function balanceOf(address account)
        external
        view
        returns (uint256);
    function transfer(address recipient, uint256 amount)
        external
        returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool success);
}