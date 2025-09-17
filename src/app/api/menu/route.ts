import { NextResponse } from "next/server";

export async function GET() {
  const menu = [
    
    {
      id: 1,
      name: "Orange Coldbrew",
      price: "49.000 VNĐ",
      image: "/images/orange.png",
      category: "Best seller",
    },
    {
      id: 2,
      name: "Caramel Macchiato",
      price: "50.000 VNĐ",
      image: "/images/caramel.png",
      category: "Best seller",
    },
    {
      id: 3,
      name: "Latte",
      price: "45.000 VNĐ",
      image: "/images/mchasatly.png",
      category: "Best seller",
    },
    {
      id: 4,
      name: "Cà phê sữa đá",
      price: "30.000 VNĐ",
      image: "/images/cacao.png",
      category: "Best seller",
    },
    {
      id: 5,
      name: "Trà nhãn dừa",
      price: "39.000 VNĐ",
      image: "/images/mchapud.png",
      category: "Best seller",
    },

    // Cà phê
    {
      id: 6,
      name: "Cappuccino",
      price: "48.000 VNĐ",
      image: "/images/orange.png",
      category: "Cà phê",
    },
    {
      id: 7,
      name: "Espresso",
      price: "35.000 VNĐ",
      image: "/images/orange.png",
      category: "Cà phê",
    },
    {
      id: 8,
      name: "Americano",
      price: "40.000 VNĐ",
      image: "/images/orange.png",
      category: "Cà phê",
    },
    {
      id: 9,
      name: "Mocha",
      price: "55.000 VNĐ",
      image: "/images/orange.png",
      category: "Cà phê",
    },
    {
      id: 10,
      name: "Cold Brew",
      price: "52.000 VNĐ",
      image: "/images/orange.png",
      category: "Cà phê",
    },

    // Trà
    {
      id: 11,
      name: "Trà sữa truyền thống",
      price: "35.000 VNĐ",
      image: "/images/caramel.png",
      category: "Trà",
    },
    {
      id: 12,
      name: "Trà đào cam sả",
      price: "42.000 VNĐ",
      image: "/images/caramel.png",
      category: "Trà",
    },
    {
      id: 13,
      name: "Trà chanh mật ong",
      price: "38.000 VNĐ",
      image: "/images/caramel.png",
      category: "Trà",
    },
    {
      id: 14,
      name: "Trà hoa cúc",
      price: "37.000 VNĐ",
      image: "/images/caramel.png",
      category: "Trà",
    },
    {
      id: 15,
      name: "Trà gạo rang",
      price: "39.000 VNĐ",
      image: "/images/caramel.png",
      category: "Trà",
    },

    // Topping
    {
      id: 16,
      name: "Trân châu đen",
      price: "10.000 VNĐ",
      image: "/images/mchasatly.png",
      category: "Topping",
    },
    {
      id: 17,
      name: "Thạch cà phê",
      price: "12.000 VNĐ",
      image: "/images/mchasatly.png",
      category: "Topping",
    },
    {
      id: 18,
      name: "Kem cheese",
      price: "15.000 VNĐ",
      image: "/images/mchasatly.png",
      category: "Topping",
    },
    {
      id: 19,
      name: "Trân châu trắng",
      price: "10.000 VNĐ",
      image: "/images/mchasatly.png",
      category: "Topping",
    },
    {
      id: 20,
      name: "Thạch trái cây",
      price: "12.000 VNĐ",
      image: "/images/mchasatly.png",
      category: "Topping",
    },

    // Bánh ngọt
    {
      id: 21,
      name: "Bánh mousse dâu",
      price: "45.000 VNĐ",
      image: "/images/cacao.png",
      category: "Bánh ngọt",
    },
    {
      id: 22,
      name: "Bánh tiramisu",
      price: "50.000 VNĐ",
      image: "/images/cacao.png",
      category: "Bánh ngọt",
    },
    {
      id: 23,
      name: "Bánh su kem",
      price: "20.000 VNĐ",
      image: "/images/mchapud.png",
      category: "Bánh ngọt",
    },
    {
      id: 24,
      name: "Bánh flan",
      price: "18.000 VNĐ",
      image: "/images/mchapud.png",
      category: "Bánh ngọt",
    },
    {
      id: 25,
      name: "Bánh quy socola",
      price: "25.000 VNĐ",
      image: "/images/mchapud.png",
      category: "Bánh ngọt",
    },
  ];

  return NextResponse.json({ menu });
}
