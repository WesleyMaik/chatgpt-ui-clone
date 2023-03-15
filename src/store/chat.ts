import { create } from "zustand";

export interface UseChatProps {
    chat: Chat[],
    selectedChat: Chat | undefined,
    setChat: (payload: Chat) => void,
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

type ChatContentEmmiter = "gpt" | "user";

const initialChatState: Chat[] = [
    {
        id: '1',
        role: 'JavaScript',
        content: [
            {
                emitter: "user",
                message: "What's JavaScript?"
            },
            {
                emitter: "gpt",
                message: "JavaScript is a programming language."
            }
        ],
    },
    {
        id: '2',
        role: 'Python',
        content: [
            {
                emitter: "user",
                message: "Which the most used programming language in 2022?"
            },
            {
                emitter: "gpt",
                message: "It's Python."
            }
        ],
    }
];

export const useChat = create<UseChatProps>((set) => ({
    chat: initialChatState,
    selectedChat: initialChatState[0],
    setChat: async (payload) => set(({ chat }) => ({ chat: [...chat, payload] })),
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