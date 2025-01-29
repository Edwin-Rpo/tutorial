# ¡Mi lista de Gatos en Remix!
![Gatos](https://github.com/user-attachments/assets/57030984-72ef-4dce-8f4f-f721649a1d39)

- [Documentación Remix](https://remix.run/docs)


## Ejecución

Desde tu terminal:

```sh
npm run dev
```

Esto inicia su aplicación en modo de desarrollo, reconstruyendo activos ante cambios en archivos.
.

## Despliegue

Primero, crea tu aplicación para producción::

```sh
npm run build
```

Luego ejecute la aplicación en modo de producción:


```sh
npm start
```

Ahora tendrás que elegir un host donde implementarlo.


## Importante

**Links**: Los enlaces en Remix se crean con el componente <Link> para navegación interna, lo que permite transiciones rápidas entre páginas sin recargar el navegador.

**Loaders**: Son funciones que obtienen los datos necesarios para una página o componente antes de que se renderice, facilitando el renderizado basado en datos en el servidor o cliente.

**Rutas dinámicas**: Son rutas que incluyen segmentos variables (e.g., /productos/:id), permitiendo manejar páginas únicas según parámetros específicos.

**Rutas anidadas**: Remix permite definir rutas dentro de otras rutas, creando una jerarquía que comparte layouts y lógica entre secciones relacionadas de la aplicación.

**Componente Outlet**: Es un marcador de posición para renderizar las rutas anidadas dentro del layout principal, permitiendo que se integren sin duplicar estructuras.

**Action**: Función que maneja envíos de formularios y mutaciones en el servidor. Se accede con `useActionData().`

**Loader**: Función que obtiene datos en el servidor antes de renderizar una página. Se accede con `useLoaderData().`

**UseLoaderData**: Hook que obtiene los datos cargados por un `loader()`.

**UseActionData**: Hook que accede a la respuesta de una `action()`, útil para validaciones.

**Invariant**: Función para validar datos y lanzar errores si no cumplen ciertas condiciones.
 
  **Ejemplo de uso en validaciones**
  ```
    import { invariant } from "@remix-run/server-runtime";
    
    export const loader = async ({ params }) => {
      invariant(params.id, "Se requiere un ID válido");
    
      // Si el ID no existe, Remix lanzará un error automáticamente
      const data = { id: params.id, name: "Ejemplo" };
      return json(data);
    };
```

## Validaciones en Remix

Se realizan en `action()` antes de procesar los datos, devolviendo errores si es necesario.
```
export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email || !email.includes("@")) {
    return { error: "Correo electrónico inválido" };
  }

  return redirect("/success");
};
```



