import { NextResponse } from "next/server";

export async function GET() {
  const product = [
  
    { id: 1, name: "Ly giữ nhiệt 750ml đen", price: "350.000 VNĐ", image: "/images/ly.png" },
    { id: 2, name: "Ly sứ (9×8cm)", price: "190.000 VNĐ", image: "/images/ly.png" },
    { id: 3, name: "Phin cà phê", price: "180.000 VNĐ", image: "/images/ly.png" },
    { id: 4, name: "Áo T-Shirt: EST 2017", price: "290.000 VNĐ", image: "/images/ly.png" },
    { id: 5, name: "Nến thơm Tan.", price: "340.000 VNĐ", image: "/images/ly.png" },
    { id: 6, name: "Denim s2", price: "290.000 VNĐ", image: "/images/ly.png" },
    { id: 7, name: "tan.bandana", price: "290.000 VNĐ", image: "/images/ly.png" },
    { id: 8, name: "SÔNG HƯƠNG ARABICA", price: "235.000 VNĐ", image: "/images/ly.png" },
    { id: 9, name: "FINE ROBUSTA", price: "195.000 VNĐ", image: "/images/ly.png" },

  
    { id: 10, name: "Ly giữ nhiệt 750ml đen", price: "350.000 VNĐ", image: "/images/ao.png" },
    { id: 11, name: "Ly sứ (9×8cm)", price: "190.000 VNĐ", image: "/images/ao.png" },
    { id: 12, name: "Phin cà phê", price: "180.000 VNĐ", image: "/images/ao.png" },
    { id: 13, name: "Áo T-Shirt: EST 2017", price: "290.000 VNĐ", image: "/images/ao.png" },
    { id: 14, name: "Nến thơm Tan.", price: "340.000 VNĐ", image: "/images/ao.png" },
    { id: 15, name: "Denim s2", price: "290.000 VNĐ", image: "/images/ao.png" },
    { id: 16, name: "tan.bandana", price: "290.000 VNĐ", image: "/images/ao.png" },
    { id: 17, name: "SÔNG HƯƠNG ARABICA", price: "235.000 VNĐ", image: "/images/ao.png" },
    { id: 18, name: "FINE ROBUSTA", price: "195.000 VNĐ", image: "/images/ao.png" },

  
    { id: 19, name: "Ly giữ nhiệt 750ml đen", price: "350.000 VNĐ", image: "/images/khan.png" },
    { id: 20, name: "Ly sứ (9×8cm)", price: "190.000 VNĐ", image: "/images/khan.png" },
    { id: 21, name: "Phin cà phê", price: "180.000 VNĐ", image: "/images/khan.png" },
    { id: 22, name: "Áo T-Shirt: EST 2017", price: "290.000 VNĐ", image: "/images/khan.png" },
    { id: 23, name: "Nến thơm Tan.", price: "340.000 VNĐ", image: "/images/khan.png" },
    { id: 24, name: "Denim s2", price: "290.000 VNĐ", image: "/images/khan.png" },
    { id: 25, name: "tan.bandana", price: "290.000 VNĐ", image: "/images/khan.png" },
    { id: 26, name: "SÔNG HƯƠNG ARABICA", price: "235.000 VNĐ", image: "/images/khan.png" },
    { id: 27, name: "FINE ROBUSTA", price: "195.000 VNĐ", image: "/images/khan.png" },

  
    { id: 28, name: "Ly giữ nhiệt 750ml đen", price: "350.000 VNĐ", image: "/images/nenthom.png" },
    { id: 29, name: "Ly sứ (9×8cm)", price: "190.000 VNĐ", image: "/images/nenthom.png" },
    { id: 30, name: "Phin cà phê", price: "180.000 VNĐ", image: "/images/nenthom.png" },
    { id: 31, name: "Áo T-Shirt: EST 2017", price: "290.000 VNĐ", image: "/images/nenthom.png" },
    { id: 32, name: "Nến thơm Tan.", price: "340.000 VNĐ", image: "/images/nenthom.png" },
    { id: 33, name: "Denim s2", price: "290.000 VNĐ", image: "/images/nenthom.png" },
    { id: 34, name: "tan.bandana", price: "290.000 VNĐ", image: "/images/nenthom.png" },
    { id: 35, name: "SÔNG HƯƠNG ARABICA", price: "235.000 VNĐ", image: "/images/nenthom.png" },
    { id: 36, name: "FINE ROBUSTA", price: "195.000 VNĐ", image: "/images/nenthom.png" },
  ];

  return NextResponse.json({ product });
}
