import json

def contains(word, test_word):
    for char in word:
        if test_word.count(char) > word.count(char):
            return False
    return True

def check_valid(arr, word):
    for test_word in arr:
        if contains(word, test_word):
            return True
    return False

with open("words/3.json") as f:
    length_3 = json.load(f)
    
with open("words/4.json") as f:
    length_4 = json.load(f)
    
with open("words/5.json") as f:
    length_5 = json.load(f)
    
with open("words/6.json") as f:
    length_6 = json.load(f)
    
# remove anagrams from words of length 6
length_6 = list(set(["".join(sorted(word)) for word in length_6]))
print(f"Number of words to check = {len(length_6)}")

valid_words = []
for word in length_6:
    valid_3 = check_valid(length_3, word)
    valid_4 = check_valid(length_4, word)
    valid_5 = check_valid(length_5, word)
    
    if valid_3 and valid_4 and valid_5:
        valid_words.append(word)
        
print(f"Done. Number of valid jumbles = {len(valid_words)}")

with open("words/jumbles.json", "w") as f:
    json.dump(valid_words, f)
