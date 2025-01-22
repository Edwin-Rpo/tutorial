# ¡Mi lista de Gatos en Remix!
![Gatos](https://github.com/user-attachments/assets/57030984-72ef-4dce-8f4f-f721649a1d39)

- [Remix Docs](https://remix.run/docs)


## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## Importante
**Links**: Los enlaces en Remix se crean con el componente <Link> para navegación interna, lo que permite transiciones rápidas entre páginas sin recargar el navegador.

**Loaders**: Son funciones que obtienen los datos necesarios para una página o componente antes de que se renderice, facilitando el renderizado basado en datos en el servidor o cliente.

**Rutas dinámicas**: Son rutas que incluyen segmentos variables (e.g., /productos/:id), permitiendo manejar páginas únicas según parámetros específicos.

**Rutas anidadas**: Remix permite definir rutas dentro de otras rutas, creando una jerarquía que comparte layouts y lógica entre secciones relacionadas de la aplicación.

**Componente Outlet**: Es un marcador de posición para renderizar las rutas anidadas dentro del layout principal, permitiendo que se integren sin duplicar estructuras.


