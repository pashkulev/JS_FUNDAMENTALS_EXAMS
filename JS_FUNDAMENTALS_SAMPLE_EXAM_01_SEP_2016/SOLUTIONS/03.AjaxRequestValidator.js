function ajaxRequestValidator(input) {
    let hashPattern = input.pop();

    let validMethodRegex = /^Method:\s(GET|POST|PUT|DELETE)$/;
    let validCredentialsRegex = /^Credentials:\s(Basic|Bearer)\s([a-zA-Z0-9]+)$/;
    let validContentRegex = /^Content:\s([.a-zA-Z0-9]+)$/;

    for (let i = 0; i < input.length; i += 3) {
        let methodLine = input[i];
        let methodMatch = validMethodRegex.exec(methodLine);
        let methodType;
        if (methodMatch) {
            methodType = methodMatch[1];
        } else {
            console.log('Response-Code:400');
            continue;
        }

        let credentialsLine = input[i + 1];
        let credentialsMatch = validCredentialsRegex.exec(credentialsLine);
        let authorizationType, authorizationToken;
        if (credentialsMatch) {
            authorizationType = credentialsMatch[1];
            authorizationToken = credentialsMatch[2];
        } else {
            console.log('Response-Code:400');
            continue;
        }

        let contentLine = input[i + 2];
        let contentMatch = validContentRegex.exec(contentLine);
        let content;
        if (contentMatch) {
            content = contentMatch[1];
        } else {
            console.log('Response-Code:400');
            continue;
        }

        if (authorizationType === "Basic" &&
            (methodType === "PUT" || methodType === "POST" || methodType === "DELETE")) {
            console.log(`Response–Method:${methodType}&Code:401`);
            continue;
        }

        if (isValidAuthorization(authorizationToken, hashPattern)) {
            console.log(`Response–Method:${methodType}&Code:200&Header:${authorizationToken}`);
        } else {
            console.log(`Response–Method:${methodType}&Code:403`);
        }
    }

    function isValidAuthorization(authorization, hashPattern) {
        for (let i = 0; i < hashPattern.length; i += 2) {
            let digit = Number(hashPattern.charAt(i));
            let letter = hashPattern.charAt(i + 1);
            let matches = authorization.match(new RegExp(`${letter}`, 'g'));
            if (matches !== undefined && matches.length === digit) {
                return true;
            }
        }

        return false;
    }
}

ajaxRequestValidator([
    'Method: GET',
    'Credentials: Bearer asd918721jsdbhjslkfqwkqiuwjoxXJIdahefJAB',
    'Content: users.asd.1782452.278asd',
    'Method: POST',
    'Credentials: Basic 028591u3jtndkgwndsdkfjwelfqkjwporjqebhas',
    'Content: Johnathan',
    '2q'
]);

// ajaxRequestValidator([
//     'Method: PUT',
//     'Credentials: Bearer as9133jsdbhjslkfqwkqiuwjoxXJIdahefJAB',
//     'Content: users.asd/1782452$278///**asd123',
//     'Method: POST',
//     'Credentials: Bearer 028591u3jtndkgwndskfjwelfqkjwporjqebhas',
//     'Content: Johnathan',
//     'Method: DELETE',
//     'Credentials: Bearer 05366u3jtndkgwndssfsfgeryerrrrrryjihvx',
//     'Content: This.is.a.sample.content',
//     '2e5g'
// ]);