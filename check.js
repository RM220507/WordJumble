function occurences_of_char(string, char) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == char) {
            count++;
        }
    }
    return count;
}

async function fetchJSONData(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data
}

async function check(length, input, jumble) {
    if (input.length != length) {
        return false;
    }

    for (let i=0; i < length; i++) {
        if (occurences_of_char(input, input[i]) > occurences_of_char(jumble, input[i])) {
            return false;
        }
    }

    return await fetchJSONData(`./words/${length}.json`).then(words => {
        return words.includes(input);
    });
}

function set_border(element, correct) {
    if (correct) {
        element.style.border = "thick solid #00FF00";
    } else {
        element.style.border = "thick solid #FF0000";
    }
}

async function check_all() {
    jumble = document.getElementById("jumble").innerText;

    length_3 = document.getElementById("3-letter");
    length_3_correct = await check(3, length_3.value.toLowerCase(), jumble);
    set_border(length_3, length_3_correct);

    length_4 = document.getElementById("4-letter");
    length_4_correct = await check(4, length_4.value.toLowerCase(), jumble);
    set_border(length_4, length_4_correct);

    length_5 = document.getElementById("5-letter");
    length_5_correct = await check(5, length_5.value.toLowerCase(), jumble);
    set_border(length_5, length_5_correct);

    length_6 = document.getElementById("6-letter");
    length_6_correct = await check(6, length_6.value.toLowerCase(), jumble);
    set_border(length_6, length_6_correct);

    if (length_3_correct && length_4_correct && length_5_correct && length_6_correct) {
        new_jumble();
    }
}

function new_jumble() {
    document.cookie = `jumble=empty;path=/;max-age=604800;SameSite=Strict`;
    location.reload();
}

async function share_jumble() {
    const jumble = document.getElementById("jumble").innerText;
    const share_data = {
        title : "Word Jumble",
        text : `Try this word jumble: ${jumble}!`,
        url : `https://RM220507.github.io/WordJumble/index.html?jumble=${jumble}`
    };
    await navigator.share(share_data);
}