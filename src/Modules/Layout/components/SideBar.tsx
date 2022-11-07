import styled from "styled-components";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { themeColors } from "../../../Common/Constants/themeColors";
import SVG from "react-inlinesvg";
import { theme } from "../../../Common/Constants/theme";
import mobileMenu from "../../../Asserts/Icons/mobileMenu.svg";
import { sideBarMenu, SideBarMenuItem } from "../../../Common/Constants/menu";
import { ModalConfirm } from "../../../Common/Components/ModalConfirm";
import { useAppDispatch } from "../../../Config/Redux/core";
import { userActions } from "../../Auth/userSlice";
import useMatchMedia from "use-match-media-hook";
import { matchMedieQueries } from "../../../Common/Constants/matchMediaqueries";
import { Drawer } from "antd";

const SideBarContainer = styled.div`
  flex: 0 0 200px;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  width: 200px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  position: fixed;

  @media (max-width: ${theme.mobile}) {
    position: fixed;
    top: 0;
    height: 52px;
    //flex: 0 0 52px;

    width: 100%;
    padding: 10px 16px;
    background: ${themeColors.gray2};
    box-shadow: none;
  }
  .my-special-modal {
    .ant-modal-body {
      height: calc(100vh - 110px);
      padding: 24px 20px;
    }
  }
`;
const SideBarList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  height: calc(100vh - 36px);

  @media (max-width: ${theme.mobile}) {
    width: 200px;
    height: 100vh;
    overflow: hidden;
    margin: -24px;
  }
`;
const NavContainer = styled.div``;
const NavBarLink = styled.div`
  height: 22spx;
  padding: 9px 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) =>
    props.className?.includes("active")
      ? themeColors.blue1
      : themeColors.gray1};
  box-shadow: ${(props) =>
    props.className?.includes("active")
      ? "inset -3px 0" + themeColors.blue6
      : "none"};
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${(props) =>
    props.className?.includes("active")
      ? themeColors.blue6
      : themeColors.gray8};

  svg {
    width: 14px;
  }
`;
const LogoText = styled.p`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin: 0 0 4px 0;
  color: ${themeColors.gray10};
  @media (max-width: ${theme.mobile}) {
    text-align: left;
  }
`;
const MobileMenuButton = styled.img`
  position: absolute;
  top: 17.75px;
  right: 18.5px;
  //background: url(${mobileMenu});
  width: 0px;
  height: 16.5px;
  @media (max-width: ${theme.mobile}) {
    width: 18.75px;
  }
`;

export const SideBar = () => {
  const [currentItem, setCurrentItem] = useState(sideBarMenu[0]);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const itemIsActive = (item: SideBarMenuItem) =>
    path.endsWith(item.link) || path.includes(item.link + "/");

  const onItemClick = (item: SideBarMenuItem) => {
    setCurrentItem(item);
    if (item.isLogout) {
      setIsLogoutConfirmOpen(true);
    } else {
      navigate(item.link);
    }
  };

  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(
    false
  );
  const dispatch = useAppDispatch();
  const handleLogoutOk = () => {
    setIsLogoutConfirmOpen(false);
    dispatch(userActions.logoutUser());
    navigate(currentItem.link);
  };
  const handleLogoutCancel = () => {
    setIsLogoutConfirmOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleMobileSideBar = () => setIsOpen(!isOpen);
  const [mobile] = useMatchMedia(matchMedieQueries);
  const sideBarlist = (
    <SideBarList>
      {sideBarMenu.map((item) => (
        <NavContainer
          key={item.label}
          className={itemIsActive(item) ? "active" : ""}
          style={item.isLogout ? { marginTop: "auto" } : {}}
        >
          <NavBarLink
            onClick={() => onItemClick(item)}
            className={itemIsActive(item) ? "active" : ""}
          >
            <SVG
              src={item.img}
              fill={itemIsActive(item) ? themeColors.blue6 : themeColors.gray8}
            />
            <label>{item.label}</label>
          </NavBarLink>
        </NavContainer>
      ))}
    </SideBarList>
  );

  return (
    <SideBarContainer>
      <LogoText>StaffPro</LogoText>
      {mobile ? (
        <>
          <MobileMenuButton src={mobileMenu} onClick={toggleMobileSideBar} />
          <Drawer
            placement="left"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            headerStyle={{ display: "none" }}
            width={200}
          >
            {sideBarlist}
          </Drawer>
        </>
      ) : (
        <>{sideBarlist}</>
      )}

      <ModalConfirm
        open={isLogoutConfirmOpen}
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
        title="Выход из аккаунт"
        text="Вы действительно хотите выйти из аккаунта?"
      />
    </SideBarContainer>
  );
};
