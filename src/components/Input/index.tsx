import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input as DefaultInput,
    InputProps as DefaultInputProps,
    InputGroup,
    InputRightElement,
    InputLeftElement
} from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

export interface InputProps extends DefaultInputProps {
    helperText?: string,
    errorMessage?: string,
    label?: string,
    inputLeftAddon?: ReactNode,
    inputRightAddon?: ReactNode,
    required?: boolean
};

export interface InputRef extends HTMLInputElement { }

export const Input = forwardRef<InputRef, InputProps>((
    { errorMessage, label, helperText, inputLeftAddon, inputRightAddon, required, ...props }, ref
) => {
    return (
        <FormControl isInvalid={Boolean(errorMessage)} isRequired={required}>
            <FormLabel>{label}</FormLabel>
            <InputGroup
                alignItems="center"
            >
                {!!inputLeftAddon && <InputLeftElement>{inputLeftAddon}</InputLeftElement>}
                <DefaultInput {...props} ref={ref} />
                {!!inputRightAddon && <InputRightElement>{inputRightAddon}</InputRightElement>}
            </InputGroup>
            {!errorMessage ? (
                <FormHelperText>{helperText}</FormHelperText>
            ) : (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            )}
        </FormControl>
    );
});

Input.displayName = "Input";