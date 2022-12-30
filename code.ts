let selection = figma.currentPage.selection;
let selecionLength = selection.length;
let pages = figma.root.children;
let lenght = pages.length;
let titleColor = [];
let pageColor = [];


main();


/* 
если все ок, определяем цвета и красим страницы 
*/
function main() {
    if (allCorrect()) {
        defineColors();
        setColors();
        figma.closePlugin("Готово");
    } else {
        figma.closePlugin("Назовите фреймы Title и Page, затем выберите их и запустите плагин");
        return;
    }
}

/* 
проверяем что в выделении есть хотябы по одному фрейму с нужными названиями 
*/
function allCorrect() {
    let counter = 0;
    for (var i = 0; i < selecionLength; i++) {
        if ((selection[i].name == 'Title') || (selection[i].name == 'Page')) {
            counter++;
        }
    }
    return (counter > 1);

}

/*
присваиваем переменным цвета, в которые будем красить страницы
*/
function defineColors() {
    for (var i = 0; i < selecionLength; i++) {
        if (selection[i].name == 'Title') {
            titleColor = figma.currentPage.selection[i].backgrounds;
        }

        if (selection[i].name == 'Page') {
            pageColor = figma.currentPage.selection[i].backgrounds;
        }
    }
}

/*
красим страницы в нужные цвета
*/
function setColors() {
    for (var i = 0; i < lenght; i++) {
        let page = pages[i]
        let name = page.name

        if (name.startsWith(" ")) {
            page.backgrounds = pageColor
        } else {
            page.backgrounds = titleColor
        }
    }
}