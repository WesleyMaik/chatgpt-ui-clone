//Modules
import { useChat } from "@/store/chat";
import { useModal } from "@/hooks/useModal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CSSProperties, useEffect, useState } from "react";
import store from "store2";
import { motion } from "framer-motion";

//Components
import {
    Badge,
    Button,
    Divider,
    Heading,
    IconButton,
    Spacer,
    Stack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import {
    FiCheckCircle,
    FiExternalLink,
    FiKey,
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
import {
    APIKeyModal as APIKeyModalContent
} from "../Layout/APIKeyModal";

export interface SideBarProps {
    isResponsive?: boolean
};

export const Sidebar = ({ isResponsive, ...props }: SideBarProps) => {
    const [isOpen, setIsOpen] = useState(true),
        handleOpen = () => setIsOpen(true),
        handleClose = () => setIsOpen(false);

    const [listRef] = useAutoAnimate();

    const { toggleColorMode, colorMode } = useColorMode();
    const {
        chat,
        selectedChat,
        addChat,
        setSelectedChat,
        removeChat,
        clearAll
    } = useChat();

    const {
        Modal: AccountModal,
        handleOpen: handleOpenAccountModal
    } = useModal();
    const {
        Modal: APIKeyModal,
        handleOpen: handleOpenAPIKeyModal,
        handleClose: handleCloseAPIKeyModal
    } = useModal();

    useEffect(() => {
        if (!isResponsive) handleClose();
    }, [isResponsive]);

    useEffect(() => {
        store.session("@chat", JSON.stringify(chat));
    }, [chat, selectedChat])

    const responsiveProps = isResponsive ? {
        position: "fixed" as CSSProperties['position'],
        left: isOpen ? 0 : '-100%',
        top: 0
    } : {};

    return (
        <>
            {!!(isResponsive) && (
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={2}
                >
                    <IconButton
                        aria-label="menu"
                        icon={<FiMenu />}
                        onClick={handleOpen}
                    />
                    <Heading
                        size="md"
                    >{selectedChat?.role}</Heading>
                    <IconButton
                        aria-label="add"
                        icon={<FiPlus />}
                        onClick={() => addChat()}
                    />
                </Stack>
            )}
            {!!(isOpen) && (
                <Stack
                    as={motion.div}
                    width="full"
                    height="full"
                    position="absolute"
                    top={0}
                    left={0}
                    backgroundColor="whiteAlpha.700"
                    transition="all ease .5s"
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
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
                transition="all ease .5s"
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
                    transition="all ease .5s"
                    backgroundColor="transparent"
                    onClick={() => addChat()}
                    _hover={{
                        backgroundColor: "whiteAlpha.100"
                    }}
                >New chat</Button>
                <Stack
                    height="full"
                    overflowY="auto"
                    ref={listRef}
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
                                overflow="hidden"
                                textOverflow="ellipsis"
                                backgroundColor={
                                    (selectedChat?.id == id) ? ("#ffffff20") : ("transparent")
                                }
                                onClick={() => setSelectedChat({ id })}
                                _hover={{
                                    backgroundColor: "whiteAlpha.100"
                                }}
                            >
                                <Text>{role}</Text>
                                <Spacer />
                                <FiTrash2
                                    className="icon"
                                    onClick={() => removeChat({ id })}
                                    style={{
                                        display: (selectedChat?.id == id) ? ("block") : ("none")
                                    }}
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
                        _hover={{
                            backgroundColor: "blackAlpha.300"
                        }}
                    >Clear conversations</Button>
                    <Button
                        padding={2}
                        justifyContent="space-between"
                        backgroundColor="transparent"
                        onClick={handleOpenAccountModal}
                        _hover={{
                            backgroundColor: "blackAlpha.300"
                        }}
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
                        leftIcon={(colorMode == 'dark') ? <FiSun /> : <FiMoon />}
                        _hover={{
                            backgroundColor: "blackAlpha.300"
                        }}
                    >{(colorMode == 'dark') ? ('Light mode') : ('Dark mode')}</Button>
                    <Button
                        leftIcon={<FiExternalLink />}
                        justifyContent="flex-start"
                        padding={2}
                        backgroundColor="transparent"
                        _hover={{
                            backgroundColor: "blackAlpha.300"
                        }}
                    >Updates & FAQ</Button>
                    <Button
                        leftIcon={<FiLogOut />}
                        justifyContent="flex-start"
                        padding={2}
                        backgroundColor="transparent"
                        _hover={{
                            backgroundColor: "blackAlpha.300"
                        }}
                    >Log Out</Button>
                    <Button
                        leftIcon={<FiKey />}
                        padding={2}
                        justifyContent="flex-start"
                        backgroundColor="transparent"
                        onClick={handleOpenAPIKeyModal}
                        _hover={{
                            backgroundColor: "blackAlpha.300"
                        }}
                    >Change API Key</Button>
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
            <APIKeyModal
                title="API Key"
            >
                <APIKeyModalContent
                    onConfirm={handleCloseAPIKeyModal}
                />
            </APIKeyModal>
        </>
    );
};