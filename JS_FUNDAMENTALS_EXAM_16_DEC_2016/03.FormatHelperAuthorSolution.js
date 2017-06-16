function originalAuthorSolution([text]) {
    console.log(text
        .replace(/[ ]*([.,!?:;])[ ]*/g, (match, g1) => `${g1} `)
        .replace(/\. (?=[0-9])/g, (match) => `.`)
        .replace(/" *(.+?) *"/g, (match, g1) => `"${g1}"`)
        .replace(/([.,!?:;]) (?=[.,!?:;])/g, (match, g1) => g1));
}

function modifiedAuthorSolution([text]) {
        let f1 = (match, g1) => `${g1} `;
        let f2 = (match) => `.`;
        let f3 = (match, g1) => `"${g1}"`;
        let f4 = (match, g1) => g1;

        text = text.replace(/[ ]*([.,!?:;])[ ]*/g, f1);
        text = text.replace(/\. (?=[0-9])/g, f2);
        text = text.replace(/" *(.+?) *"/g, f3);
        text = text.replace(/([.,!?:;]) (?=[.,!?:;])/g, f4);

        console.log(text);
}

modifiedAuthorSolution(['Terribly formatted text . With chaotic spacings." Terrible quoting "! Also this date is pretty confusing : 20 . 12. 16 . Sequences like ". . . !" should be displayed as "...!"']);