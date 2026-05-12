import { NextResponse } from 'next/server';

export async function GET() {
  const usuarios = [
    { id: 1, nombre: "Usuario" },
  ];

  return NextResponse.json(usuarios);
}