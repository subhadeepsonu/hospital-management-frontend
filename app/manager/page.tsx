"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseUrl } from "../constants";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import AddPatientForm from "@/components/forms/addPatientForm";
import PatientCard from "@/components/cards/patientCard";
export default function Page() {
    const QueryPatients = useQuery({
        queryKey: ["patients"],
        queryFn: async () => {
            const response = await axios.get(`${BaseUrl}/patient`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            return response.data;
        },

    })
    if (QueryPatients.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">
            Loading...</div>
    }
    return (
        <div className="h-screen w-full  flex justify-center items-center pt-20">
            <Sheet>
                <SheetTrigger>
                    <Button className="fixed bottom-5 right-5">Add patient</Button>
                </SheetTrigger>
                <SheetContent>
                    <AddPatientForm />
                </SheetContent>
            </Sheet>
            <div className="grid grid-cols-4 gap-4 w-full h-full px-4">
                {QueryPatients.data.data.map((patient: any) => {
                    return <PatientCard id={patient.id} age={patient.age} bed={patient.bedNumber} floor={patient.floorNumber} name={patient.name} room={patient.roomNumber} key={patient.id} />
                })}
            </div>

        </ div >
    );
}