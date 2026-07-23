"use client";

import {Button} from "@/components/buttons/buttons";
import {useEffect, useRef} from "react";

interface ColorInputProps {
    ariaLabel?: string,
    icon?: string,
    onSelected: (hex: string) => void,
}

export function ColorInput(props: ColorInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current;
        if (!input) {
            return
        }

        const handleChange = () => props.onSelected(input.value);
        input.addEventListener("change", handleChange);
        return () => input.removeEventListener("change", handleChange);
    }, [props.onSelected]);

    return <>
        <input ref={inputRef} type="color" hidden/>
        <Button
            ariaLabel={props.ariaLabel ?? "Pick a color"}
            icon={props.icon ?? "palette"}
            onClick={() => inputRef.current?.click()}
        />
    </>
}