"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps {
    children: React.ReactNode;
    text: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end"
}

const Hint = ({ children, text, side, align }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>{text}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default Hint;