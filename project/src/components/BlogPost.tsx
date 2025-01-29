import { Card, CardContent, CardFooter } from "@/components/ui/card"


export default function BlogPost({ content }: { content: string }) {
    return (
        <div className="py-20">
            <Card>
                <CardContent>
                    {content}
                </CardContent>
                <CardFooter>Blah</CardFooter>
            </Card>
        </div>
    )
}