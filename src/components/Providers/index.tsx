//Modules
import { PropsWithChildren } from "react";

//Components
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";

export interface IProvidersProps extends PropsWithChildren { };

export const Providers = ({ children, ...props }: IProvidersProps) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    )
};