"use client"

import { BaseUrl } from "@/app/constants";
import DeliveryCard from "@/components/cards/deliveryCard";
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
    const queryDelivary = useQuery({
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
    if (queryDelivary.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">
            Loading...</div>
    }
    return (
        <div className="h-screen w-full  flex justify-center items-center pt-20">
            <Sheet>
                <SheetTrigger>
                    <Button className="fixed bottom-5 right-5">Add delivery worker</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>Add pantry worker</SheetTitle>
                    <AddpantryWorker role="delivery" />
                </SheetContent>
            </Sheet>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
                {queryDelivary.data.data.map((delivary: {
                    contactInfo: string;
                    name: string;
                    id: string;
                }) => {
                    return <DeliveryCard key={delivary.id} contact={delivary.contactInfo} name={delivary.name} />
                })}
            </div>

        </div>
    );
}