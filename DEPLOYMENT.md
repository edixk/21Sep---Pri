# Instrucciones de despliegue

## 1. Resumen

Este proyecto es una **aplicación web estática (SPA)** construida con React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion + `html-to-image`.

- **Sin backend**, sin base de datos, sin API, sin variables de entorno y sin secretos.
- Todo el contenido y la personalización se definen en tiempo de compilación en `src/config.ts`.
- Los recursos son locales (SVG en `public/` y fuentes auto-alojadas con `@fontsource`). No se requiere ninguna URL externa en tiempo de ejecución.

El artefacto de despliegue es la carpeta **`dist/`**, generada por `npm run build`. Basta con publicar esa carpeta en cualquier host de sitios estáticos (Netlify, Vercel, GitHub Pages, Cloudflare Pages, un servidor estático o nginx).

## 2. Prerrequisitos / verificación del entorno

Se requiere **Node 18 o superior** (verificado sobre Node 24 y npm 11).

Verifica tu entorno:

```powershell
node --version
npm --version
```

Ambos comandos deben devolver una versión válida. Si alguno falla, instala Node.js (se recomienda la LTS más reciente) antes de continuar.

> **Nota para Windows (PowerShell):** si al ejecutar `npm` o `npx` aparece un error de "execution policy" (política de ejecución de scripts), usa los envoltorios `.cmd` explícitos (`npm.cmd ...`, `npx.cmd ...`) o ajusta la política con:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

## 3. Pasos de despliegue

Ejecuta los siguientes pasos en la raíz del repositorio.

### Paso 1 — Instalar dependencias

```powershell
npm install
```

### Paso 2 — Compilar

```powershell
npm run build
```

Este comando ejecuta `tsc --noEmit && vite build`. Verifica que **termine con código de salida 0** y que genere la carpeta `dist/` con su `index.html` y los assets (JS, CSS, fuentes y SVG).

### Paso 3 — Publicar la carpeta `dist/`

Elige el host y sigue sus instrucciones concretas:

#### (a) Netlify / Vercel

- **Build command:** `npm run build`
- **Publish directory (carpeta de publicación):** `dist`

La plataforma ejecuta la compilación y sirve el resultado automáticamente.

#### (b) GitHub Pages

Publica el contenido de `dist/` en la rama/configuración de GitHub Pages de tu repositorio.

- **Caveat de base-path:** el proyecto no define `base` en `vite.config.ts` (usa la ruta raíz `/`). Si publicas en un subdirectorio (por ejemplo `https://usuario.github.io/repo/`), deberás configurar la opción `base` en `vite.config.ts` (por ejemplo `base: '/repo/'`) y reconstruir antes de publicar; de lo contrario los assets apuntarán a rutas rotas.

#### (c) Servidor estático / nginx

Sirve la carpeta `dist/` y configura el **fallback de SPA** hacia `index.html` (rewrite de todas las rutas a `index.html`). Ejemplo conceptual de configuración nginx:

```nginx
server {
    listen 80;
    root /ruta/a/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 4. Verificación post-despliegue

Al tratarse de un sitio estático no existe health check en servidor; la verificación es manual desde el navegador:

1. Abre la URL pública y confirma que carga sin errores de consola.
2. Verifica que aparece el botón de introducción ("Para alguien muy especial").
3. Haz clic y recorre el flujo completo: **introducción → destello (flash) → carta → ramo**.
4. En la pantalla del ramo, prueba el botón **"Guardar este ramo ♡"** y confirma que se descarga el PNG (`ramo-para-alguien-especial.png`).

## 5. Configuración / secretos

**No se requiere ninguna configuración en runtime ni secretos.**

- No hay variables de entorno, claves API ni credenciales.
- Toda la personalización (nombre, carta, textos de botones, nombre del PNG) se edita en `src/config.ts` **antes de compilar**. No existe configuración en tiempo de ejecución: cualquier cambio requiere volver a ejecutar `npm run build` y redesplegar.

## 6. Rollback

Para volver a una versión anterior:

1. Vuelve a publicar el `dist/` previo (el artefacto compilado de la versión anterior).
2. O, en hosts basados en Git (Netlify, Vercel, Cloudflare Pages, GitHub Pages), apunta el despliegue al commit o tag anterior y deja que se reconstruya.

Con cualquiera de las dos opciones, el sitio queda restaurado a su estado anterior.

## 7. Notas / límites

- **No hay pruebas automatizadas.** El script `test` es solo un placeholder que imprime un error (`echo "Error: no test specified"`); la verificación se realiza de forma manual.
- **No existe script `preview`.** Para previsualizar el build localmente, usa `npx vite preview` (o `npx.cmd vite preview` en Windows).
- **SPA fallback:** el enrutamiento es de una sola página y no hay rutas de cliente, por lo que el fallback a `index.html` es un requisito menor, pero conviene configurarlo en hosts que lo exigen (ver apartado 3, opción c).
