"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MessagesContainer from "../components/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import ProjectHeader from "../components/project-header";
import FragmentWeb from "../components/fragment-web";
import { CodeIcon, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FileExplorer from "@/components/file-explorer";
import UserControl from "@/components/user-control";
import { useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";

interface ProjectViewProps {
    projectId: string
}

const ProjectView = ({ projectId }: ProjectViewProps) => {
    const { has } = useAuth()
    const hasProAccess = has?.({ plan: "pro" })

    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
    const [tabState, setTabState] = useState<"preview" | "code">("preview")

    return (
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35} minSize={20} className="flex flex-col min-h-0">
                    <ErrorBoundary fallback={<p>Error</p>}>
                        <Suspense fallback={<p>...Loading project</p>}>
                            <ProjectHeader />
                        </Suspense>
                    </ErrorBoundary>
                    <ErrorBoundary fallback={<p>Error</p>}>
                        <Suspense fallback={<p>...Loading messages</p>}>
                            <MessagesContainer
                                projectId={projectId}
                                activeFragment={activeFragment}
                                setActiveFragment={setActiveFragment}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={65} minSize={50} className="">
                    <Tabs
                        className="h-full gap-y-0"
                        defaultValue="preview"
                        value={tabState}
                        onValueChange={(value) => setTabState(value as "preview" | "code")}
                    >
                        <div className=" w-full flex items-center p-2 border-b- gap-x-2">
                            <TabsList className=" h-8 p-0 border rounded-md">
                                <TabsTrigger value="preview" className="rounded-md">
                                    <EyeIcon /> <span>Demo</span>
                                </TabsTrigger>
                                <TabsTrigger value="code" className="rounded-md">
                                    <CodeIcon /> <span>Code</span>
                                </TabsTrigger>
                            </TabsList>
                            <div className=" ml-auto flex items-center gap-x-2">
                                {!hasProAccess && (
                                    <Button asChild size={"sm"} variant={"tertiary"}>
                                        <Link href="/pricing">
                                            <CrownIcon /> Upgrade
                                        </Link>
                                    </Button>
                                )}
                                <UserControl />
                            </div>
                        </div>
                        <TabsContent value="preview" className="min-h-0">
                            {!!activeFragment && <FragmentWeb activeFragment={activeFragment} />}.
                        </TabsContent>
                        <TabsContent value="code">
                            {!!activeFragment?.files && (
                                <FileExplorer files={activeFragment.files as { [path: string]: string }} />
                            )}
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ProjectView;