#!/usr/bin/env python3
import sys
import json
import pywhatkit as kit
import time
import pyautogui as pag
import pygetwindow as gw
from datetime import datetime

# Ajusta estas coordenadas de la pantalla (caja de texto de WhatsApp)
X_CAJA_MENSAJE = 600  # eje X
Y_CAJA_MENSAJE = 950  # eje Y





def dar_foco_caja_mensaje():
    """Hace click en la caja de mensaje para dar foco."""
    time.sleep(3)  # espera a que WhatsApp Web cargue
    pag.click(X_CAJA_MENSAJE, Y_CAJA_MENSAJE)
    time.sleep(1)  # pequeño delay para asegurar foco

def enviar_mensaje(numero: str, mensaje: str, inmediato: bool = True, hora: int = None, minuto: int = None):
    numero_formateado = f"+{''.join(ch for ch in numero if ch.isdigit())}"

    try:
        if inmediato:
            kit.sendwhatmsg_instantly(numero_formateado, mensaje, wait_time=7, tab_close=False)
            dar_foco_caja_mensaje()  # damos foco antes de presionar Enter
            pag.press("enter")
            time.sleep(1)
            print(json.dumps({"status": "sent", "phone": numero_formateado, "message": mensaje}))
        else:
            if hora is None or minuto is None:
                raise ValueError("Debes especificar hora y minuto para mensajes programados")
            kit.sendwhatmsg(numero_formateado, mensaje, hora, minuto, wait_time=20)
            dar_foco_caja_mensaje()
            pag.press("enter")
            print(json.dumps({"status": "scheduled", "phone": numero_formateado, "message": mensaje, "time": f"{hora}:{minuto}"}))
    except Exception as e:
        print(json.dumps({"status": "error", "error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"status": "error", "error": "Uso: python whatsapp_sender.py <phone> <message>"}), file=sys.stderr)
        sys.exit(1)

    phone = sys.argv[1]
    message = sys.argv[2]
    enviar_mensaje(phone, message, inmediato=True)
