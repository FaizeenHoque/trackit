import slack_sdk as slack
import os
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from slackeventsapi import SlackEventAdapter

env_path = Path(".") / "../config/.env"
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)
slack_events_adapter = SlackEventAdapter(
    os.environ["SIGNING_SECRET"], "/slack/events", app
)

client = slack.WebClient(token=os.environ["SLACK_TOKEN"])
BOT_ID = client.api_call("auth.test")["user_id"]


@slack_events_adapter.on("member_joined_channel")
def message(payload):
    event = payload.get("event", {})
    user_id = event.get("user")

    if BOT_ID != user_id:
        text = f"Welcome to TRACK IT, <@{user_id}>!\nDONT FORGET TO RSVP(https://trackit-ysws.vercel.app/)!!!!"
        client.chat_postMessage(channel=user_id, text=text)


if __name__ == "__main__":
    app.run(debug=True, port=3001)
