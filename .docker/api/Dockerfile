# Build stage
FROM python:latest AS builder
COPY requirements.txt .

# install dependencies to the local user directory (eg. /root/.local)
RUN pip install --user -r requirements.txt

# second unnamed stage
FROM python:slim
WORKDIR /app

# copy only the dependencies installation from the 1st stage image
COPY --from=builder /root/.local /root/.local
#COPY ./src .

ENV PATH=/root/.local:$PATH
ENV PATH=/root/.local/bin:$PATH

CMD [ "./manage.py", "runserver" ]