import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function PantryCard(props: {
    name: string,
    contact: string,
}) {
    return <Card className="h-20 w-80">
        <CardHeader>
            <CardTitle>{props.name}</CardTitle>
            <CardDescription>{props.contact}</CardDescription>
        </CardHeader>

    </Card>

}