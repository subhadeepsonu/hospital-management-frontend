"use client"

import { BaseUrl } from "@/app/constants"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import AddDeitFormPlan from "@/components/forms/addDietForm"
import DietCard from "@/components/cards/dietCard"
export default function Page(params: {
    params: {
        id: string
    }
}) {
    const QueryPatient = useQuery({
        queryKey: ["patient", params.params.id],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/patient/${params.params.id}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            return response.data
        }
    })
    if (QueryPatient.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">
            Loading...
        </div>
    }
    return <div className="min-h-screen w-full pt-20  flex flex-col justify-start items-start px-5">
        <Sheet>
            <SheetTrigger>
                <Button className="fixed bottom-5 right-5">Add Diet Plan</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetTitle>Add Diet Plan</SheetTitle>
                <AddDeitFormPlan id={parseInt(params.params.id)} />
            </SheetContent>
        </Sheet>
        <div className="w-1/2 flex  justify-between items-center ">
            <p>Name: {QueryPatient.data.data.name}</p>
            <p>Age: {QueryPatient.data.data.age}</p>
            <p>Floor:{QueryPatient.data.data.roomNumber}</p>
            <p>Room:{QueryPatient.data.data.roomNumber}</p>
            <p>Bed:{QueryPatient.data.data.bedNumber}</p>
        </div>

        <h1 className="text-2xl font-bold">Diet Plan</h1>
        <div className="w-full grid grid-cols-4 gap-4">
            {QueryPatient.data.data.dietCharts.map((diet: {
                mealType: string;
                ingredients: string;
                instructions: string;
                delivary: {
                    name: string;
                };
                pantry: {
                    name: string;
                };
                status: string;
                id: string;
            }) => {
                return <DietCard time={diet.mealType} Ingredients={diet.ingredients} Instruction={diet.instructions} delivary={diet.delivary.name} pantry={diet.pantry.name} status={diet.status} key={diet.id} />

            })}
        </div>
    </div>
}