import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl } from "@/app/constants";

export default function PantryDietCard(props: {
    id: number,
    pantry: string,
    delivary: string,
    time: string,
    Instruction: string,
    Ingredients: string,
    status: string
}) {
    const QueryClient = useQueryClient()
    const MutateStatus = useMutation({
        mutationFn: async () => {
            const resposne = await axios.put(`${BaseUrl}/pantry/updatetask/${props.id}`, {

            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return resposne.data
        },
        onSuccess(data) {
            if (data.success) {
                QueryClient.invalidateQueries({
                    queryKey: ["Pantrytasks"]
                })
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
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
                else if (props.status == "COMPLETED") {
                    toast.warning("already completed")
                }
                else {
                    MutateStatus.mutate()
                }

            }} disabled={MutateStatus.isPending}>Mark as Done</Button>
        </CardFooter>
    </Card>
}