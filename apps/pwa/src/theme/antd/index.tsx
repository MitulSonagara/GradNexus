import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import { useSettings } from "../../store/settingStore";

import {
  customThemeTokenConfig,
  themeModeToken,
  colorPrimarys,
  customComponentConfig,
} from "./theme";

import { ThemeMode } from "../../types/enum";

type Props = {
  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  children: React.ReactNode;
};
// biome-ignore lint/style/noDefaultExport: <explanation>
export default function AntdConfig({ children }: Props) {
  const { themeMode } = useSettings();

  const algorithm =
    themeMode === ThemeMode.Light
      ? theme.defaultAlgorithm
      : theme.darkAlgorithm;
  const colorPrimary = colorPrimarys["purple"];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
          ...customThemeTokenConfig,
          ...themeModeToken[themeMode].token,
        },
        components: {
          ...customComponentConfig,
          ...themeModeToken[themeMode].components,
        },
        algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
