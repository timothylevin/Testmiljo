// CSS som en sträng
const filterKnappCSS = `
    #filter-knapp-container {
        position: fixed;
        top: 85%; /* Flytta knappen lägre ned på skärmen */
        right: 10px;  /* Placera knappen närmre högerkanten */
        transform: translateY(-15%); /* Justera så att knappen flyttas ned baserat på dess höjd */
        z-index: 1000; /* Se till att knappen är ovanpå andra element */
    }

    #filter-knapp {
        background-color: #fff; /* Vit bakgrund */
        border: 1px solid #ccc; /* Mycket smal kantlinje */
        width: 60px;
        height: 60px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        border-radius: 5px; /* Gör knappen fyrkantig med lätt rundade hörn */
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s, box-shadow 0.3s;
        padding: 0;
    }
    #filter-knapp:hover {
        background-color: #f0f0f0; /* Lättare bakgrund vid hover */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    #filter-knapp:active {
        background-color: #e0e0e0; /* Ändra bakgrundsfärg vid klick */
    }

    #filter-knapp img {
        max-width: 80%; /* Gör så att bilden tar upp 80% av knappens yta */
        max-height: 80%;
    }

    #filter-container {
        display: none; /* Dölj containern som standard */
        position: fixed;
        top: 0;
        right: 0;  
        width: 250px; /* Bredd på menyn */
        height: 100%; /* Gör menyn full höjd */
        z-index: 1001; /* Se till att containern är ovanpå andra element */
        background-color: #fff;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
        padding: 10px;
        border-radius: 0;
        transform: translateX(100%); /* Starta utanför skärmen till höger */
        transition: transform 0.3s ease-in-out;
    }

    #filter-container.show {
        display: block;
        transform: translateX(0); /* Glid in menyn från höger */
    }

    .button-container {
        margin-top: 10px;
    }

    .filter-img {
        width: 30px; /* Justera denna storlek enligt önskemål */
        height: auto;
        margin-right: 10px; /* Lägger till mellanrum mellan bild och text */
    }
`;

// Skapa ett style-element och lägg till CSS
const filterKnappStyle = document.createElement('style');
filterKnappStyle.textContent = filterKnappCSS;
document.head.appendChild(filterKnappStyle);

// JavaScript för att hantera knapptryckning och visa filtermeny
document.addEventListener("DOMContentLoaded", function() {
    const filterKnappContainer = document.createElement('div');
    filterKnappContainer.id = 'filter-knapp-container';

    const filterKnapp = document.createElement('button');
    filterKnapp.id = 'filter-knapp';
    filterKnapp.className = 'fab';

    // Lägg till bilden i knappen
    const filterImg = document.createElement('img');
    filterImg.src = 'bilder/filtrera_bild.png'; // Ersätt med sökvägen till din bild
    filterImg.alt = 'Filtrera';

    filterKnapp.appendChild(filterImg);
    filterKnappContainer.appendChild(filterKnapp);
    document.body.appendChild(filterKnappContainer);

    // Skapa container för filtrering
    const filterContainer = document.createElement('div');
    filterContainer.id = 'filter-container';
    document.body.appendChild(filterContainer);

    // Lägg till innehåll i filtercontainern
    createFilterContent(filterContainer);

    // Lägg till lyssnare för att visa och dölja menyn
    filterKnapp.addEventListener('click', function() {
        if (filterContainer.classList.contains('show')) {
            filterContainer.classList.remove('show');
        } else {
            filterContainer.classList.add('show');
        }
    });

    // Stäng menyn när man klickar utanför den
    document.addEventListener('click', function(event) {
        if (!filterKnappContainer.contains(event.target) && !filterContainer.contains(event.target)) {
            filterContainer.classList.remove('show');
        }
    });

    function createFilterContent(contentDiv) {
        // Skapa en container div för att centrera innehållet
        const container = document.createElement('div');
        container.className = 'button-container';

        // Skapa en lista med checkboxar och bilder
        const filterList = document.createElement('ul');
        filterList.style.listStyleType = 'none'; // Ta bort punktlistestilen
        filterList.style.padding = '0'; // Ta bort padding

        const filters = [
            {
                id: 'massorCheckbox',
                text: 'Mässor',
                imgSrc: 'bottom_panel/Upptack/bilder/massa_ikon.png',
                onChange: function(event) {
                    if (typeof Upptack_geojsonHandler !== 'undefined') {
                        if (event.target.checked) {
                            console.log('Filtering to Mässor layer');
                            Upptack_geojsonHandler.filterLayer('Mässor');
                            updateCheckboxes('Mässor');
                        } else {
                            Upptack_geojsonHandler.deactivateLayer('Mässor');
                        }
                    } else {
                        console.error("Upptack_geojsonHandler är inte definierad.");
                    }
                    filterContainer.classList.remove('show'); // Stäng menyn
                }
            },
            {
                id: 'jaktkortCheckbox',
                text: 'Jaktkort',
                imgSrc: 'bottom_panel/Upptack/bilder/jaktkort_ikon.png',
                onChange: function(event) {
                    if (typeof Upptack_geojsonHandler !== 'undefined') {
                        if (event.target.checked) {
                            console.log('Filtering to Jaktkort layer');
                            Upptack_geojsonHandler.filterLayer('Jaktkort');
                            updateCheckboxes('Jaktkort');
                        } else {
                            Upptack_geojsonHandler.deactivateLayer('Jaktkort');
                        }
                    } else {
                        console.error("Upptack_geojsonHandler är inte definierad.");
                    }
                    filterContainer.classList.remove('show'); // Stäng menyn
                }
            },
            {
                id: 'jaktskyttebanorCheckbox',
                text: 'Jaktskyttebanor',
                imgSrc: 'bottom_panel/Upptack/bilder/jaktskyttebanor_ikon.png',
                onChange: function(event) {
                    if (typeof Upptack_geojsonHandler !== 'undefined') {
                        if (event.target.checked) {
                            console.log('Filtering to Jaktskyttebanor layer');
                            Upptack_geojsonHandler.filterLayer('Jaktskyttebanor');
                            updateCheckboxes('Jaktskyttebanor');
                        } else {
                            Upptack_geojsonHandler.deactivateLayer('Jaktskyttebanor');
                        }
                    } else {
                        console.error("Upptack_geojsonHandler är inte definierad.");
                    }
                    filterContainer.classList.remove('show'); // Stäng menyn
                }
            }
        ];

        filters.forEach(filter => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = filter.id;
            checkbox.onchange = filter.onChange;

            const label = document.createElement('label');
            label.htmlFor = filter.id;
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.cursor = 'pointer'; // Gör labeln klickbar

            const img = document.createElement('img');
            img.src = filter.imgSrc;
            img.alt = filter.text;
            img.className = 'filter-img'; // Lägger till en specifik klass för bildstorlek

            label.appendChild(img);
            label.appendChild(document.createTextNode(filter.text));

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            filterList.appendChild(listItem);
        });

        container.appendChild(filterList);
        contentDiv.appendChild(container);

        function updateCheckboxes(activeLayer) {
            filters.forEach(filter => {
                const checkbox = document.getElementById(filter.id);
                checkbox.checked = (filter.text === activeLayer);
            });
        }
    }
});
