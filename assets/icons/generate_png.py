import os
from PIL import Image, ImageDraw

def create_icon(size):
    # Create image with dark navy background
    img = Image.new('RGBA', (size, size), color=(3, 7, 18, 255))
    draw = ImageDraw.Draw(img)
    
    # Scale variables
    scale = size / 512.0
    
    # 1. Draw grid lines
    grid_color = (255, 255, 255, 12)
    grid_lines = [128, 192, 256, 320, 384]
    for pos in grid_lines:
        scaled_pos = int(pos * scale)
        # Horizontal
        draw.line([(int(96*scale), scaled_pos), (int(416*scale), scaled_pos)], fill=grid_color, width=int(2*scale))
        # Vertical
        draw.line([(scaled_pos, int(96*scale)), (scaled_pos, int(416*scale))], fill=grid_color, width=int(2*scale))
        
    # 2. Draw Price Candles
    # Red candle (down)
    draw.line([(int(160*scale), int(330*scale)), (int(160*scale), int(380*scale))], fill=(248, 113, 113, 255), width=int(4*scale))
    draw.rectangle([int(152*scale), int(340*scale), int(168*scale), int(370*scale)], fill=(248, 113, 113, 255))
    
    # Green candles (up)
    candles = [
        (224, 280, 350, 290, 335),
        (288, 220, 310, 235, 290),
        (352, 140, 250, 155, 230)
    ]
    for cx, w_start, w_end, b_start, b_end in candles:
        draw.line([(int(cx*scale), int(w_start*scale)), (int(cx*scale), int(w_end*scale))], fill=(52, 211, 153, 255), width=int(4*scale))
        draw.rectangle([int((cx-8)*scale), int(b_start*scale), int((cx+8)*scale), int(b_end*scale)], fill=(52, 211, 153, 255))
        
    # 3. Draw Vector Growth curve
    # Approximation of Bezier curve Q(128,390 -> 224,360 -> 288,240 -> 344,185 -> 400,130) using simple line segments
    points = []
    t_steps = 20
    for i in range(t_steps + 1):
        t = i / t_steps
        # Quadratic bezier formula for first half, cubic/linear for the rest
        # For simplicity, let's draw a beautiful smooth curve path:
        x = 128 + t * (400 - 128)
        # Exponential curve: y = A * e^(B * x)
        # We want at x=128, y=390; at x=400, y=130
        y = 390 - 260 * (t ** 1.8)
        points.append((int(x*scale), int(y*scale)))
        
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=(34, 211, 238, 255), width=int(12*scale))
        
    # 4. Draw Glowing Target Node
    tx, ty = int(400*scale), int(130*scale)
    draw.ellipse([tx - int(10*scale), ty - int(10*scale), tx + int(10*scale), ty + int(10*scale)], fill=(34, 211, 238, 255))
    draw.ellipse([tx - int(22*scale), ty - int(22*scale), tx + int(22*scale), ty + int(22*scale)], outline=(34, 211, 238, 128), width=int(3*scale))
    
    return img

if __name__ == '__main__':
    # Ensure directory exists
    os.makedirs('assets/icons', exist_ok=True)
    
    # Generate 192x192
    img_192 = create_icon(192)
    img_192.save('assets/icons/icon-192.png', 'PNG')
    print("Generated: assets/icons/icon-192.png")
    
    # Generate 512x512
    img_512 = create_icon(512)
    img_512.save('assets/icons/icon-512.png', 'PNG')
    print("Generated: assets/icons/icon-512.png")
