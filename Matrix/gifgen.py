# pip install pillow
from PIL import Image, ImageDraw
import math

def grid_to_gif(
    grid,
    out_path="grid.gif",
    size_px=64,
    frames=24,
    fps=12,
    bg=(1,1,1),
    circle_scale=0.28,          # smaller circles: fraction of cell size -> radius ≈ cell*circle_scale
    circle_radius_px=None        # OR set an explicit pixel radius (overrides circle_scale)
):
    """
    grid: list of 8 strings of length 8, using only 'W', 'P', 'R', 'B'
    bg: background color (default (1,1,1))
    circle_scale: radius as a fraction of cell size (ignored if circle_radius_px is set)
    circle_radius_px: explicit radius in pixels (takes precedence over circle_scale)
    """
    assert len(grid) == 8 and all(len(row) == 8 for row in grid), "Grid must be 8x8."
    assert size_px % 8 == 0, "size_px must be divisible by 8."
    cell = size_px // 8

    # Colors
    RED   = (255,  64,  64)
    BLUE  = ( 64, 128, 255)
    PURP  = (190, 110, 255)
    BLACK = (1, 1, 1)

    # Geometry
    if circle_radius_px is not None:
        circle_radius = int(circle_radius_px)
    else:
        # keep circle comfortably inside the cell and visibly smaller
        circle_radius = max(1, min(cell//2 - 3, int(round(cell * circle_scale))))

    dash_len      = int((cell - 2 * max(1, cell // 8)) * 0.6)  # shorter dash
    dash_amp      = max(1, cell // 4)

    # Ensure there's room to bounce without clipping the circle
    max_bounce_room = max(0, (cell // 2) - circle_radius - 2)
    bounce_amp      = max(1, min(dash_amp, max_bounce_room))   # <- always ≥ 1 now

    duration_ms = int(1000 / fps)
    frames_out = []

    for f in range(frames):
        frame = Image.new("RGB", (size_px, size_px), bg)
        d = ImageDraw.Draw(frame)
        angle = 2 * math.pi * (f / frames)

        for r in range(8):
            for c in range(8):
                ch = grid[r][c]
                x0, y0 = c * cell, r * cell
                cx = x0 + cell // 2
                cy0 = y0 + cell // 2

                if ch == "W":
                    d.rectangle((x0, y0, x0 + cell - 1, y0 + cell - 1), fill=BLACK)
                    continue

                if ch in ("R", "B"):
                    color = RED if ch == "R" else BLUE
                    cy = cy0 + int(round(bounce_amp * math.sin(angle + (r*0.25 + c*0.15))))
                    d.ellipse(
                        (cx - circle_radius, cy - circle_radius,
                         cx + circle_radius, cy + circle_radius),
                        outline=color,
                        width=1  # thin line
                    )

                elif ch == "P":
                    y = cy0 + int(round(dash_amp * math.sin(angle + (r*0.6 + c*0.9))))
                    x1 = x0 + (cell - dash_len) // 2
                    x2 = x1 + dash_len
                    d.line((x1, y, x2, y), fill=PURP, width=1)

        frames_out.append(frame)

    frames_out[0].save(
        out_path,
        save_all=True,
        append_images=frames_out[1:],
        loop=0,
        duration=duration_ms,
        disposal=2,
        optimize=True,
    )
    return out_path

# Example
if __name__ == "__main__":
    grid = [
        "WWWWBBBB",
        "WWWWPPPP",
        "WWWWRRRR",
        "WWWWBBBB",
        "WWWWPPPP",
        "WWWWRRRR",
        "WWWWBBBB",
        "WWWWPPPP",
    ]
    print("Wrote:", grid_to_gif(grid, out_path="grid.gif", circle_radius_px=2))
