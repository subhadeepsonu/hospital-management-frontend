"use client"

import { BaseUrl } from "@/app/constants";
import PantryCard from "@/components/cards/pantryCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import AddpantryWorker from "@/components/forms/addPantryWorker";
export default function Page() {
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
    if (QueryPantry.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">
            Loading...</div>
    }
    return (
        <div className="h-screen w-full  flex justify-center items-center pt-20">
            <Sheet>
                <SheetTrigger>
                    <Button className="fixed bottom-5 right-5">Add pantry worker</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>Add pantry worker</SheetTitle>
                    <AddpantryWorker role="pantry" />
                </SheetContent>
            </Sheet>
            <div className="grid grid-cols-4 gap-4 w-full h-full px-4">
                {QueryPantry.data.message.map((pantry: {
                    contactInfo: string;
                    name: string;
                    id: string;
                }) => {
                    return <PantryCard key={pantry.id} contact={pantry.contactInfo} name={pantry.name} />
                })}
            </div>


        </div>
    );
}