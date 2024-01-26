// settings.js

function saveSettings() {
    const fontSize = document.getElementById('font-size').value;
    const theme = document.getElementById('theme').value;

    // Save the settings
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('theme', theme);

    alert('Settings saved!');
}