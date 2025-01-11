import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function DietCard(props: {
    pantry: string,
    delivary: string,
    Instruction: string,
    Ingredients: string,
    status: string,
    time: string
}) {
    return <Card className="h-48 w-full">
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
    </Card>

}