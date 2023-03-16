import { create } from "zustand";
import { v4 } from 'uuid';
import store from "store2";

export interface UseChatProps {
    chat: Chat[],
    selectedChat: Chat | undefined,
    setChat: (payload: Chat) => void,
    addChat: (callback?: (id: string) => void) => void,
    editChat: (id: string, payload: Partial<Chat>) => void,
    addMessage: (id: string, action: ChatContent) => void,
    setSelectedChat: (payload: { id: string }) => void,
    removeChat: (pyload: { id: string }) => void,
    clearAll: () => void,
};

type Chat = {
    id: string,
    role: string,
    content: ChatContent[]
};

type ChatContent = {
    emitter: ChatContentEmmiter,
    message: string
};

type ChatContentEmmiter = "gpt" | "user" | "error";

const savedChats = JSON.parse(store.session("@chat"));
const getSafeSavedChats = () => {
    if (Array.isArray(savedChats) && savedChats.length > 0) {
        return savedChats;
    };

    return undefined;
};

const initialChatState: Chat[] = getSafeSavedChats() || [
    {
        id: '1',
        role: 'About this website',
        content: [
            {
                emitter: "user",
                message: "What website is this?"
            },
            {
                emitter: "gpt",
                message: "This website is a clone of the ChatGPT website interface created by @WesleyMaik.\n\nYou can also send commands to the original site, with the help of the official ChatGPT API."
            }
        ],
    },
    {
        id: '2',
        role: 'Follow me 😉',
        content: [
            {
                emitter: "user",
                message: "Follow me on \nTwitter [@euwesleymaik](https://twitter.com/euwesleymaik)\nInstagram [eumaik_](https://instagram.com/eumaik_)\nGitHub [WesleyMaik](https://github.com/wesleymaik)"
            },
            {
                emitter: "gpt",
                message: "Thanks!"
            }
        ],
    }
];

export const useChat = create<UseChatProps>((set, get) => ({
    chat: initialChatState,
    selectedChat: initialChatState[0],
    setChat: async (payload) => set(({ chat }) => ({ chat: [...chat, payload] })),
    addChat: async (callback) => {
        const hasNewChat = get().chat.find(({ content }) => (content.length === 0));

        if (!hasNewChat) {
            const id = v4()
            get().setChat({
                role: "New chat",
                id: id,
                content: []
            });
            get().setSelectedChat({ id });
            if (callback) callback(id);
        } else {
            const { id } = hasNewChat;
            get().setSelectedChat({ id });
            if (callback) callback(id);
        };
    },
    editChat: async (id, payload) => set(({ chat }) => {
        const selectedChat = chat.findIndex((query) => (query.id === id));
        if (selectedChat > -1) {
            chat[selectedChat] = { ...chat[selectedChat], ...payload };
            return ({ chat, selectedChat: chat[selectedChat] })
        };
        return ({});

    }),
    addMessage: async (id, action) => set(({ chat }) => {
        const selectedChat = chat.findIndex((query) => (query.id === id)),
            props = chat[selectedChat];

        if (selectedChat > -1) {
            chat[selectedChat] = { ...props, content: [...props['content'], action] }
            return ({ chat, selectedChat: chat[selectedChat] });
        };

        return ({});
    }),
    setSelectedChat: async (payload) => set(({ chat }) => {
        const selectedChat = chat.find(({ id }) => id === payload.id);
        return ({ selectedChat: selectedChat })
    }),
    removeChat: async (payload) => set(({ chat }) => {
        const newChat = chat.filter(({ id }) => id !== payload.id);
        return ({ chat: newChat });
    }),
    clearAll: async () => set({ chat: [], selectedChat: undefined })
}));