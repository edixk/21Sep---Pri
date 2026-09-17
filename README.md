# Un detalle para alguien especial

Experiencia interactiva romántica de una sola página, 100 % en el lado del cliente. Una introducción elegante da paso a una carta configurable y, finalmente, a un ramo de flores amarillas que se puede descargar como imagen PNG. Todo el contenido visible se centraliza en un único archivo de configuración, por lo que personalizarla no requiere tocar ningún componente.

## Tecnología / Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v3
- Framer Motion
- Lucide React
- html-to-image

## Requisitos

- Node.js 18+ (desarrollado y verificado con Node 24).
- npm (incluido con Node.js).

## Cómo ejecutar

```bash
npm install
```

Desarrollo (servidor con recarga en caliente):

```bash
npm run dev
```

Producción (compila y genera la carpeta `dist/`):

```bash
npm run build
```

> El proyecto no define un script `preview`. Para servir la build de producción puedes usar `npx vite preview` o cualquier servidor estático sobre la carpeta `dist/`.

Nota para Windows PowerShell: si la política de ejecución restringe los scripts `.ps1`, usa `npm.cmd` / `npx.cmd` en lugar de `npm` / `npx` (por ejemplo, `npm.cmd install`, `npx.cmd vite preview`).

## Cómo personalizar el contenido

**Todo el texto editable vive en un único archivo: `src/config.ts`.** No es necesario modificar ningún componente ni estilo.

Campos disponibles (nombres exactos):

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `personName` | string | Nombre de la persona a quien va dirigida la experiencia. |
| `salutation` | string | Saludo de la carta. Admite el marcador `{personName}`, que se reemplaza automáticamente por el valor de `personName`. |
| `letterBody` | string[] | Cuerpo de la carta, línea por línea. Cada elemento se renderiza como un párrafo; un string vacío (`""`) genera un salto de párrafo. |
| `closing` | string | Texto de cierre, mostrado en cursiva sobre la firma. |
| `signature` | string | Firma al final de la carta. |
| `buttonIntro` | string | Texto del botón de la pantalla de introducción. |
| `buttonLetter` | string | Texto del botón de la pantalla de la carta. |
| `buttonBouquet` | string | Texto del botón de descarga del ramo. |
| `pngFilename` | string | Nombre del archivo PNG que se genera al descargar el ramo. |

Ejemplo antes / después en `src/config.ts`:

```ts
// Antes
personName: "Alguien muy especial",
salutation: "Para {personName}:",
closing: "Un pequeño detalle para alguien enorme en mi corazón.",
signature: "Con cariño",

// Después
personName: "Pri",
salutation: "Querida {personName}:",
closing: "Gracias por hacerlo todo más bonito.",
signature: "Con todo mi cariño",
```

Al renderizar, el saludo `"Querida {personName}:"` con `personName: "Pri"` produce `"Querida Pri:"`.

## Arquitectura / flujo

La aplicación es una máquina de estados de 4 etapas definida en `src/App.tsx` mediante el enum `AppState`: `intro` → `transition` → `letter` → `bouquet`.

- **`IntroScreen`** (`IntroScreenComponent`): pantalla inicial con el botón de entrada (`buttonIntro`). Al pulsarlo se pasa al estado `transition` (con guarda contra dobles clics).
- **`FlashTransition`**: destello blanco a pantalla completa que dura ~800 ms; al terminar se avanza a `letter`.
- **`Letter`**: muestra el saludo, el cuerpo de la carta (`letterBody`), el cierre y la firma. El botón (`buttonLetter`) lleva al estado `bouquet`.
- **`BouquetScene`**: compone el ramo de flores amarillas dentro del contenedor exportable `#bouquet-export`.
- **`DownloadBouquetButton`**: botón que dispara la exportación PNG.

Las transiciones entre pantallas usan `AnimatePresence` (Framer Motion) con `mode="wait"`. El hook `useReducedMotion` (vía `matchMedia('(prefers-reduced-motion: reduce)')`) detecta la preferencia de movimiento reducido y desactiva o acorta las animaciones en todos los componentes.

## Descarga del ramo (PNG)

El botón "Guardar este ramo" (`buttonBouquet`) exporta el elemento `#bouquet-export` (definido dentro de `BouquetScene`) a un archivo PNG mediante `html-to-image`, con:

- Resolución 2× (`pixelRatio: 2`).
- Fondo de color `#faf3e8`.
- Nombre de archivo tomado de `config.pngFilename` (por defecto `ramo-para-alguien-especial.png`).

El ramo se construye con assets SVG locales (`sunflower.svg`, `daisy.svg`, `wildflower.svg`, `leaf.svg`, `stem.svg`, `kraft-paper.svg`), por lo que no hay URLs externas ni problemas de CORS en la exportación.

## Estructura de archivos

```
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── sunflower.svg
│   ├── daisy.svg
│   ├── wildflower.svg
│   ├── leaf.svg
│   ├── stem.svg
│   └── kraft-paper.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── config.ts
    ├── index.css
    └── components/
        ├── IntroScreen.tsx
        ├── FlashTransition.tsx
        ├── Letter.tsx
        ├── BouquetScene.tsx
        └── DownloadBouquetButton.tsx
```

## Notas

- Es 100 % del lado del cliente: no hay backend ni llamadas a API.
- Los pasos de despliegue se documentarán por separado.
