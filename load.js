String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

async function fetchJSONData(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data
}

function display(jumble) {
    document.getElementById("jumble").innerText = jumble;

    document.getElementById("3-letter").value = "";
    document.getElementById("4-letter").value = "";
    document.getElementById("5-letter").value = "";
    document.getElementById("6-letter").value = "";
}

function load() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("jumble") && urlParams.get("jumble").length == 6) {
        display(urlParams.get("jumble"));
    } else {
        fetchJSONData("./words/jumbles.json").then(words => {
            const random_word = words[Math.floor(Math.random() * words.length)];
            const jumble = random_word.shuffle();

            display(jumble);
        });
    }
}