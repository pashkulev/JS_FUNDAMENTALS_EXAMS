function formatHelper([text]) {
    let singleSpaceAfterSymbols = /([.,!?:;])\s*/g;
    let spaceBeforeSymbols = /\s*([.,!?:;])/g;
    let dotsSpacesAndDigits = /\.\s+(\d+)/g;
    let textInsideQuots = /"\s*(.+?)\s*"/g;

    text = text.replace(singleSpaceAfterSymbols, `$1 `)
        .replace(spaceBeforeSymbols, '$1')
        .replace(dotsSpacesAndDigits, '.$1')
        .replace(textInsideQuots, (match, g1) => `"${g1}"`);

    // let matches = text.match(textInsideQuots);
    // if (matches) {
    //     for (let match of matches) {
    //         let replacementString = '\"' + match.slice(1, match.length - 1).trim() + '\"';
    //         text = text.replace(match, replacementString);
    //     }
    // }
    console.log(text);
}

    formatHelper(['Terribly formatted text . With chaotic spacings." Terrible quoting "! Also this date is pretty confusing : 20 . 12. 16 . Sequences like ". . . !" should be displayed as "...!"']);
formatHelper(['Make,sure to give:proper spacing where is needed... !']);