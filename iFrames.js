//*

document.addEventListener("DOMContentLoaded", function () {
    //* Load URL list from localStorage when the page loads
    loadUrlListFromLocalStorage();

    //* Load default URL
    loadUrl("http://noobiej.tech");

    //* Get form by ID
    const form = document.getElementById("form_Cont");

    //* Add event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        //  Add prefix to URL
        const inputUrl = form.querySelector("input[type='text']").value;

        // alert empty url
        if (inputUrl.trim() === "") {
            loadUrl("http://noobiej.tech");
            alert(
                "URL is empty. Please enter a valid URL. Redirected to Default URL"
            );
            return;
        }

        const prefixedUrl = addPrefix(inputUrl);

        // Save unique prefixed URL to local storage
        saveUniqueUrlToLocalStorage(prefixedUrl);

        // Display content in iframes
        displayInFrames(prefixedUrl);

        // Display URL list
        displayUrlList();

        // Clear the input field after submission
        form.querySelector("input[type='text']").value = " ";
    });

    //* Add event handler for options radio buttons
    const optionsRadioButtons = document.querySelectorAll(
        'input[name="pixel"]'
    );

    optionsRadioButtons.forEach((radioButton) => {
        radioButton.addEventListener("change", function () {
            if (radioButton.checked) {
                const optionValue = radioButton.value;
                localStorage.setItem("selectedOption", optionValue);

                //! Added from spanElements functioning
                // handling the change in options
                const spanElements =
                    document.querySelectorAll(".frame h2 span");
                spanElements.forEach((span) => {
                    if (optionValue === "1") {
                        //s Logic for Width only
                        span.style.display = span.classList.contains("small")
                            ? "inline"
                            : "none";
                    } else if (optionValue === "2") {
                        //s Logic for Device sizes
                        span.style.display = "inline";
                    }
                });
            }
        });
    });

    //* Event listener for clear URL List Btn
    const clearUrlListButton = document.getElementById("clearUrlList");
    clearUrlListButton.addEventListener("click", function () {
        clearUrlList();
    });

    //* Listener for clear URL Form Btn
    const clearUrlFormButton = document.getElementById("clearUrlForm");
    clearUrlFormButton.addEventListener("click", function () {
        clearUrlForm();
    });

    //* Function to load URL in iframes
    function loadUrl(url) {
        const iframes = document.querySelectorAll("iframe");
        iframes.forEach(function (iframe) {
            iframe.src = url;
        });
    }

    //* Function to add prefix to URL
    function addPrefix(url) {
        const prefix = document.querySelector("#http:checked")
            ? "http://"
            : "https://";
        return prefix + url;
    }

    //* Save unique URL to local storage
    function saveUniqueUrlToLocalStorage(url) {
        const urlList = JSON.parse(localStorage.getItem("urlList")) || [];

        // Check if the URL is not already in the list
        if (!urlList.includes(url)) {
            urlList.push(url);
            localStorage.setItem("urlList", JSON.stringify(urlList));
        } else {
            alert("URL is stored in local storage already!");
        }
    }

    //* Display content in iframes
    function displayInFrames(url) {
        loadUrl(url);
    }

    //* Display URL List
    function displayUrlList() {
        const urlListContainer = document.getElementById("urlList");
        const urlList = JSON.parse(localStorage.getItem("urlList")) || [];

        // Clear the existing list
        urlListContainer.innerHTML = "";

        // //! Populate the list
        // urlList.forEach(function (url) {
        //     const listItem = document.createElement("li");
        //     listItem.textContent = url;
        //     urlListContainer.appendChild(listItem);
        // } );

        // Populate the list
        urlList.forEach(function (url) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = url;
            link.href = url;
            link.target = "_blank"; // Open link in a new tab
            listItem.appendChild(link);

            // Add a click event listener to navigate to the URL when clicked
            link.addEventListener("click", function (event) {
                event.preventDefault();
                loadUrl(url);
            });

            urlListContainer.appendChild(listItem);
        });
    }

    //* Clear URL List
    function clearUrlList() {
        localStorage.removeItem("urlList");
        displayUrlList();
    }

    //* Clear Form URL
    function clearUrlForm() {
        const urlInput = form.querySelector("input[type='text']");
        urlInput.value = "";
    }

    //* Load URL List from localStorage
    function loadUrlListFromLocalStorage() {
        displayUrlList();
    }

    //* Load selected option from localStorage
    function loadSelectedOption() {
        const selectedOption = localStorage.getItem("selectedOption");
        if (selectedOption) {
            const correspondingRadioButton = document.querySelector(
                `input[value="${selectedOption}"]`
            );
            if (correspondingRadioButton) {
                correspondingRadioButton.checked = true;

                // Trigger change event manually to update the display based on the selected option
                correspondingRadioButton.dispatchEvent(new Event("change"));
            }
        }
    }

    //* Call the function to load the selected option on page load
    loadSelectedOption();
});
