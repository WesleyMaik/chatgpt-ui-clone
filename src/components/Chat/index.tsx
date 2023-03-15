//Modules
import gptAvatar from "@/assets/gpt-avatar.svg"
import { useChat } from "@/store/chat";
import { useForm } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react"

//Components
import { Input } from "@/components/Input";
import { IconType } from "react-icons";
import { FiAlertTriangle, FiSend, FiSun, FiZap } from "react-icons/fi";
import {
    Avatar,
    Button,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Stack,
    Text
} from "@chakra-ui/react";

export interface ChatProps { };

interface ChatSchema {
    input: string
};

type Introdution = {
    icon: IconType,
    name: "Examples" | "Capabilities" | "Limitations",
    list: string[]
};

export const Chat = ({ ...props }: ChatProps) => {
    const { selectedChat, setSelectedChat } = useChat();
    const { register, setValue } = useForm<ChatSchema>();

    const [parentRef] = useAutoAnimate();

    const introdution: Introdution[] = [
        {
            icon: FiSun,
            name: "Examples",
            list: [
                "Explain quantum computing in simple terms",
                "Got any creative ideas for a 10 year old's birthday?",
                "How do i make an HTTP request in JavaScript?"
            ]
        },
        {
            icon: FiZap,
            name: "Capabilities",
            list: [
                "Remembers what user said earlier in the conversation",
                "Allows user to provide follow-up corrections",
                "Trained to decline inappropriate requests"
            ]
        },
        {
            icon: FiAlertTriangle,
            name: "Limitations",
            list: [
                "May occasionally generate incorrect information",
                "May occasionally produce harmful instructions or biased content",
                "Limited knowledge of world and events after 2021"
            ]
        }
    ];

    return (
        <Stack
            width="full"
            height="full"
        >
            <Stack
                maxWidth="768px"
                width="full"
                height="full"
                marginX="auto"
            >
                <Stack
                    spacing={2}
                    height="full"
                    padding={2}
                    ref={parentRef}
                >
                    {(selectedChat && selectedChat?.content.length > 0) ? (
                        selectedChat.content.map(({ emitter, message }, key) => {
                            return (
                                <Stack
                                    key={key}
                                    direction="row"
                                    alignItems="center"
                                    padding={4}
                                    rounded={8}
                                    backgroundColor={
                                        (emitter == 'gpt') ? ("blackAlpha.200") : ("transparent")
                                    }
                                >
                                    <Avatar
                                        name={emitter}
                                        src={
                                            (emitter == 'gpt') ? (gptAvatar) : (undefined)
                                        }
                                    />
                                    <Text>{message}</Text>
                                </Stack>
                            )
                        })
                    ) : (
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            height="full"
                        >
                            <Heading
                                size="lg"
                                marginY={8}
                            >ChatGPT</Heading>
                            <Stack
                                direction="row"
                            >
                                {introdution.map(({ icon, list, name }, key) => {
                                    const handleClick = (text: string) => {
                                        if (name == 'Examples') {
                                            return () => setValue('input', text);
                                        };
                                        return undefined;
                                    };

                                    return (
                                        <Stack
                                            key={key}
                                            alignItems="center"
                                        >
                                            <Icon
                                                as={icon}
                                            />
                                            <Heading size="sm">{name}</Heading>
                                            {list.map((text, key) => (
                                                <Button
                                                    key={key}
                                                    maxWidth={64}
                                                    height="fit-content"
                                                    padding={4}
                                                    onClick={handleClick(text)}
                                                >
                                                    <Text
                                                        overflow="hidden"
                                                        whiteSpace="normal"
                                                    >{text}</Text>
                                                </Button>
                                            ))}
                                        </Stack>
                                    )
                                })}
                            </Stack>
                        </Stack>
                    )}
                </Stack>
            </Stack>
            <Spacer />
            <Stack
                backgroundColor="blackAlpha.400"
                padding={4}
            >
                <Input
                    autoFocus={true}
                    variant="filled"
                    inputRightAddon={(
                        <IconButton
                            aria-label="send_button"
                            icon={<FiSend />}
                            backgroundColor="transparent"
                        />
                    )}
                    {...register('input')}
                />
                <Text
                    textAlign="center"
                    fontSize="sm"
                    opacity={.5}
                >Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.</Text>
            </Stack>
        </Stack>
    );
};