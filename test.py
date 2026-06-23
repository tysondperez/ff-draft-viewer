import requests
import xml.etree.ElementTree as ET
import os
import json

# response = requests.get(
#     "http://www46.myfantasyleague.com/fflnetdynamic2025/10721_LEAGUE_draft_results.xml"
# )
# response.raise_for_status()

# root = ET.fromstring(response.text)
# for draftPick in root.findall("draftPick"):
#     round = draftPick.get("round")
#     pick = draftPick.get("pick")
#     id = draftPick.get("player")
    
#     print(f"Player ID: {id} | Round: {round} | Pick: {pick}")

response = requests.get(
        "https://www46.myfantasyleague.com/2025/export?TYPE=league&L=10721&APIKEY=axZi3cqavuWqx12mOVnGYzMeFKQtiQ%3D%3D&DETAILS=&SINCE=&PLAYERS=&JSON=1",
    )

print(response.json())

# filename = "player-list.json"

# with open (filename, "w") as f:
#     json.dump(response.json(), f, indent=2)
