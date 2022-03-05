from flask import Flask, render_template
import json
import os
import logging
import redis
import gevent
from flask_sockets import Sockets
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

REDIS_URL = os.environ['REDIS_URL']
REDIS_CHAN = 'chat'


app = Flask(__name__)

#Code to implement a rate limit to protect from DOS attacks.
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["10000 per day", "2000 per hour"]
)

#routes the 4 main pages of the web app using flask
@app.route("/")
def home():
    return (render_template("index.html"))

@app.route("/task1")
def task1():
    return (render_template("task1.html"))

@app.route("/task2")
def task2():
    return (render_template("task2.html"))

@app.route("/task3")
def task3():
    return (render_template("task3.html"))



#Websocket

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)
app.debug = 'DEBUG' in os.environ

sockets = Sockets(app)
redis = redis.from_url(REDIS_URL)

class ChatBackend(object):
    """Interface for registering and updating WebSocket clients."""

    def __init__(self):
        self.clients = list()
        self.pubsub = redis.pubsub()
        self.pubsub.subscribe(REDIS_CHAN)

    def __iter_data(self):
        for message in self.pubsub.listen():
            data = message.get('data')
            if message['type'] == 'message':
                app.logger.info(u'Sending message: {}'.format(data))
                json_data = json.loads(data)
                yield json.dumps(json_data)

    def register(self, client):
        """Register a WebSocket connection for Redis updates."""
        self.clients.append(client)

    def send(self, client, data):
        """Send given data to the registered client.
        Automatically discards invalid connections."""
        try:
            client.send(data)
        except Exception:
            self.clients.remove(client)

    def run(self):
        """Listens for new messages in Redis, and sends them to clients."""
        for data in self.__iter_data():
            for client in self.clients:
                gevent.spawn(self.send, client, data)

    def start(self):
        """Maintains Redis subscription in the background."""
        gevent.spawn(self.run)



chats = ChatBackend()
chats.start()

@app.route('/')
def hello():
    return render_template('index.html')

@sockets.route('/submit')
def inbox(ws):
    """Receives incoming chat messages, inserts them into Redis."""
    while not ws.closed:
        # Sleep to prevent *contstant* context-switches.
        gevent.sleep(0.1)
        message = ws.receive()

        if message:
            app.logger.info(u'Inserting message: {}'.format(message))
            redis.publish(REDIS_CHAN, message)


@sockets.route('/receive')
def outbox(ws):
    """Sends outgoing chat messages, via `ChatBackend`."""
    chats.register(ws)

    while not ws.closed:
        # Context switch while `ChatBackend.start` is running in the background.
        gevent.sleep(0.1)



#app.run(debug=True)

