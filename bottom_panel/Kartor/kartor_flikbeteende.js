function openKartor() {
    // Hitta tab-pane för kartor
    const tabPane = document.getElementById('tab2');
    if (!tabPane) {
        console.error('Tab pane for kartor not found.');
        return;
    }

    // Rensa tidigare innehåll
    tabPane.innerHTML = '';

    // Skapa en container div för att centrera innehållet
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.height = '100vh';
    container.style.overflow = 'hidden'; // Förhindra scrollning

    // Skapa knapp-container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.style.display = 'flex';

    // Definiera knapparna med deras respektive egenskaper
    const buttons = [
        {
            className: 'styled-button',
            onclick: "Kartor_geojsonHandler.toggleLayer('Allmän jakt: Däggdjur', ['https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_daggdjur/geojsonfiler/Rvjaktilvdalenskommun_1.geojson', 'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_daggdjur/geojsonfiler/Allman_jakt_daggdjur_2.geojson'])",
            imgSrc: 'bottom_panel/Kartor/bilder/daggdjurikon.png',
            imgAlt: 'Allmän jakt: Däggdjur'
        },
        {
            className: 'styled-button',
            onclick: "Kartor_geojsonHandler.toggleLayer('Allmän jakt: Fågel', ['https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_Fagel/geojsonfiler/OvanfrLapplandsgrnsen_4.geojson', 'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_Fagel/geojsonfiler/NedanfrLappmarksgrnsen_3.geojson', 'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_Fagel/geojsonfiler/GrnslvsomrdetillFinland_5.geojson', 'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_Fagel/geojsonfiler/Grnsfrripjaktilvdalenskommun_2.geojson', 'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Allman_jakt_Fagel/geojsonfiler/Lnsindelning_1.geojson'])"
            imgSrc: 'bottom_panel/Kartor/bilder/fagelikon.png',
            imgAlt: 'Allmän jakt: Fågel'
        },
        {
            className: 'styled-button',
            id: 'huvudknapp-älgjakt-button', // Ändrad id
            imgSrc: 'bottom_panel/Kartor/bilder/algikon.png',
            imgAlt: 'Huvudknapp-Älgjakt' // Ändrad imgAlt
        }
    ];

    // Skapa knappar och lägg till dem i knapp-container
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = button.className;
        btn.setAttribute('onclick', button.onclick || '');
        btn.id = button.id || '';

        const img = document.createElement('img');
        img.src = button.imgSrc;
        img.alt = button.imgAlt;

        btn.appendChild(img);
        buttonContainer.appendChild(btn);
    });

    // Lägg till knapp-container till tab-pane
    tabPane.appendChild(buttonContainer);

    // Lägg till tab-pane till container
    container.appendChild(tabPane);

    // Lägg till container till body
    document.body.appendChild(container);

    // Skapa en meny för huvudknappen Älgjakt
    const huvudknappAlgjaktButton = document.getElementById('huvudknapp-älgjakt-button');

    // Hantera klick på huvudknappen
    huvudknappAlgjaktButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Förhindra att klick utanför menyn stänger den
        showElkMapOptions();
    });

    // Funktion för att visa alternativ för Älgjaktskartan
    function showElkMapOptions() {
        buttonContainer.innerHTML = ''; // Rensa knappcontainern

        const elkJaktsomradenButton = document.createElement('button');
        elkJaktsomradenButton.className = 'styled-button';
        elkJaktsomradenButton.onclick = function() {
            // Ladda WMS-lager för Älgjaktsområden
            loadElgjaktsomradenWMS();
        };

        const elkAlternativButton = document.createElement('button');
        elkAlternativButton.className = 'styled-button';
        elkAlternativButton.onclick = function() {
            Kartor_geojsonHandler.toggleLayer('Älgjaktskartan', [
                'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Algjaktskartan/geojsonfiler/lgjaktJakttider_1.geojson',
                'https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Kartor/Algjaktskartan/geojsonfiler/Omrdemedbrunstuppehll_2.geojson'
            ]);
            restoreOriginalButtons();
        };

        const jaktsomradenImg = document.createElement('img');
        jaktsomradenImg.src = 'bottom_panel/Kartor/bilder/Algjaktsomraden_ikon.png';
        jaktsomradenImg.alt = 'Älgjaktsområden';
        elkJaktsomradenButton.appendChild(jaktsomradenImg);

        const alternativImg = document.createElement('img');
        alternativImg.src = 'bottom_panel/Kartor/bilder/Algjaktskartan_ikon.png';
        alternativImg.alt = 'Älgjaktskartan'; // Ändrad imgAlt
        elkAlternativButton.appendChild(alternativImg);

        buttonContainer.appendChild(elkJaktsomradenButton);
        buttonContainer.appendChild(elkAlternativButton);
    }

    // Funktion för att återställa de ursprungliga knapparna
    function restoreOriginalButtons() {
        buttonContainer.innerHTML = '';

        // Skapa och lägg till ursprungliga knappar
        buttons.forEach(button => {
            if (button.id !== 'huvudknapp-älgjakt-button') {
                const btn = document.createElement('button');
                btn.className = button.className;
                btn.setAttribute('onclick', button.onclick || '');

                const img = document.createElement('img');
                img.src = button.imgSrc;
                img.alt = button.imgAlt;

                btn.appendChild(img);
                buttonContainer.appendChild(btn);
            }
        });

        // Lägg till knappen för Huvudknapp Älgjakt igen
        buttonContainer.appendChild(huvudknappAlgjaktButton);
    }

    // Debugging
    console.log('Kartor tab created and added to body');
}
