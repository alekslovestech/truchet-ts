interface SvgCanvasProps {
  svg: string;
  className?: string;
}

/**
 * Renders SVG content directly in the DOM. No file writing—draws into the component.
 */
export default function SvgCanvas({ svg, className = "" }: SvgCanvasProps) {
  if (!svg) return null;
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
      role="img"
      aria-label="Truchet rendering"
    />
  );
}
