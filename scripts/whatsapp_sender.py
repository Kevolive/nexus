#!/usr/bin/env python3
import sys
import json
import pywhatkit as kit
import time
import pyautogui as pag
from datetime import datetime

def enviar_mensaje(numero: str, mensaje: str, inmediato: bool = True, hora: int = None, minuto: int = None):
    numero_formateado = f"+{''.join(ch for ch in numero if ch.isdigit())}"

    try:
        if inmediato:
            kit.sendwhatmsg_instantly(numero_formateado, mensaje, wait_time=7, tab_close=True)
            print(json.dumps({"status": "sent", "phone": numero_formateado, "message": mensaje}))
        else:
            kit.sendwhatmsg(numero_formateado, mensaje, hora, minuto, wait_time=20)
            time.sleep(5)
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
