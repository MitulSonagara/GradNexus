import { Flex, FlexProps, } from "antd";
import { Link } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { ThemeMode } from "@/types/enum";
import { useSettings } from "@/store/settingStore";

type LogoProps = {
  color?: CSSProperties["color"];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties["backgroundColor"];
} & Partial<FlexProps>;

export const Logo = ({
  asLink,
  href,
  imgSize,
  ...others
}: LogoProps) => {

  const settings = useSettings()
  const { themeMode } = settings;
  const [themee, setThemee] = useState(themeMode);

  useEffect(() => {
    setThemee(themeMode)
  },[themeMode])

  return asLink ? (
    <Link to={href || "#"} className="logo-link">
      <Flex gap={others.gap || "small"} align="center" {...others}>
        <img
          src={themee === ThemeMode.Light ? "/favicon/Light.png" : "/favicon/Dark.png"}
          alt="Logo"
          height={imgSize?.h || 128}
        />
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || "small"} align="center" {...others}>
      <img
        src={themee === ThemeMode.Light ? "/favicon/Light.png" : "/favicon/Dark.png"}
        alt="Logo"
        height={imgSize?.h || 128}
      />
    </Flex>
  );
};
