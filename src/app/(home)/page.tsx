"use client"

import ProjectForm from "@/modules/home/ui/components/project-form";
import ProjectList from "@/modules/home/ui/components/project-list";
import Image from "next/image";

const Page = () => {

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className=" space-y-6 py-[16vh] 2xl:py-48">
        <div className=" flex flex-col items-center">
          <Image
            src={"/logo-light.svg"}
            alt="Website gen"
            width={50}
            height={50}
            className="shrink-0 hidden md:block dark:md:hidden"
          />
          <Image
            src={"/logo-dark.svg"}
            alt="Website gen"
            width={50}
            height={50}
            className="shrink-0 hidden dark:md:block"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">AI Website Generator</h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">Create apps and websites by chatting with AI</p>
        <div className=" max-w-3xl w-full mx-auto">
          <ProjectForm />
        </div>
      </section>
      <ProjectList />
    </div>
  );
}

export default Page;