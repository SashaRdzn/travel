import requests
import threading
import time
from random import randint

BASE_URL = "http://192.168.0.149:80/api-kidswear/"
NUM_USERS = 1000
MAX_THREADS = 100

success_count = 0
error_count = 0

def register_user(user_id):
    global success_count, error_count
    username = f"user_{user_id}"
    full_name = f"User{user_id} Testov"
    email = f"user_{user_id}@test.com"
    password = "qwerty123"

    try:
        response = requests.post(
            f"{BASE_URL}signup",
            json={
                "username": username,
                "full_name": full_name,
                "email": email,
                "password": password,
                "is_agree": True
            },
            timeout=5,
        )
        if response.status_code != 201:
            raise Exception(f"Registration error: {response.text}")

        # Login request
        response = requests.post(
            f"{BASE_URL}login",
            json={"email": email, "password": password},
            timeout=5,
        )
        if response.status_code != 200:
            raise Exception(f"Login error: {response.text}")

        success_count += 1
    except Exception as e:
        error_count += 1
        print(f"Error for user_{user_id}: {str(e)}")

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
    print(f"\nTest completed in {total_time:.2f} seconds")
    print(f"Successful operations: {success_count}")
    print(f"Errors: {error_count}")

if __name__ == "__main__":
    print(f"Starting test for {NUM_USERS} users...")
    run_load_test()