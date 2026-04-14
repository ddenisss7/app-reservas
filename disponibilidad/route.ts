import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json(); 

    return NextResponse.json({
      mensaje: "Reserva recibida con éxito",
      recibido: true
    });

  } catch (error) {
    return NextResponse.json(
      { mensaje: "Error al procesar la reserva" }, 
      { status: 500 }
    );
  }
}