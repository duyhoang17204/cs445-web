import { NextResponse } from "next/server";

export async function GET() {

    const category =[
        "Best seller",
    "Cà phê",
    "Trà",
    "Topping",
    "Bánh ngọt",
    ];

    return NextResponse.json({category});
    
}