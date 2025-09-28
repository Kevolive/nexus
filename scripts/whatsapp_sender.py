#!/usr/bin/env python3
import argparse
import json
import sys
import time
import urllib.parse
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options


def create_driver(profile_path=None, headless=False):
    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")

    # Persistir sesión: evita que tengas que escanear QR cada vez
    if profile_path:
        options.add_argument(r"--user-data-dir=C:\Users\USER\Desktop\Api_Kevin\nexus\chrome_data")


    # Si quieres que no se abra la ventana
    if headless:
        options.add_argument("--headless=new")
        options.add_argument("--window-size=1920,1080")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver


def send_whatsapp(phone: str, message: str, profile_path: str = "./chrome_data", timeout: int = 60, headless: bool = False) -> bool:
    # Normalizar teléfono
    phone_digits = ''.join(ch for ch in phone if ch.isdigit())
    if not phone_digits:
        print(json.dumps({"status": "error", "error": "phone invalid"}), file=sys.stderr)
        return False

    url_message = urllib.parse.quote(message)
    url = f"https://web.whatsapp.com/send?phone={phone_digits}&text={url_message}"

    driver = create_driver(profile_path=profile_path, headless=headless)
    try:
        driver.get(url)
        wait = WebDriverWait(driver, timeout)

        # Esperar a que aparezca la caja de texto
        message_box = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div[contenteditable='true'][data-tab]"))
        )

        # A veces el primer click es necesario
        time.sleep(1)
        message_box.click()
        message_box.send_keys(Keys.ENTER)  # Enviar el mensaje (ya estaba en el link)

        wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.message-out"))
        )

        time.sleep(3)  # Pequeña espera para asegurar envío

        print(json.dumps({"status": "sent", "phone": phone_digits}))
        return True
    except Exception as e:
        print(json.dumps({"status": "error", "error": str(e)}), file=sys.stderr)
        return False
    finally:
        try:
            driver.quit()
        except:
            pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Script para enviar WhatsApp vía Web (Selenium).")
    parser.add_argument("--phone", required=True, help="Número con código de país, ej: 57301XXXXXXX")
    parser.add_argument("--message", required=True, help="Texto del mensaje (usa comillas).")
    parser.add_argument("--profile", default="./chrome_data", help="Carpeta para datos de Chrome (persistir sesión).")
    parser.add_argument("--timeout", type=int, default=60, help="Tiempo de espera máximo en segundos.")
    parser.add_argument("--headless", action="store_true", help="Ejecutar Chrome en headless (no recomendado).")
    args = parser.parse_args()

    ok = send_whatsapp(args.phone, args.message, profile_path=args.profile, timeout=args.timeout, headless=args.headless)
    sys.exit(0 if ok else 1)

