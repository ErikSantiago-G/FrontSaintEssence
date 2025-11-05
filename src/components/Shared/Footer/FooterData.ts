import type { FooterLinkGroup } from "./interfaces/FooterLinkGroup";


export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Contacto",
    links: [
      { label: "Github", url: "/products/laptops" },
      { label: "WhatsApp", url: "/products/cameras" },
      { label: "Linkedin", url: "/products/phones" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { label: "Perfil", url: "/profile" },
      { label: "Iniciar sesión", url: "/login" },
      { label: "Registro", url: "/register" },
    ],
  },
  {
    title: "Páginas",
    links: [
      { label: "Productos", url: "/products" },
      { label: "Categorías", url: "/categories" },
      { label: "Carrito", url: "/cart" },
      { label: "Contacto", url: "/contact" },
    ],
  },
];