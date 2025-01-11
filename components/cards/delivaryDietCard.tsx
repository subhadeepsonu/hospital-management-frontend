"ise  client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";
import { BaseUrl } from "@/app/constants";

import { toast } from "sonner";

export default function DelivaryDietCard(props: {
    id: number,
    pantry: string,
    delivary: string,
    time: string,
    Instruction: string,
    Ingredients: string,
    status: string
}) {
    const QuryClient = useQueryClient()
    const MutateStatus = useMutation({
        mutationFn: async () => {
            const response = await axios.put(`${BaseUrl}/delivary/updatetask/${props.id}`, {

            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data

        },
        onSuccess(data) {
            if (data.success) {
                QuryClient.invalidateQueries({
                    queryKey: ["delivary"]
                })
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        },
    })
    return <Card className="w-full">
        <CardHeader>
            <CardTitle>Pantry: {props.pantry}</CardTitle>
            <CardDescription>Delivary: {props.delivary}</CardDescription>
        </CardHeader>
        <CardContent>
            <CardDescription>Time:{props.time}</CardDescription>
            <CardDescription>Instructions:{props.Instruction}</CardDescription>
            <CardDescription>Ingredients:{props.Ingredients}</CardDescription>
            <CardDescription>Status:{props.status}</CardDescription>
        </CardContent>
        <CardFooter>
            <Button onClick={() => {
                if (props.status == "DELIVERED") {
                    toast.warning("already delivered")
                }
                else if (props.status == "PENDING") {
                    toast.warning("Not prepared yet")
                }
                else {
                    MutateStatus.mutate()
                }

            }} disabled={MutateStatus.isPending}>Mark as Done</Button>
        </CardFooter>
    </Card>
}