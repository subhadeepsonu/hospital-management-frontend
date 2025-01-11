"use client"
import { BaseUrl } from "@/app/constants"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import zod from "zod"
export default function AddTaskForm() {
    const formSchema = zod.object({
        username: zod.string().nonempty("Username is required"),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
    })
    const QUeryStaff = useQuery({
        queryKey: ["staff"],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/staff`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },
    })
    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {
                console.log(form.getValues())
            })} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </div>
}