//* Default view
const defaultURL = "noobiej.tech";

//*function to check load state of each frame
function allLoaded() {
    var results = [];
    $("iframe").each(function () {
        if (!$(this).data("loaded")) {
            results.push(false);
        }
    });
    var result = results.length > 0 ? false : true;
    return result;
}

function loadPage($frame, url) {
    if (
        url.substr(0, 7) !== "http://" &&
        url.substr(0, 8) !== "https://" &&
        url.substr(0, 7) !== "file://"
    ) {
        url = "http://" + url;
    }
    $("iframe").not($frame);
    $("iframe").not($frame).data("loaded", false);
    $("iframe").not($frame).attr("src", url);
}

//* when document loads
$(document).ready(function () {
    loadPage("", defaultURL);

    //* query string
    var qsArray = window.location.href.split("?");
    var qs = qsArray[qsArray.length - 1];

    if (qs != "" && qsArray.length > 1) {
        $("#url input[type=text]").val(qs);
        loadPage("", qs);
    }

    //* add event handlers for options radio buttons
    $("input[type=radio]").change(function () {
        $frames = $("#frames");
        $inputs = $("input[type=radio]:checked").val();

        if ($inputs === "1") {
            $frames.addClass("widthOnly");
        } else {
            $frames.removeClass("widthOnly");
        }
    });

    //* when the url text box is used
    $("form").submit(function () {
        loadPage("", $("#url input[type=text]").val());
        return false;
    });

    //* when frame loads
    $("iframe").load(function () {
        var $this = $(this);
        var url = "";
        var error = false;

        try {
            url = $this.contents().get(0).location.href;
        } catch (e) {
            error = true;
            if ($("#url input[type=text]").val() != "") {
                url = $("#url input[type=text]").val();
            } else {
                url = defaultURL;
            }
        }

        //* load other pages with the same URL
        if (allLoaded()) {
            if (error) {
                alert(
                    "Browsers prevent navigation from inside iframes across domains.\nPlease use the text box at the top for external sites."
                );
                loadPage("", defaultURL);
            } else {
                loadPage($this, url);
            }
        }
    });
});
