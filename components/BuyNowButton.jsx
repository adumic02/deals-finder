import React from "react";
import { Button, Link } from "@nextui-org/react";

const BuyNowButton = ({ deal }) => {
    return (
        <Button
            href={"https://www.cheapshark.com/redirect?dealID=" + deal}
            as={Link}
            color="primary"
            showAnchorIcon
            variant="flat"
        >
            Kupi
        </Button>
    );
};

export default BuyNowButton;
