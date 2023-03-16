import { useAPI } from "@/store/api";
import { Button, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiKey } from "react-icons/fi";
import { Input } from "../Input";

type APIKeyScheme = {
    key: string
};

export interface APIKeyProps {
    onConfirm?: () => void
};

export const APIKeyModal = ({ onConfirm }: APIKeyProps) => {
    const { setAPI } = useAPI();
    const { register, handleSubmit, reset, setError, formState: { errors, } } = useForm<APIKeyScheme>();

    const handleChangeAPIKey = ({ key }: APIKeyScheme) => {
        if (!key) {
            setError('key', { message: 'Required' });
            return;
        };
        setAPI(key);
        reset({ key: "" });
        if (onConfirm) onConfirm();
    };

    return (
        <Stack
            width="full"
        >
            <Text>If you want to change the API Key if it is not working or is wrong, you can change it in the field below.</Text>
            <Input
                inputLeftAddon={<FiKey />}
                placeholder="Enter your API Key from ChatGPT here."
                {...register('key')}
                errorMessage={errors.key?.message}
                isRequired
            />
            <Button
                colorScheme="green"
                onClick={handleSubmit(handleChangeAPIKey)}
            >Change API Key</Button>
        </Stack>
    );
};
