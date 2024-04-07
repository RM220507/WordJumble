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

function check(length, input, jumble) {
    if (input.length != length) {
        return false;
    }

    for (let i=0; i < length; i++) {
        if (occurences_of_char(input, input[i]) > occurences_of_char(jumble, input[i])) {
            return false;
        }
    }
    
    let valid = fetchJSONData(`./words/${length}.json`).then(words => {
        return words.includes(input);
    });

    return valid;
}

function set_border(element, correct) {
    if (correct) {
        element.style.border = "thick solid #00FF00";
    } else {
        element.style.border = "thick solid #FF0000";
    }
}

function check_all() {
    jumble = document.getElementById("jumble").innerText;

    length_3 = document.getElementById("3-letter");
    length_3_correct = check(3, length_3.value, jumble);
    set_border(length_3, length_3_correct);

    length_4 = document.getElementById("4-letter");
    length_4_correct = check(4, length_4.value, jumble);
    set_border(length_4, length_4_correct);

    length_5 = document.getElementById("5-letter");
    length_5_correct = check(5, length_5.value, jumble);
    set_border(length_5, length_5_correct);

    length_6 = document.getElementById("6-letter");
    length_6_correct = check(6, length_6.value, jumble);
    set_border(length_6, length_6_correct);

    if (length_3_correct && length_4_correct && length_5_correct && length_6_correct) {
        location.reload();
    }
}