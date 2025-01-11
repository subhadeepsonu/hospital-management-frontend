"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import zod from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { Input } from "../ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { BaseUrl } from "@/app/constants"
import { Button } from "../ui/button"

export default function AddpantryWorker(props: {
    role: string
}) {
    const formSchema = zod.object({
        email: zod.string().email(),
        password: zod.string(),
        name: zod.string(),
        contactInfo: zod.string().min(10).max(10)
    })

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur"
    })

    const queryClient = useQueryClient()

    const MutateStaff = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${BaseUrl}/manager/staff`, {
                ...form.getValues(),
                role: props.role
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            form.setValue("email", "")
            form.setValue("password", "")
            form.setValue("name", "")
            form.setValue("contactInfo", "")
            queryClient.invalidateQueries({
                queryKey: ["pantry"]
            })
            queryClient.invalidateQueries({
                queryKey: ["delivary"]
            })
        }
    })

    return (
        <div className="h-full w-full overflow-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(() => {
                    MutateStaff.mutate()
                })} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="doe@xyz.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactInfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Info</FormLabel>
                                <FormControl>
                                    <Input placeholder="contactInfo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={MutateStaff.isPending} type="submit">submit</Button>
                </form>
            </Form>
        </div>
    )
}
