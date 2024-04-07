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

function parse_cookie() {
    console.log(document.cookie);
    const cookie_fields = document.cookie.split(";");

    let cookie_data = {};
    cookie_fields.forEach(element => {
        const field_data = element.split("=");
        if (field_data.length == 2) {
            cookie_data[field_data[0]] = field_data[1];
        }
    });
    console.log(cookie_data);
    return cookie_data;
}

function load() {
    const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);

    const cookie_data = parse_cookie();

    if (url_params.has("jumble") && url_params.get("jumble").length == 6) {
        let jumble = url_params.get("jumble");
        document.cookie = `jumble=${jumble};path=/;max-age=604800;SameSite=Strict`;
        display(jumble);
    } else if ("jumble" in cookie_data && cookie_data["jumble"].length == 6) {
        document.cookie = `jumble=${cookie_data["jumble"]};path=/;max-age=604800;SameSite=Strict`;
        display(cookie_data["jumble"]);
    } else {
        fetchJSONData("./words/jumbles.json").then(words => {
            const random_word = words[Math.floor(Math.random() * words.length)];
            const jumble = random_word.shuffle();

            document.cookie = `jumble=${jumble};path=/;max-age=604800;SameSite=Strict`;
            display(jumble);
        });
    }
}