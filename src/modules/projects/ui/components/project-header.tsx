import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface ProjectHeaderProps {
    projectId: string
}

const ProjectHeader = ({ projectId }: ProjectHeaderProps) => {
    const trpc = useTRPC()
    const { data: project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({ projectId }))

    const { setTheme, theme } = useTheme()

    return (
        <header className="p-2 flex justify-between items-center border-b">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"sm"} className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity !pl-2">
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
                        <ChevronDownIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start">
                    <DropdownMenuItem asChild>
                        <Link href={"/"}>
                            <ChevronLeftIcon />
                            <span>
                                Go to dashboard
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="gap-2">
                            <SunMoonIcon className="size-4 text-muted-foreground" />
                            <span>Appearance</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                                    <DropdownMenuRadioItem value="light">
                                        <span>Light</span>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="dark">
                                        <span>Dark</span>
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="system">
                                        <span>System</span>
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}

export default ProjectHeader;