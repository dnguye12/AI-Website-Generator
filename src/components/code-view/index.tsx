import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"

import "./code-theme.css"
import { useEffect } from "react"

interface CodeViewProps {
    code: string;
    lang: string;
}

const CodeView = ({ code, lang }: CodeViewProps) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [code, lang])

    return (
        <pre className="p-2 bg-transparent border-none rounded-none m-0 text-xs overflow-y-scroll whitespace-pre max-h-[calc(100vh-101px)]">
            <code className={`language-${lang}`}>
                {code}
            </code>
        </pre>
    );
}

export default CodeView;