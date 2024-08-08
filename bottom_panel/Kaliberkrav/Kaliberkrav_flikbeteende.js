function openKaliberkravTab(url) {
    var tabContent = document.getElementById('tab-content');
    var tab = document.createElement('div');
    tab.className = 'tab-pane';
    tabContent.appendChild(tab);

    fetch(url)
        .then(response => response.text())
        .then(html => {
            tab.innerHTML += html;
            tab.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching Kaliberkrav content:', error);
        });
}


function populateTab4() {
    var tab = document.getElementById('tab4');
    tab.innerHTML = '';

    var heading = document.createElement('h2');
    heading.textContent = 'Kaliberkrav';
    tab.appendChild(heading);

    var paragraph = document.createElement('p');
    paragraph.textContent = 'Kaliberkrav och lämplig hagelstorlek vid jakt';
    tab.appendChild(paragraph);

    var button1 = document.createElement('button');
    var img1 = document.createElement('img');
    img1.src = 'bottom_panel/Kartor/bilder/daggdjurikon.png';
    img1.alt = 'Kaliberkrav: Däggdjur';
    img1.style.width = '90px';
    img1.style.height = '90px';
    button1.appendChild(img1);
    button1.onclick = function() {
        openKaliberkravTab('bottom_panel/Kaliberkrav/Kaliberkrav_Daggdjur.html');
    };
    tab.appendChild(button1);

    var button2 = document.createElement('button');
    var img2 = document.createElement('img');
    img2.src = 'bottom_panel/Kartor/bilder/fagelikon.png';
    img2.alt = 'Kaliberkrav: Fågel';
    img2.style.width = '90px';
    img2.style.height = '90px';
    button2.appendChild(img2);
    button2.onclick = function() {
        openKaliberkravTab('bottom_panel/Kaliberkrav/Kaliberkrav_Fagel.html');
    };
    tab.appendChild(button2);
}