$(document).ready(function(){

    var state = "hide"; // state of extension on the page
    var container;
    var input;
    var searchButton;
    var resultsContainer;

    var dictionary = {
        overallResults: {
            npm: "Node Package Manager",
            CSS: "Cascading Style Sheets",
            CTO: "Chief Technology Office",
            CXD: "Client Experience and Digital",
            BRP: "Big Room Planning",
            C11N: "Constellation - new UI Library replacing VUI."
        },
        Cones: {
            AOQ: "Advice Onboarding Questionnaire - hosts the Light Questionnaire (LQ), the Comments to Advisors Page, Disclosures page",
            AOW: "Advice Onboarding Webapp - hosts our Log on page (aka Triage page) that links to XIP/OBD after you log on",
            NEW: "Notification Enrollment Webapp - hosts the communication hub pages",
            NJO: "PAS Prospect Registration (Modern)",
            LQ:	 "Light Questionnaire (lives within the AOQ application)",
            CTA: "Comments to advisors (lives within the AOQ application)",
            dao: "Onboarding Dashboard (OBD)",
            AOE: "'Advice Onboarding Endpoint' - provides data used by the Light Questionnaire and Comments to Advisors",
            DAJ: "Provides data used by the Onboarding Dashboard",
            OPA: "Online plan acceptance",
    
        }
    };

    
    function createExtensionBody() {
        input = $("<input/>", {
            type: "text",
            class: "form-control",
            id: "inputValue",
            placeholder: "e.g.: npm"
        }).css({
            width:"250px",
            height:"40px",
            marginRight: "5px",
        });

        searchButton = $("<button>🔎</button>").attr('id', 'searchButton').css({
            padding: "5px",
            fontSize: "19px",
            height: "40px",
            width: "40px",
            boxShadow: "0 2px 2px darkslategray",
            cursor: "pointer",
            borderRadius:"9999px",
            backgroundColor:"rgb(71, 71, 71)"
        });

        container = $(
            "<div class='container'><h2>Enter Acronym</h2></div>")
            .css({
                padding: "15px",
                fontSize:"20px",
                width: "343px",
                height: "187px",
                background: "white",
                position: "fixed",
                borderRadius:"20px",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
                right: "0",
                top: "0",
                "z-index": "9999",
                marginTop: "10px",
                marginRight: "10px"
            });

        $(container).append(input);
        $(container).append(searchButton);
        $('body').append(container);
    }

    function findAcronym(value) {
        let results = {};

        if (dictionary.overallResults && dictionary.overallResults.hasOwnProperty(value)) {
            console.log("Found in overallResults");
            results.overallResults = dictionary.overallResults[value];
        }
        if (dictionary.Cones && dictionary.Cones.hasOwnProperty(value)) {
            console.log("Found in Cones");
            results.Cones = dictionary.Cones[value];
        }
    
        // If at least one result is found, return the results object
        if (Object.keys(results).length > 0) {
            return results;
        }

        return false;
    }

    function generateResults(result) {

        resultsContainer = $("<div class='resultsContainer'><b>Results</b></div>");
        // Assuming the structure of the result object
        var acrossVanguardValue = result.overallResults ? result.overallResults : '(0) Results Found';
        var conesValue = result.Cones ? result.Cones : '(0) Results found';
    
        // Creating divs for headers and spans for values
        var headingVanguard = $("<div class='resultsHeading leftColumn'>Across Vanguard:<span id='resultsSpan'>"+acrossVanguardValue + "</span></div>");
        var headingCones = $("<div class='resultsHeading rightColumn'>Cones:<span id='resultsSpan'>"+conesValue + "</span></div>");
    
        // Appending headers and spans to the results container
        $(resultsContainer).append(headingVanguard);
        $(resultsContainer).append(headingCones);
        $(container).css('height', 225 + 'px');
        // Appending the results container to the main container
        $(container).append(resultsContainer);
    }
  
    // Listen for keydown event on the document
    $(document).keydown(function(e) {
        if (e.key === " " && !$(e.target).is('input')) {
            e.preventDefault();  
            var inputValue = $('#inputValue').val();
            console.log(inputValue);
            if (inputValue === undefined || inputValue.trim() === "") {
                if (state === "hide") {
                    createExtensionBody();
                    state = "show";
                } else if (state === "show") {
                    state = "hide";
                    container.remove(); // Remove the container if it's already shown
                }
            }
        }
        else if (e.key === "Enter" && $(e.target).is('#inputValue')) {
            e.preventDefault(); // Prevent the default Enter key behavior
            var inputValue = $('#inputValue').val();
            console.log('Enter pressed with Input Value:', inputValue);

            if (resultsContainer) {
                resultsContainer.remove(); // Clear existing results
            }

            var result = findAcronym(inputValue);
            if (result !== false) {
                console.log('Acronym Found:', result);
            } else {
                console.log('Acronym Not Found', result);
            }

            $('#inputValue').val("");
            generateResults(result);

            // Set focus on the input box
            $('#inputValue').focus();
        }
    });

    // Listen for click event on the search button 
    $(document).on('click', '#searchButton', function() {
        
        var inputValue = $('#inputValue').val();
        $('#inputValue').focus();
    
        console.log('Input Value:', inputValue);

        if (resultsContainer) {
            resultsContainer.remove(); // Clear existing results
        }

        var result = findAcronym(inputValue);
        if (result !== false) {
            console.log('Acronym Found:', result);
        } else {
            console.log('Acronym Not Found', result);
        }

        $('#inputValue').val("");
        generateResults(result);
        $('#inputValue').focus();
        
    });

});
