# 🎨 DESIGN SYSTEM - DOCUMENTACIÓN

## 📁 Estructura de Archivos

```
src/styles/
├── _variables.scss    # Variables, colores, espaciado, breakpoints
├── _typography.scss   # Sistema tipográfico completo
├── _mixins.scss      # Mixins y funciones utilitarias
├── _components.scss  # Componentes base (botones, cards, etc.)
└── index.scss        # Archivo principal que importa todo
```

## 🎨 Paleta de Colores

### Colores Principales (del Design System)
- **Pink**: `#FF4081` - Color vibrante para CTAs principales
- **Red**: `#F44336` - Para errores y acciones destructivas  
- **Off Navy Blue**: `#3F51B5` - Color primario principal
- **Navy Blue**: `#303F9F` - Versión más oscura del primario
- **Sky Blue**: `#E3F2FD` - Fondo claro, estados hover
- **Blue**: `#2196F3` - Links y elementos informativos
- **Off Blue**: `#1A237E` - Versión más oscura para contrastes
- **Purple**: `#9C27B0` - Color de acento
- **Off Purple**: `#AB47BC` - Variante del púrpura
- **Pantone Purple**: `#E1BEE7` - Versión clara del púrpura

### Variables Semánticas
```scss
$primary-color: $color-off-navy-blue;    // #3F51B5
$secondary-color: $color-pink;           // #FF4081  
$accent-color: $color-purple;            // #9C27B0
```

## 📝 Tipografía

### Fuentes
- **Primaria**: `Inter` - Para headings, UI, botones
- **Secundaria**: `Lato` - Para texto de cuerpo, párrafos
- **Monoespaciada**: `Fira Code` - Para código

### Clases de Títulos
```scss
.heading--1  // 3rem (48px) - Títulos principales
.heading--2  // 2.25rem (36px) - Subtítulos importantes  
.heading--3  // 1.875rem (30px) - Títulos de sección
.heading--4  // 1.5rem (24px) - Títulos de subsección
.heading--5  // 1.25rem (20px) - Títulos pequeños
.heading--6  // 1rem (16px) - Títulos de etiquetas
```

### Clases de Texto
```scss
.text--xs     // 0.75rem (12px)
.text--sm     // 0.875rem (14px)  
.text--base   // 1rem (16px) - Tamaño base
.text--md     // 1.125rem (18px)
.text--lg     // 1.25rem (20px)
.text--xl     // 1.5rem (24px)
```

### Variantes de Peso
```scss
.text--light     // 300
.text--regular   // 400
.text--medium    // 500
.text--semibold  // 600
.text--bold      // 700
```

### Variantes de Color
```scss
.text--primary    // Color principal del texto
.text--secondary  // Color secundario (gris)
.text--muted      // Color tenue
.text--brand      // Color de marca
.text--accent     // Color de acento
```

## 🔲 Componentes

### Botones
```scss
.btn              // Botón base
.btn--primary     // Botón primario (azul)
.btn--secondary   // Botón secundario (rosa)
.btn--accent      // Botón de acento (púrpura)
.btn--outline     // Botón con borde
.btn--ghost       // Botón transparente
.btn--link        // Botón como enlace

// Tamaños
.btn--sm          // Pequeño
.btn--lg          // Grande  
.btn--xl          // Extra grande

// Estados
.btn--loading     // Estado de carga
.btn--full-width  // Ancho completo
```

### Cards
```scss
.card             // Card base
.card__header     // Cabecera del card
.card__title      // Título del card
.card__subtitle   // Subtítulo del card
.card__body       // Cuerpo del card
.card__footer     // Pie del card

// Variantes
.card--hover      // Card con efecto hover
.card--compact    // Card con menos padding
```

### Formularios
```scss
.form__group      // Grupo de campo de formulario
.form__label      // Etiqueta del campo
.form__input      // Input de texto
.form__textarea   // Área de texto
.form__select     // Select dropdown
.form__error      // Mensaje de error
.form__help       // Texto de ayuda

// Estados
.form__input--error  // Input con error
```

### Badges
```scss
.badge            // Badge base
.badge--primary   // Badge primario
.badge--secondary // Badge secundario  
.badge--success   // Badge de éxito
.badge--warning   // Badge de advertencia
.badge--danger    // Badge de peligro
.badge--gray      // Badge gris
```

### Alertas
```scss
.alert            // Alerta base
.alert__title     // Título de la alerta
.alert__message   // Mensaje de la alerta

// Tipos
.alert--info      // Alerta informativa
.alert--success   // Alerta de éxito
.alert--warning   // Alerta de advertencia
.alert--danger    // Alerta de error
```

## 📐 Espaciado

Sistema basado en múltiplos de 4px:

```scss
$spacing-0: 0      // 0px
$spacing-1: 0.25rem // 4px
$spacing-2: 0.5rem  // 8px
$spacing-3: 0.75rem // 12px  
$spacing-4: 1rem    // 16px - Base
$spacing-5: 1.25rem // 20px
$spacing-6: 1.5rem  // 24px
$spacing-8: 2rem    // 32px
// ... hasta $spacing-32
```

### Utilidades de Espaciado
```scss
.m-4, .mt-4, .mb-4  // Margins
.p-4, .pt-4, .pb-4  // Paddings
```

## 📱 Breakpoints

```scss
$breakpoint-xs: 480px
$breakpoint-sm: 640px
$breakpoint-md: 768px   // Tablet
$breakpoint-lg: 1024px  // Desktop
$breakpoint-xl: 1280px  // Large desktop
$breakpoint-2xl: 1536px // Extra large
```

## 🎯 Mixins Útiles

### Layouts
```scss
@include flex-center;    // Centrar con flexbox
@include flex-between;   // Espacio entre elementos
@include container;      // Container responsivo
@include grid(12, 1rem); // Grid responsivo
```

### Componentes
```scss
@include button-base;    // Estilos base de botón
@include card-base;      // Estilos base de card  
@include input-base;     // Estilos base de input
```

### Estados
```scss
@include hover-lift;     // Efecto lift en hover
@include focus-ring;     // Anillo de enfoque
@include loading-shimmer; // Animación de carga
```

### Responsive
```scss
@include breakpoint(md) { } // Media query
@include hide-on(sm);       // Ocultar en tamaño
@include show-on(lg);       // Mostrar en tamaño
```

### Tipografía
```scss
@include responsive-text($font-size-lg, $font-size-2xl);
@include text-truncate(200px);
@include text-clamp(3); // Máximo 3 líneas
```

## 🚀 Cómo Usar

### 1. Importar en tu aplicación
```scss
// En tu archivo principal CSS/SCSS
@import './styles/index.scss';
```

### 2. Usar en componentes React
```jsx
// Usando clases del design system
<h1 className="heading--1 text--primary">Título Principal</h1>
<p className="text--base text--secondary">Párrafo de descripción</p>
<button className="btn btn--primary btn--lg">Botón Principal</button>
<div className="card card--hover">
  <div className="card__header">
    <h3 className="card__title">Título del Card</h3>
  </div>
  <div className="card__body">
    <p>Contenido del card</p>
  </div>
</div>
```

### 3. Usar variables en SCSS personalizados
```scss
.mi-componente {
  color: $primary-color;
  padding: $spacing-4;
  border-radius: $border-radius-md;
  
  @include breakpoint(md) {
    padding: $spacing-6;
  }
}
```

## ✅ Beneficios del Sistema

- **Consistencia**: Todos los componentes siguen las mismas reglas
- **Escalabilidad**: Fácil agregar nuevos componentes
- **Mantenimiento**: Cambios centralizados en variables
- **Accesibilidad**: Focus states y contraste adecuado
- **Responsivo**: Breakpoints y utilidades responsive
- **Performance**: SCSS optimizado y reutilizable

## 📝 Próximos Pasos

1. **Implementar en componentes**: Aplicar clases en tus componentes React
2. **Crear tema oscuro**: Extender variables para modo oscuro  
3. **Agregar iconografía**: Sistema de iconos consistente
4. **Documentación interactiva**: Storybook o similar
5. **Tokens de diseño**: Exportar a formato JSON para otras plataformas