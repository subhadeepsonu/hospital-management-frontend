"use client"
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function PatientCard(props: {
    id: number,
    name: string,
    age: number,
    floor: number,
    room: number,
    bed: number
}) {
    const router = useRouter();
    return <Card onClick={() => {
        router.push(`/manager/patient/${props.id}`)
    }} className="h-60 w-80 hover:cursor-pointer">
        <CardHeader>
            <CardTitle>{props.name}</CardTitle>
            <CardDescription>{props.age}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Floor:{props.floor}</p>
        </CardContent>
        <CardContent>
            <p>Room:{props.room}</p>
        </CardContent>
        <CardFooter>
            <p>Bed:{props.bed}</p>
        </CardFooter>
    </Card>

}