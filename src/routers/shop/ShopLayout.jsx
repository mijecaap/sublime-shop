import React, { useState } from "react";
import { navigationItems } from "./navigationItems";
import ShopRouter from "./ShopRouter";
import { Navbar, SideBar } from "../../components";
import { LayoutContainer, LayoutContent } from "../../styled-components/styles";

const ShopLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigationItems={navigationItems}
      />
      <LayoutContainer>
        <LayoutContent>
          <ShopRouter navigationItems={navigationItems} />
        </LayoutContent>
      </LayoutContainer>
    </>
  );
};

export default ShopLayout;
