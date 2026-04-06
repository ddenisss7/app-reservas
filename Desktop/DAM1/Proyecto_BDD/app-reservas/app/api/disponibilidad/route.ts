import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Leemos el JSON
    
    // Obtenemos la fecha y hora actual
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-ES'); 
    const hora = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    // 1. Ruta principal
    const baseDir = path.join(process.cwd(), 'reservas_recibidas');

    // 2. Crear carpeta principal si no existe
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    // 3. Numeración automática (001, 002...)
    const carpetas = fs.readdirSync(baseDir).filter(f => f.startsWith('reserva#'));
    const proximoNumero = (carpetas.length + 1).toString().padStart(3, '0');
    
    const nombreCarpeta = `reserva#${proximoNumero}`;
    const rutaCarpeta = path.join(baseDir, nombreCarpeta);

    // 4. Crear la subcarpeta y el archivo .txt
    fs.mkdirSync(rutaCarpeta, { recursive: true });
    const rutaArchivo = path.join(rutaCarpeta, `${nombreCarpeta}.txt`);
    
    // CONTENIDO SOLICITADO: Solo la frase de realización y el tiempo
    const contenido = `realizada el ${fecha} a las ${hora}`;
    fs.writeFileSync(rutaArchivo, contenido);

    return NextResponse.json({
      mensaje: "Carpeta creada con éxito",
      detalle: contenido
    });

  } catch (error) {
    return NextResponse.json({ mensaje: "Error en el servidor" }, { status: 500 });
  }
}