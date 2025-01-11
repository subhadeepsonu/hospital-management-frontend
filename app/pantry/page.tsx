"use client"

import { useQuery } from "@tanstack/react-query";
import { BaseUrl } from "../constants";
import axios from "axios";
import PantryDietCard from "@/components/cards/pantryDietCard";

export default function Page() {
    const QueryTasks = useQuery({
        queryKey: ["Pantrytasks"],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/Pantry/gettask`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            return response.data;
        },
    })
    if (QueryTasks.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">
            Loading...</div>
    }
    return (
        <div className="min-h-screen w-full  flex justify-start pt-20 items-start px-4">
            <div className="w-full grid  grid-cols-4 gap-4">
                {QueryTasks.data.data.map((pantry: {
                    ingredients: string;
                    instructions: string;
                    delivary: {
                        name: string;
                    };
                    pantry: {
                        name: string;
                    };
                    status: string;
                    mealType: string;
                    id: number;
                }) => {
                    return <PantryDietCard key={pantry.id} Ingredients={pantry.ingredients} Instruction={pantry.instructions} delivary={pantry.delivary.name} id={pantry.id} pantry={pantry.pantry.name} status={pantry.status} time={pantry.mealType} />
                })}
            </div>
        </div>
    );
}