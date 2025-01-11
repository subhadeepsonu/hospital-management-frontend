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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Input } from "../ui/input"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { BaseUrl } from "@/app/constants"
import { Button } from "../ui/button"

export default function AddDeitFormPlan(props: {
    id: number
}) {
    const formSchema = zod.object({
        mealType: zod.enum(["BREAKFAST", "LUNCH", "DINNER"]),
        ingredients: zod.string(),
        instructions: zod.string().optional(),
        delivaryId: zod.number(),
        pantryId: zod.number()
    })
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur"
    })
    const id = props.id
    const queryClient = useQueryClient()
    const MutateDietPlan = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${BaseUrl}/diet`, {
                ...form.getValues(),
                patientId: id
            }, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["patient"]
            })
        }
    })
    const QueryDelivary = useQuery({
        queryKey: ["delivary"],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/delivary`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },
    })
    const QueryPantry = useQuery({
        queryKey: ["pantry"],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/pantry`, {
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
                MutateDietPlan.mutate()
            })} className="space-y-8">
                <FormField
                    control={form.control}
                    name="mealType"
                    render={() => (
                        <FormItem>
                            <FormLabel>MealType</FormLabel>
                            <FormControl>
                                <Select onValueChange={(e: any) => {
                                    form.setValue('mealType', e)
                                }} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                                        <SelectItem value="LUNCH">Lunch</SelectItem>
                                        <SelectItem value="DINNER">Dinner</SelectItem>
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pantryId"
                    render={() => (
                        <FormItem>
                            <FormLabel>Pantry</FormLabel>
                            <FormControl>
                                <Select onValueChange={(e) => {
                                    form.setValue('pantryId', parseInt(e))
                                }} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="select Pantry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {QueryPantry.data ? QueryPantry.data.message.map((pantry: any) => {
                                            return <SelectItem value={pantry.id}>{pantry.name}</SelectItem>
                                        }) : null}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="delivaryId"
                    render={() => (
                        <FormItem>
                            <FormLabel>Delivary</FormLabel>
                            <FormControl>
                                <Select onValueChange={(e) => {
                                    form.setValue('delivaryId', parseInt(e))
                                }} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="select Delivary" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {QueryDelivary.data ? QueryDelivary.data.data.map((delivary: any) => {
                                            return <SelectItem value={delivary.id}>{delivary.name}</SelectItem>
                                        }) : null}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ingredients</FormLabel>
                            <FormControl>
                                <Input placeholder="Morning" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Input placeholder="Morning" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={MutateDietPlan.isPending} type="submit">Add</Button>
            </form>
        </Form>

    </div >

}