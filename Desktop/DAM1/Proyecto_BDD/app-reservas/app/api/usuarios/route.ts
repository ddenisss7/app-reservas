import { NextResponse } from 'next/server';

export async function GET() {
  const usuarios = [
    { id: 1, nombre: "Mikel" },
    { id: 2, nombre: "Denis" }
  ];

  return NextResponse.json(usuarios);
}