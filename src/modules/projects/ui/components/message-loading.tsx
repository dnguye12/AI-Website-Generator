import Image from "next/image";
import { useEffect, useState } from "react";

const SkeletonMessages = () => {
    const messages = [
        "Thinking...",
        "Loading...",
        "Generating...",
        "Analyzing your request...",
        "Building your website...",
        "Crafting components...",
        "Optimizing layout...",
        "Adding final touches...",
        "Almost ready...",

    ]

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [messages.length])

    return (
        <div className="flex items-center gap-2">
            <span className="text-muted-foreground animate-pulse">
                {messages[currentMessageIndex]}
            </span>
        </div>
    )
}

const MessageLoading = () => {
    return (
        <div className="flex flex-col group px-2 pb-4">
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image
                    src={"/logo-light.svg"}
                    alt="Website gen"
                    width={18}
                    height={18}
                    className="shrink-0 block dark:hidden"
                />
                <Image
                    src={"/logo-dark.svg"}
                    alt="Website gen"
                    width={18}
                    height={18}
                    className="shrink-0 hidden dark:block"
                />
                <span className="text-sm font-medium">Website Gen</span>
            </div>
            <div className="pl-8.5 flex flex-col gap-y-4">
                <SkeletonMessages />
            </div>
        </div>
    );
}

export default MessageLoading;