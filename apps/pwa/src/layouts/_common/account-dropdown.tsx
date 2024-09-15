import { Divider, MenuProps } from "antd";
import Dropdown, { DropdownProps } from "antd/es/dropdown/dropdown";
import React from "react";
import { NavLink } from "react-router-dom";

import { useThemeToken } from "../../theme/hooks";
import { useUserActions, useUserInfo } from "../../store/userStore";
import { IconButton } from "../../components/icon";
import { trpc } from "@/trpc/trpc";
import { useRouter } from "@/router/hooks";
import { UserOutlined } from "@ant-design/icons";


// biome-ignore lint/style/noDefaultExport: <explanation>
export default function AccountDropdown() {
  const { user } = useUserInfo();
  const { clearUserInfoAndToken } = useUserActions();
  const utils = trpc.useUtils();
  const router = useRouter();

  const logout = trpc.auth.logout.useMutation({
    onSuccess() {
      utils.auth.profile.reset();
      clearUserInfoAndToken();
      router.replace("/auth/login");
    },
  });

  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } =
    useThemeToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  const dropdownRender: DropdownProps["dropdownRender"] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{user?.name}</div>
        <div className="text-gray">{user?.email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/user/profile">{"Profile"}</NavLink>,
      key: "1",
    },
    {
      label: <button className="font-bold text-warning">{"Logout"}</button>,
      key: "3",
      onClick: () => {
        logout.mutate();
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={dropdownRender}
    >
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        {user?.profilePicture ? (
          <img
            className="h-8 w-8 rounded-full"
            src={user.profilePicture}
            alt=""
            referrerPolicy="no-referrer"
          />
        ) : (
          <UserOutlined />
        )}
      </IconButton>
    </Dropdown>
  );
}
