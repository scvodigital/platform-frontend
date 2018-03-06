document.addEventListener('DOMContentLoaded', function() {
    var menu = new mdc.menu.MDCSimpleMenu(document.querySelector('#share-menu'));
    document.querySelector('#share-menu-button').addEventListener('click', () => menu.open = !menu.open);
});