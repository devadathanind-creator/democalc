const fromText = document.querySelector("#inputText");
toText = document.querySelector("#outputText");
selectTag = document.querySelectorAll("select");
translateBtn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById('languageSelect');
    const supportedLanguages = {
        "ml": "Malayalam",
        "hi": "Hindi",
        "de": "German",
        "fr": "French"
    };

    for (const code in supportedLanguages) {
        let option = document.createElement('option');
        option.value = code;
        option.textContent = supportedLanguages[code];
        languageSelect.appendChild(option);
    }
});


translateBtn.addEventListener("click", () => {
    let text = fromText.value;
    let translateTo = languageSelect.value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${"en"}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});