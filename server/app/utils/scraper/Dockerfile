FROM ubuntu:18.04

WORKDIR /app
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev

COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

# EXPOSE 80

# # Keeps Python from generating .pyc files in the container.
# ENV PYTHONDONTWRITEBYTECODE=1

# # Turns off buffering for easier container logging
# ENV PYTHONUNBUFFERED=1

# Install pip requirements.
COPY . /app

# # Creates a non-root user with an explicit UID and adds permission to access the /app folder.
# RUN python -m pip install -r requirements.txt 


COPY . .

# Provides defaults for an executing container; can be overridden with Docker CLI.
ENTRYPOINT FLASK_APP=scrape.py flask run
