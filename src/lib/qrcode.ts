// QR Code generation utilities
// Using a simple QR code generation approach that works without external libraries

export function generateTicketQRData(ticketCode: string): string {
  // Create a URL that can be scanned to validate the ticket
  const baseUrl = window.location.origin;
  return `${baseUrl}/validate?ticket=${ticketCode}`;
}

export function generateMerchQRPaymentLink(productId: string, productName: string, price: number): string {
  // Create a Stripe Payment Link URL for onboard QR payments
  // In production, this would be a real Stripe Payment Link
  const baseUrl = window.location.origin;
  return `${baseUrl}/pay?product=${productId}&name=${encodeURIComponent(productName)}&price=${price}`;
}

// Generate a unique ticket code
export function generateTicketCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `OST-${timestamp}-${random}`;
}

// Validate ticket code format
export function isValidTicketCode(code: string): boolean {
  const pattern = /^OST-[A-Z0-9]+-[A-Z0-9]+$/;
  return pattern.test(code);
}

// Generate QR code as SVG (simple implementation)
export function generateQRCodeSVG(data: string, size: number = 200): string {
  // This is a placeholder - in production, use a library like qrcode
  // For now, we'll create a simple visual representation
  const encoded = btoa(data).slice(0, 25);
  const cells = 21;
  const cellSize = size / cells;
  
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="white"/>`;
  
  // Generate a pattern based on the data
  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      // Position patterns (corners)
      const isPositionPattern = 
        (row < 7 && col < 7) || 
        (row < 7 && col >= cells - 7) || 
        (row >= cells - 7 && col < 7);
      
      // Timing patterns
      const isTimingPattern = (row === 6 || col === 6) && !isPositionPattern;
      
      // Data pattern based on encoded string
      const charIndex = (row * cells + col) % encoded.length;
      const isDataCell = encoded.charCodeAt(charIndex) % 2 === 0;
      
      const shouldFill = isPositionPattern || isTimingPattern || isDataCell;
      
      if (shouldFill) {
        const x = col * cellSize;
        const y = row * cellSize;
        
        if (isPositionPattern) {
          // Draw position pattern
          const inOuter = row < 7 && col < 7 ? 
            (row === 0 || row === 6 || col === 0 || col === 6) :
            row < 7 && col >= cells - 7 ?
            (row === 0 || row === 6 || col === cells - 7 || col === cells - 1) :
            (row === cells - 7 || row === cells - 1 || col === 0 || col === 6);
          
          const inInner = row < 7 && col < 7 ?
            (row >= 2 && row <= 4 && col >= 2 && col <= 4) :
            row < 7 && col >= cells - 7 ?
            (row >= 2 && row <= 4 && col >= cells - 5 && col <= cells - 3) :
            (row >= cells - 5 && row <= cells - 3 && col >= 2 && col <= 4);
          
          if (inOuter || inInner) {
            svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0A0A0A"/>`;
          }
        } else {
          svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0A0A0A"/>`;
        }
      }
    }
  }
  
  svg += '</svg>';
  return svg;
}

// Convert SVG to data URL
export function svgToDataURL(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
