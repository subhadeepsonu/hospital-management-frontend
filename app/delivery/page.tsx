"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl } from "../constants";
import DelivaryDietCard from "@/components/cards/delivaryDietCard";

export default function Page() {
    const queryDelivary = useQuery({
        queryKey: ["delivary"],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/delivary/gettask`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },
    })
    if (queryDelivary.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">
            Loading...</div>
    }
    return (
        <div className="h-screen w-full  flex justify-start items-start pt-20 px-4">
            <div className="grid grid-cols-4 gap-4 w-full">
                {queryDelivary.data.data.map((delivary: {
                    id: number;
                    mealType: string;
                    time: string;
                    instructions: string;
                    ingredients: string;
                    status: string;
                    delivary: {
                        name: string;
                    }
                    pantry: {
                        name: string;
                    }
                }) => {
                    return <DelivaryDietCard key={delivary.id} Ingredients={delivary.ingredients} Instruction={delivary.instructions} delivary={delivary.delivary.name} id={delivary.id} pantry={delivary.pantry.name} status={delivary.status} time={delivary.mealType} />
                })}
            </div>
        </div>
    );
}