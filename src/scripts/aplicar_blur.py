#!/usr/bin/env python3
import subprocess
import time
import sys

APP_TITLE = "NTS App"

def obtener_id_ventana_por_titulo(title):
    try:
        output = subprocess.check_output(["xdotool", "search", "--name", title])
        ids = output.decode().strip().split('\n')
        return ids[0] if ids else None
    except subprocess.CalledProcessError:
        return None

def aplicar_blur_directo(ventana_id):
    try:
        subprocess.run([
            "xprop",
            "-id", ventana_id,
            "-f", "_KDE_NET_WM_BLUR_BEHIND_REGION", "32c",
            "-set", "_KDE_NET_WM_BLUR_BEHIND_REGION", "0"
        ], check=True)
        print(f"Blur aplicado a ventana con ID: {ventana_id}")
    except subprocess.CalledProcessError as e:
        print("Error aplicando blur:", e)

def main():
    print("Buscando ventana...")
    ventana_id = None
    for _ in range(10):
        ventana_id = obtener_id_ventana_por_titulo(APP_TITLE)
        if ventana_id:
            break
        time.sleep(1)

    if not ventana_id:
        print(f"No se encontró una ventana con título '{APP_TITLE}'")
        sys.exit(1)

    aplicar_blur_directo(ventana_id)

if __name__ == "__main__":
    main()
