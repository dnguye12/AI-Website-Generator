import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, Loader2Icon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Usage from './usage';
import { useRouter } from 'next/navigation';

interface MessageFormProps {
    projectId: string
}

const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Value is required" })
        .max(10000, { message: "Value is too long" })
})

const MessageForm = ({ projectId }: MessageFormProps) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()

    const { data: usage } = useQuery(trpc.usages.status.queryOptions())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ""
        }
    })

    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            form.reset()
            queryClient.invalidateQueries(
                trpc.messages.getMany.queryOptions({ projectId })
            )
            queryClient.invalidateQueries(
                trpc.usages.status.queryOptions()
            )
        },
        onError: (error) => {
            toast.error(error.message)

            if (error.data?.code === "TOO_MANY_REQUESTS") {
                router.push("/pricing")
            }
        }
    }))

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createMessage.mutateAsync({
            value: values.value,
            projectId
        })
    }

    const isPending = createMessage.isPending
    const isDisabled = isPending || !form.formState.isValid
    const [isFocused, setIsFocused] = useState(false)
    const showUsage = !!usage

    return (
        <Form {...form}>
            {showUsage && (
                <Usage
                    points={usage.remainingPoints}
                    msBeforeNext={usage.msBeforeNext}
                />
            )}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "relative border p-4 pt-1 rounded-xl bg-sidebar transition-all",
                    isFocused && "shadow",
                    showUsage && "rounded-t-none"
                )}
            >
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <TextareaAutosize
                            {...field}
                            disabled={isPending}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            minRows={2}
                            maxRows={8}
                            className='pt-4 resize-none border-none w-full outline-none bg-transparent'
                            placeholder='What would you like to build?'
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault()
                                    form.handleSubmit(onSubmit)(e)
                                }
                            }}
                        />
                    )}
                />
                <div className='flex gap-x-2 items-end justify-between pt-2'>
                    <div className='text-xs text-muted-foreground font-mono'>
                        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium'>
                            <span>&#8984;</span>Enter
                        </kbd>
                        &nbsp;to submit
                    </div>
                    <Button
                        disabled={isDisabled}
                        className={cn(
                            "size-8 rounded-full",
                            isDisabled && "bg-muted-foreground borrder"
                        )}>
                        {
                            isPending
                                ?
                                (
                                    <Loader2Icon className='size-4 animate-spin' />
                                )
                                :
                                (
                                    <ArrowUpIcon />
                                )
                        }

                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default MessageForm;