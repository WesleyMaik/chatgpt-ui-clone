//Modules
import { PropsWithChildren } from "react";

//Components
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { QueryClientProvider } from "react-query";
import { query } from "@/services/query";

export interface IProvidersProps extends PropsWithChildren { };

export const Providers = ({ children, ...props }: IProvidersProps) => {
    return (
        <QueryClientProvider client={query}>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </QueryClientProvider>
    )
};