# Solcass

## [+12] Metadata, Markup y Accesibilidad
- Faltó actualizar el `<title>` en documentos como gallery, me y about, donde quedó el valor por default: `<title>Document</title>`.
- Se detectaron estilos en línea y repetición de layouts. Aunque no uses Astro, el layout es esencial para la mantenibilidad del sitio.
- Esta repetición también derivó en la omisión del `title`, demostrando por qué es importante centralizar el layout.
- Faltó incluir metadata y favicon. Un antifaz como ícono habría sido muy representativo.
- Se incluyeron atributos `alt` en las imágenes, pero resultaron demasiado genéricos. El contexto es clave, por ejemplo:
  - Malo: `alt="capricorn"`
  - Mejor: `alt="Antifaz de Capricornio; El signo caprichoso."`
- El uso de `alt` descriptivos mejora la indexación SEO y la accesibilidad.

## [+12] Funcionalidad / Interactividad
- La navegación básica funciona, pero el flujo puede resultar poco claro en algunos momentos.
- Faltan pistas visuales o textuales tras ciertas interacciones. Por ejemplo, al hacer clic en el filtro no queda claro que ya está activo.
- Sugerencias:
  - Hacer scroll automático a la sección correspondiente.
  - Mostrar instrucciones como “avanza”, “sigue bajando…” o íconos de flechas que sugieran el siguiente paso.
  - Mejorar la transición entre pantallas al ocultar las que ya no son necesarias.

## [+12] Diseño y Estilo
- El diseño es coherente en cuanto a paleta, iconografía y componentes como botones.
- La tipografía de títulos es actual y llamativa, pero se complica la lectura en bloques largos.
- Algunas secciones usan tipografías 'monospaced' como en el input; esa misma tipografía podría haberse usado para los párrafos largos.
- Para mejorar la legibilidad:
  - Evita centrar textos largos (más de 3 a 5 líneas).
  - Si decides centrar, separa en líneas más cortas o usa saltos (`<br>`) que generen mejor ritmo de lectura.
  - Lo más recomendable: alinear a la izquierda los textos largos y usar una tipografía de fácil lectura.

## [+13] Responsive
- En la sección 'About', la imagen se sobrepone con el texto en móviles.
- Sugerencia: usar `flex-direction: column;` en el contenedor para apilar los elementos verticalmente.
- Las máscaras podrían haber sido redimensionadas o comprimidas para mejorar la velocidad de carga en dispositivos móviles.

## [+12] Contenido
- La galería se percibe repetitiva; todas las máscaras usan el mismo template y las diferencias no son tan evidentes.
- Los textos alternativos son útiles, pero invisibles al usuario. Se recomienda acompañar cada antifaz con un título y una breve descripción visible, como si se tratara de un horóscopo o ficha de diseño.
- Esto daría mayor profundidad narrativa y enriquecería la experiencia del visitante.

## [+13] Creatividad
- Excelente nivel de creatividad. Se nota una propuesta personal, simbólica y estética en cada componente visual del sitio.
- Destaca la idea de los antifaces, pero hubiera sido aún más poderosa con una narrativa acompañante para cada uno.

## [+9] Calidad del Código
- El markup presenta problemas de indentación que dificultan la lectura y mantenibilidad.
- Esto puede provocar errores al actualizar o colaborar en el proyecto.
- Recomendación: formatear automáticamente el código con el comando `[Shift + Alt + F]` o configurar el editor para autoformatear al guardar.
