import React, { useRef, useState } from 'react';
import { useI18nStore } from '../../store/i18nStore';

interface DigitalSignatureProps {
  onSign: (signature: string) => void;
}

export function DigitalSignature({ onSign }: DigitalSignatureProps) {
  const { t } = useI18nStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(false);
    onSign(canvas.toDataURL());
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        {t('delivery.signature')}
      </h3>

      <div className="border rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="border border-gray-300 rounded touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={clear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t('common.clear')}
          </button>
          <button
            onClick={() => {
              const canvas = canvasRef.current;
              if (canvas) {
                onSign(canvas.toDataURL());
              }
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}