import React, { useEffect, useRef, useState } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousMousePositions = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    const codeAbbreviations = ['BGB', 'StGB', 'ZPO', 'HGB', 'AktG', 'SGB II', 'StVO', 'StPO'];
    const codeAbbreviationsLength = codeAbbreviations.length;

    const randomParagraph = () => {
      const abbreviation = codeAbbreviations[Math.floor(Math.random() * codeAbbreviationsLength)];
      const sectionNumber = Math.floor(Math.random() * 300) + 1;
      return `§ ${sectionNumber} ${abbreviation}`;
    };

    const fontSize = 15;
    const spacing = 10;
    const columns = canvas.width / (fontSize + spacing);

    const rainDrops = Array.from({ length: columns }, () => Math.random() * 20);

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = randomParagraph();
        const yPos = rainDrops[i] * fontSize;

        context.fillText(text, i * (fontSize + spacing), yPos);

        if (yPos > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        rainDrops[i] += Math.random() * 0.5 + 0.5;
      }
    };

    intervalRef.current = setInterval(draw, 60);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dimensions]);

  const drawOverlay = () => {
    const overlayCanvas = overlayCanvasRef.current;
    const overlayCtx = overlayCanvas?.getContext('2d');
    if (!overlayCanvas || !overlayCtx) return;

    const radius = 50;
    const fadeRadius = 80;

    // Clear previous overlay
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Fill the overlay with a darker black color
    overlayCtx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Set composite mode to 'destination-out'
    overlayCtx.globalCompositeOperation = 'destination-out';

    previousMousePositions.current.forEach((position) => {
      // Create radial gradient for fading effect
      const gradient = overlayCtx.createRadialGradient(
        position.x,
        position.y,
        radius,
        position.x,
        position.y,
        fadeRadius
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Draw a circle with the gradient at the mouse position
      overlayCtx.beginPath();
      overlayCtx.arc(position.x, position.y, fadeRadius, 0, 2 * Math.PI, false);
      overlayCtx.fillStyle = gradient;
      overlayCtx.fill();
    });

        // Reset composite mode to 'source-over'
    overlayCtx.globalCompositeOperation = 'source-over';
  };

  useEffect(() => {
    drawOverlay();
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent) => {
    previousMousePositions.current.push({ x: e.clientX, y: e.clientY });

    if (previousMousePositions.current.length > 20) {
      previousMousePositions.current.shift();
    }

    drawOverlay();
  };

  return (
    <div className="fixed inset-0 z-10">
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
      <canvas
        ref={overlayCanvasRef}
        className="fixed inset-0 z-30 bg-transparent"
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
      ></canvas>
    </div>
  );
};

export default MatrixRain;