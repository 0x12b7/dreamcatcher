interface ISafe {
    function previewMint() external view returns (uint256 supply_out);
    function preview_burn() external view returns (uint256 tender_out);
    function preview_deposit() external view returns (uint256 supply_in);
    function preview_withdrawal() external view returns (uint256 tender_in);
    function deposit() external;
    function withdraw() external;
    function depositors() external view returns (address[] memory);
    function net_tender_value() external view returns (uint256);
    function net_tender_value_per_share() external view returns (uint256);
}
