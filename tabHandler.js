// Funktion för att återställa flikarna till sitt ursprungliga tillstånd
function resetTabs() {
    var tabs = document.getElementsByClassName('tab-pane');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none'; // Göm flikarna
        tabs[i].innerHTML = ''; // Ta bort innehållet i flikarna
    }
    var tabContent = document.getElementById('tab-content');
    tabContent.style.display = 'none'; // Göm flikinnehållet
}

// Funktion för att öppna en flik
function openTab(tabId, url) {
    resetTabs(); // Återställ flikarna innan en ny öppnas
    var tab = document.getElementById(tabId);
    tab.style.display = 'block'; // Visa den valda fliken
    var tabContent = document.getElementById('tab-content');
    tabContent.style.display = 'block'; // Visa flikinnehållet

    if (tabId === 'tab4') {
        // Om det är tab4 (Kaliberkrav), visa knapparna för alternativen
        var tabContent = document.getElementById('tab4');
        tabContent.innerHTML = ''; // Rensa flikinnehållet

        // Rubrik för fliken
        var heading = document.createElement('h2');
        heading.textContent = 'Kaliberkrav';
        tabContent.appendChild(heading);

        // Brödtext för information
        var paragraph = document.createElement('p');
        paragraph.textContent = 'Kaliberkrav och lämplig hagelstorlek vid jakt';
        tabContent.appendChild(paragraph);

        var button1 = document.createElement('button');
        button1.textContent = 'Kaliberkrav: Däggdjur';
        button1.onclick = function() {
            openKaliberkravTab('bottom_panel/Kaliberkrav/Kaliberkrav_Daggdjur.html');
        };
        tabContent.appendChild(button1);

        var button2 = document.createElement('button');
        button2.textContent = 'Kaliberkrav: Fågel';
        button2.onclick = function() {
            openKaliberkravTab('bottom_panel/Kaliberkrav/Kaliberkrav_Fagel.html');
        };
        tabContent.appendChild(button2);
    } else {
        // Om det inte är tab4 (Kaliberkrav), hämta innehållet från den angivna URL:en
        fetch(url)
            .then(response => response.text())
            .then(html => {
                tab.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching tab content:', error);
            });
    }
}

// Funktion för att öppna Kaliberkrav-fliken
function openKaliberkravTab(url) {
    var tabContent = document.getElementById('tab-content');
    var tab = document.createElement('div');
    tab.className = 'tab-pane';
    tabContent.appendChild(tab);

    // Rubrik för fliken
    var heading = document.createElement('h2');
    heading.textContent = 'Kaliberkrav';
    tab.appendChild(heading);

    // Brödtext för information
    var paragraph = document.createElement('p');
    paragraph.textContent = 'Kaliberkrav och lämplig hagelstorlek vid jakt';
    tab.appendChild(paragraph);

    // Dölj rubriken och brödtexten initialt
    heading.style.display = 'none';
    paragraph.style.display = 'none';

    // Hämta innehållet från den angivna URL:en
    fetch(url)
        .then(response => response.text())
        .then(html => {
            tab.innerHTML += html; // Lägg till innehållet från URL:en

            // Visa innehållet och dölj rubriken och brödtexten igen
            tab.style.display = 'block';
            heading.style.display = 'none';
            paragraph.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching Kaliberkrav content:', error);
        });
}

// Funktion för att öppna en flik med koordinatparametrar
function openTabWithCoordinates(tabId, url) {
    var queryString = `?lat=${window.userLatitude}&lon=${window.userLongitude}`;
    var fullUrl = url + queryString;

    console.log('Full URL:', fullUrl); // Logga den fullständiga URL:en för att kontrollera

    resetTabs(); // Återställ flikarna innan en ny öppnas
    var tab = document.getElementById(tabId);
    tab.style.display = 'block'; // Visa den valda fliken
    var tabContent = document.getElementById('tab-content');
    tabContent.style.display = 'block'; // Visa flikinnehållet

    fetch(fullUrl)
        .then(response => {
            console.log('Fetch response status:', response.status); // Logga statuskoden från fetch-svaret
            return response.text();
        })
        .then(html => {
            console.log('Fetched HTML content:', html); // Logga det hämtade HTML-innehållet
            tab.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching tab content:', error);
        });
}


// Händelselyssnare för att hantera klick utanför flikarna och panelknapparna
document.addEventListener('click', function(event) {
    var tabContent = document.getElementById('tab-content');
    if (!tabContent.contains(event.target) && !event.target.matches('.panel-button img')) {
        resetTabs(); // Återställ flikarna om användaren klickar utanför dem
    }
});

// Funktion för att stänga flikinnehållet
function closeTabContent() {
    var tabContent = document.getElementById('tab-content');
    tabContent.style.display = 'none';
}

// Stäng flikinnehållet när man klickar utanför det
document.addEventListener('click', function(event) {
    var tabContent = document.getElementById('tab-content');
    if (!tabContent.contains(event.target) && !event.target.matches('.panel-button img')) {
        closeTabContent();
    }
});
