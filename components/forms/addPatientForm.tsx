"use client"
import { BaseUrl } from "@/app/constants"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import zod from "zod"
export default function AddPatientForm() {
    const formSchema = zod.object({
        name: zod.string(),
        diseases: zod.string(),
        allergies: zod.string(),
        roomNumber: zod.number().int(),
        bedNumber: zod.number().int(),
        floorNumber: zod.number().int(),
        age: zod.number().int(),
        gender: zod.string(),
        contactInfo: zod.string().min(10).max(10),
        emergencyContact: zod.string().min(10).max(10),
        dietaryNotes: zod.string()
    });
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur"
    });
    const QueryClient = useQueryClient()
    const MutateAddPatient = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${BaseUrl}/patient`, form.getValues(), {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            return response.data
        },
        onSuccess: () => {
            form.reset()
            QueryClient.invalidateQueries({
                queryKey: ["patients"]
            })
        }
    })
    return <div className="h-full w-full overflow-auto">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {
                MutateAddPatient.mutate()
            })} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="john doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={() => (
                        <FormItem>
                            <FormLabel>age</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="21" onChange={(e) => {
                                    form.setValue("age", parseInt(e.target.value))
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>gender</FormLabel>
                            <FormControl>
                                <Input placeholder="male" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>allergies</FormLabel>
                            <FormControl>
                                <Input placeholder="rabbies" {...field} />
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
                            <FormLabel>contactInfo</FormLabel>
                            <FormControl>
                                <Input placeholder="1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dietaryNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>dietaryNotes</FormLabel>
                            <FormControl>
                                <Input placeholder="none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="diseases"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>diseases</FormLabel>
                            <FormControl>
                                <Input placeholder="sugar" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>emergencyContact</FormLabel>
                            <FormControl>
                                <Input placeholder="9087654321" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="floorNumber"
                    render={() => (
                        <FormItem>
                            <FormLabel>floorNumber</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="4" onChange={(e) => {
                                    form.setValue("floorNumber", parseInt(e.target.value))
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="roomNumber"
                    render={() => (
                        <FormItem>
                            <FormLabel>roomNumber</FormLabel>
                            <FormControl>
                                <Input placeholder="21" type="number" onChange={(e) => {
                                    form.setValue("roomNumber", parseInt(e.target.value))
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bedNumber"
                    render={() => (
                        <FormItem>
                            <FormLabel>bedNumber</FormLabel>
                            <FormControl>
                                <Input placeholder="321" type="number" onChange={(e) => {
                                    form.setValue("bedNumber", parseInt(e.target.value))
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={MutateAddPatient.isPending} type="submit">Submit</Button>
            </form>
        </Form>
    </div>
}