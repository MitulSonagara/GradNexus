import { Menu, MenuProps } from "antd";
import { useState, useEffect, CSSProperties } from "react";
import { useNavigate, useMatches, useLocation } from "react-router-dom";

import { NAV_HORIZONTAL_HEIGHT } from "./config";
import { useThemeToken } from "../../theme/hooks";

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function NavHorizontal() {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { colorBgElevated } = useThemeToken();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([""]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    setOpenKeys(keys);
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };
  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={[]}
        className="!z-10 !border-none"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={menuStyle}
      />
    </div>
  );
}
