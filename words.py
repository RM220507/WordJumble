import json

with open("refined-words.json") as f:
    data = json.load(f)
    
output = {}

output["3"] = data["3"]
output["4"] = data["4"]
output["5"] = data["5"]
output["6"] = data["6"]

with open("refined-words.json", "w") as f:
    json.dump(output, f)