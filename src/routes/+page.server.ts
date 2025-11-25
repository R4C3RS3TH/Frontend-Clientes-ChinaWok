import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    const productosDeEjemplo = [
        {
            id: 1,
            nombre: "Chijaukay Clásico",
            descripcion: "Trozos de pollo en salsa de soya y ajonjolí.",
            precio: 28.90,
            // URL CAMBIADA
            imagenUrl: "https://placehold.co/600x400/e03a3e/white?text=Chijaukay"
        },
        {
            id: 2,
            nombre: "Tipakay Clásico",
            descripcion: "Pollo crujiente bañado en salsa agridulce.",
            precio: 28.90,
            // URL CAMBIADA
            imagenUrl: "https://placehold.co/600x400/e03a3e/white?text=Tipakay"
        },
        {
            id: 3,
            nombre: "Aeropuerto Especial",
            descripcion: "Combinación de arroz chaufa y tallarín saltado.",
            precio: 32.50,
            // URL CAMBIADA
            imagenUrl: "https://placehold.co/600x400/e03a3e/white?text=Aeropuerto"
        }
    ];

    return {
        productos: productosDeEjemplo
    };
};