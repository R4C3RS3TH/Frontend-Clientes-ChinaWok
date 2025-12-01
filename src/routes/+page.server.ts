import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    const productosDeEjemplo = [
        {
            id: 1,
            nombre: "Chijaukay Clásico",
            descripcion: "Trozos de pollo en salsa de soya y ajonjolí.",
            precio: 28.90,
            precioAnterior: 35.90,
            descuento: 20,
            imagenUrl: "https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/c/h/chijaukay-clasico-web_1.jpg",
            sku: "CHIJ-001",
            tenantId: "SURCO_1"
        },
        {
            id: 2,
            nombre: "Tipakay Clásico",
            descripcion: "Pollo crujiente bañado en salsa agridulce.",
            precio: 28.90,
            imagenUrl: "https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/t/i/tipakay-clasico-web_1.jpg",
            sku: "TIPA-001",
            tenantId: "SURCO_1"
        },
        {
            id: 3,
            nombre: "Aeropuerto Especial",
            descripcion: "Combinación de arroz chaufa y tallarín saltado.",
            precio: 32.50,
            precioAnterior: 40.00,
            descuento: 18,
            imagenUrl: "https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/a/e/aeropuerto-especial-web_1.jpg",
            sku: "AERO-001",
            tenantId: "SURCO_1"
        },
        {
            id: 4,
            nombre: "Tallarín Saltado de Pollo",
            descripcion: "Trozos de pollo salteados con cebolla y tomate.",
            precio: 29.90,
            imagenUrl: "https://www.chinawok.com.pe/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/t/a/tallarin-saltado-de-pollo-web_1.jpg",
            sku: "TALL-001",
            tenantId: "SURCO_1"
        }
    ];

    return {
        productos: productosDeEjemplo
    };
};