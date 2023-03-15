//Modules
import { css } from "@emotion/react";
import { useChat } from "@/store/chat";
import { useModal } from "@/hooks/useModal";

//Components
import {
    Badge,
    Button,
    Divider,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Stack,
    Text,
    useColorMode
} from "@chakra-ui/react";
import {
    FiCheckCircle,
    FiExternalLink,
    FiLogOut,
    FiMenu,
    FiMessageSquare,
    FiMoon,
    FiPlus,
    FiSun,
    FiTrash2,
    FiUser,
    FiX
} from "react-icons/fi";
import { CSSProperties, useEffect, useState } from "react";

export interface SideBarProps {
    isResponsive?: boolean
};

export const Sidebar = ({ isResponsive, ...props }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(true),
        handleOpen = () => setIsOpen(true),
        handleClose = () => setIsOpen(false);

    const { toggleColorMode, colorMode } = useColorMode();
    const { chat, selectedChat, setSelectedChat, removeChat, clearAll } = useChat();

    const {
        Modal: AccountModal,
        handleOpen: handleOpenAccountModal
    } = useModal();

    useEffect(() => {
        if (!isResponsive) handleClose();
    }, [isResponsive])

    const responsiveProps = isResponsive ? {
        position: "fixed" as CSSProperties['position'],
        left: isOpen ? 0 : '100%',
        top: 0
    } : {};

    return (
        <>
            {!!(isResponsive) && (
                <Stack
                    direction="row"
                    alignItems="center"
                    padding={2}
                >
                    <IconButton
                        aria-label="menu"
                        icon={<FiMenu />}
                        onClick={handleOpen}
                    />
                    <Spacer />
                    <Heading
                        size="md"
                    >{selectedChat?.role}</Heading>
                </Stack>
            )}
            {!!(isOpen) && (
                <Stack
                    width="full"
                    height="full"
                    position="absolute"
                    top={0}
                    left={0}
                    backgroundColor="whiteAlpha.700"
                />
            )}
            <Stack
                maxWidth={64}
                width="full"
                height="full"
                padding={2}
                color="white"
                backgroundColor="gray.900"
                zIndex={1}
                transition={['all', 'ease', '.5s']}
                {...responsiveProps}
            >
                {!!(isResponsive) && (
                    <IconButton
                        aria-label="close button"
                        icon={(<FiX />)}
                        position="absolute"
                        right={0}
                        transform={'translateX(125%)'}
                        colorScheme="red"
                        backgroundColor="gray.800"
                        color="white"
                        onClick={handleClose}
                    />
                )}
                <Button
                    leftIcon={<FiPlus size={16} />}
                    borderWidth={1}
                    borderColor="whiteAlpha.400"
                    rounded={4}
                    padding={2}
                    justifyContent="flex-start"
                    transition={["all", "ease", ".5s"]}
                    backgroundColor="transparent"
                    _hover={{
                        backgroundColor: "whiteAlpha.100"
                    }}
                >New chat</Button>
                <Stack
                    height="full"
                    overflowY="auto"
                >
                    {chat?.map(({ id, role }) => {
                        return (
                            <Button
                                id={id}
                                key={id}
                                cursor="pointer"
                                leftIcon={<FiMessageSquare />}
                                justifyContent="flex-start"
                                padding={2}
                                backgroundColor={
                                    (selectedChat?.id == id) ? ("#ffffff20") : ("transparent")
                                }
                                onClick={() => setSelectedChat({ id })}
                                _hover={{
                                    backgroundColor: "whiteAlpha.100"
                                }}
                                css={css`
                                .erase_icon{
                                    display:none;
                                }
                                &:hover{
                                    .erase_icon{
                                        display:block;
                                    }
                                }
                            `}
                            >
                                <Text>{role}</Text>
                                <Spacer />
                                <FiTrash2
                                    className="erase_icon"
                                    onClick={() => removeChat({ id })}
                                />
                            </Button>
                        );
                    })}
                </Stack>
                <Divider
                    marginY={2}
                    borderColor="white"
                />
                <Stack>
                    <Button
                        leftIcon={<FiTrash2 />}
                        justifyContent="flex-start"
                        padding={2}
                        onClick={clearAll}
                        backgroundColor="transparent"
                    >Clear conversations</Button>
                    <Button
                        padding={2}
                        justifyContent="space-between"
                        backgroundColor="transparent"
                        onClick={handleOpenAccountModal}
                    >
                        <Text
                            display="flex"
                            alignItems="center"
                            gap={2}
                        ><FiUser /> Upgrade to Plus</Text>
                        <Badge
                            backgroundColor="orange.200"
                            color="black"
                            paddingX={2}
                            rounded={4}
                        >New</Badge>
                    </Button>
                    <Button
                        justifyContent="flex-start"
                        padding={2}
                        onClick={toggleColorMode}
                        backgroundColor="transparent"
                        leftIcon={(colorMode == 'light') ? <FiSun /> : <FiMoon />}
                    >{(colorMode == 'light') ? ('Light mode') : ('Dark mode')}</Button>
                    <Button
                        leftIcon={<FiExternalLink />}
                        justifyContent="flex-start"
                        padding={2}
                        backgroundColor="transparent"
                    >Updates & FAQ</Button>
                    <Button
                        leftIcon={<FiLogOut />}
                        justifyContent="flex-start"
                        padding={2}
                        backgroundColor="transparent"
                    >Log Out</Button>
                </Stack>
            </Stack>
            <AccountModal title="Your account">
                <Stack
                    direction={!isResponsive ? "row" : "column"}
                    spacing={4}
                    padding={4}
                    divider={(
                        <Divider
                            orientation={!isResponsive ? "vertical" : "horizontal"}
                        />
                    )}
                >
                    <Stack>
                        <Heading
                            size="md"
                        >Free Plan</Heading>
                        <Button disabled>Your Current Plan</Button>
                        {[
                            "Available when demand is low",
                            "Standard response speed",
                            "Regular model updates"
                        ].map((text, key) => (
                            <Text
                                display="flex"
                                alignItems="center"
                                gap={2}
                                key={key}
                            ><FiCheckCircle />{text}</Text>
                        ))}
                    </Stack>
                    <Stack>
                        <Stack direction="row">
                            <Heading
                                size="md"
                            >ChatGPT Plus</Heading>
                            <Heading
                                color="purple.400"
                                size="md"
                            >USD $20/mo</Heading>
                        </Stack>
                        <Button colorScheme="green">Upgrade plan</Button>
                        {[
                            "Available even when demand is high",
                            "Faster response speed",
                            "Priority access to new features"
                        ].map((text, key) => (
                            <Text
                                display="flex"
                                alignItems="center"
                                gap={2}
                                key={key}
                            ><FiCheckCircle color="#1a7f64" />{text}</Text>
                        ))}
                    </Stack>
                </Stack>
            </AccountModal>
        </>
    );
};