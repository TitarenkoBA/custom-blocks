import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['send_mail_field'] = function (block) {
    function getValue(item) {
        return block.getFieldValue(item).trim() || null;
    };

    function validateEmail(email) {
        // eslint-disable-next-line
        const reg = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        return reg.test(email) ? email : null;
    }

    function validate(obj) {
        let err = "Error: wrong ";
        let count = 0;
        Object.keys(obj).forEach((key) => {
            if (obj[key]) {
                count++;
            } else {
                err += key;
            }
        });
        return count === Object.keys(obj).length ? "OK" : err;
    }

    const emailObject = {
        emailFrom: validateEmail(getValue('FROM')),
        emailTo: validateEmail(getValue('TO')),
        subject: getValue('THEME'),
        message: getValue('MESSAGE')
    };

    const code = validate(emailObject);

    if (code === "OK") {
        // eslint-disable-next-line
        const emailJson = JSON.stringify(emailObject);
    }

    return code;
};

Blockly.JavaScript['run_script_field'] = function (block) {
    const code = block.getFieldValue('SCRIPT').trim() || null;
    try {
        if (code) {
            const f = new Function(code);
            f();
        } else {
            throw new Error();
        }
    } catch (err) {
        return "Error: wrong script!";
    }
    return "OK"
};