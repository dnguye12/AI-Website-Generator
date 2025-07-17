import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Fragment } from "@/generated/prisma";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";

interface FragmentWebProps {
    activeFragment: Fragment
}

const FragmentWeb = ({ activeFragment }: FragmentWebProps) => {
    const [fragmentKey, setFragmentKey] = useState(0)
    const [copied, setCopied] = useState(false)

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(activeFragment.sandboxUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hint text="Click to refresh" side="bottom">
                    <Button size={"sm"} variant={"outline"} onClick={onRefresh}>
                        <RefreshCcwIcon />
                    </Button>
                </Hint>
                <Hint text="Click to copy" side="bottom">
                    <Button size={"sm"} variant={"outline"} onClick={handleCopy} className="flex-1 justify-start text-start" disabled={!activeFragment.sandboxUrl || copied}>
                        <span className="truncate">
                            {activeFragment.sandboxUrl}
                        </span>
                    </Button>
                </Hint>
                <Hint text="Open in a new tab" side="bottom" align="end">
                    <Button
                        size={"sm"}
                        variant={"outline"}
                        disabled={!activeFragment.sandboxUrl}
                        onClick={() => {
                            if (!activeFragment.sandboxUrl) {
                                return;
                            }
                            window.open(activeFragment.sandboxUrl, "_blank")
                        }}>
                        <ExternalLinkIcon />
                    </Button>
                </Hint>
            </div>
            <iframe
                key={fragmentKey}
                className="w-full h-full"
                sandbox="allow-forms allow-scripts allow-same-origin"
                loading="lazy"
                src={activeFragment.sandboxUrl}
            />
        </div>
    );
}

export default FragmentWeb;