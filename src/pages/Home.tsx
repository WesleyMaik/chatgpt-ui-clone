//Components
import { Stack, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar";
import { Chat } from "@/components/Chat";

export default function Home() {
    const [isResponsive] = useMediaQuery('(max-width: 800px)')

    return (
        <Stack
            direction={!isResponsive ? "row" : "column"}
            width="full"
            height="full"
            spacing={0}
        >
            <Sidebar
                isResponsive={isResponsive}
            />
            <Chat />
        </Stack>
    );
};