import { ThemeConfig, extendBaseTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

export const theme = extendBaseTheme({
    config,
});