const fromText = document.querySelector("#inputText");
toText = document.querySelector("#outputText");
selectTag = document.querySelectorAll("select");
translateBtn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById('languageSelect');

    // Fetch supported languages from the API
    fetch('https://api.mymemory.translated.net/get_supported_languages.php')
        .then(response => response.json())
        .then(data => {
            // Check if data is an array
            if (Array.isArray(data)) {
                data.forEach(lang => {
                    let option = document.createElement('option');
                    option.value = lang.code;
                    option.textContent = lang.name;
                    languageSelect.appendChild(option);
                });
            } else {
                console.error('Unexpected API response format for languages');
            }
        })
        .catch(error => console.error('Error fetching languages:', error));
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