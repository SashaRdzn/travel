import requests
import threading
import time
from random import randint


BASE_URL = "http://127.0.0.1:8000/auth/"
NUM_USERS = 1000
MAX_THREADS = 50


success_count = 0
error_count = 0


def register_user(user_id):
    global success_count, error_count
    username = f"user_{user_id}"
    email = f"user_{user_id}@test.com"
    password = "qwerty123"

    try:

        response = requests.post(
            f"{BASE_URL}register/",
            json={"username": username, "email": email, "password": password},
            timeout=5,
        )
        if response.status_code != 201:
            raise Exception(f"Ошибка регистрации: {response.text}")

        response = requests.post(
            f"{BASE_URL}login/",
            json={"username": username, "password": password},
            timeout=5,
        )
        if response.status_code != 200:
            raise Exception(f"Ошибка входа: {response.text}")

        success_count += 1
    except Exception as e:
        error_count += 1
        print(f"Ошибка для user_{user_id}: {str(e)}")


def run_load_test():
    threads = []
    start_time = time.time()

    for i in range(1, NUM_USERS + 1):
        thread = threading.Thread(target=register_user, args=(i,))
        threads.append(thread)
        thread.start()

        if len(threads) >= MAX_THREADS:
            for t in threads:
                t.join()
            threads = []

    for t in threads:
        t.join()

    total_time = time.time() - start_time
    print(f"\nТест завершен за {total_time:.2f} секунд")
    print(f"Успешные операции: {success_count}")
    print(f"Ошибки: {error_count}")


if __name__ == "__main__":
    print(f"Запуск теста для {NUM_USERS} пользователей...")
    run_load_test()
