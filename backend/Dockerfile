FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip --index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip install -r requirements.txt --index-url https://pypi.tuna.tsinghua.edu.cn/simple

COPY . .

EXPOSE 8000

# Для Django + Gunicorn
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]

# Или для Flask/FastAPI
# CMD ["python", "app.py"]