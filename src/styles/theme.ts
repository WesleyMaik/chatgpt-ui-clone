import { ThemeConfig, extendTheme, defineStyleConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

const Button = defineStyleConfig({
    baseStyle: {
        cursor: "pointer"
    }
});

export const theme = extendTheme({
    config,
    components: {
        Button,
    }
});