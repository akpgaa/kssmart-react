import React, { Component } from "react";
import { Userdata } from "../Config/Storagedata";
var aesjs = require('aes-js');


export default class Essentials extends Component {

    Logout() {
        localStorage.clear()
        window.location.href = '/'
    }
    ChangeRadio = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));
    CheckLogin = async () => {
        let Encrypted = await localStorage.getItem(Userdata)
        if (Encrypted) {
            let user = JSON.parse(this.Decrypt(Encrypted))
            return user ? user : false
        }
        else {
            return false
        }
    }
    Encrypt(text) {
        // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
        var key = [13, 2, 11, 14, 16, 9, 8, 12, 3, 15, 10, 1, 4, 5, 6, 7];

        // Convert text to bytes
        // var text = 'Text may be any length you wish, no padding is required.';
        var textBytes = aesjs.utils.utf8.toBytes(text);

        // The counter is optional, and if omitted will begin at 1
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);

        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        // console.log(encryptedHex);
        // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
        //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        // console.log(decryptedText);
        // "Text may be any length you wish, no padding is required."

        return encryptedHex

    }
    Decrypt(encryptedHex) {
        try {
            // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
            var key = [13, 2, 11, 14, 16, 9, 8, 12, 3, 15, 10, 1, 4, 5, 6, 7];



            // When ready to decrypt the hex string, convert it back to bytes
            var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

            // The counter mode of operation maintains internal state, so to
            // decrypt a new instance must be instantiated.
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var decryptedBytes = aesCtr.decrypt(encryptedBytes);

            // Convert our bytes back into text
            var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            // console.log(decryptedText);
            // "Text may be any length you wish, no padding is required."
            return decryptedText

        } catch (error) {
            return null
        }

    }
    handleNavigation = (routepage) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        this.props.history.push(routepage)
    }
    RouteNavigation = (routepage) => {
        window.open(routepage)
    }
    HrefNavigation = (routepage) => {
        window.location.href = routepage
    }
    validateText = (state, errorState, errorMessage) => {
        if (state && state.toString().trim()) {
            this.setState({
                [errorState]: null, enterallfield: null
            });
            return false;
        } else {
            this.setState({
                [errorState]: [errorMessage],
                enterallfield: 'Enter All Fields'
            });
            return true;
        }
    };
    ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return (false)
            //correct
        }
        // alert("You have entered an invalid email address!")
        return (true)
    }




    onChangeSelect = e => {
        let val = {
            label: e.target.options[e.target.selectedIndex].innerHTML,
            value: e.target.value
        };
        this.setState({ [e.target.name]: val });
    };

    onChangetext = e => {
        // console.log([e.target.name], e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }
    onSelecttext = (e, name) => {

        this.setState({ [name]: e })
    }

    selectMultipleImage = e => {
        // console.log(e.target.files);
        this.setState({ [e.target.name]: e.target.files });
    };


    selectSingleImage = e => {
        // console.log(e.target.files);
        const fsize = e.target.files[0].size;
        const file = Math.round((fsize / 1024));
        // The size of the file.
        console.log(e.target.files, file);
        if (file > 2048) {
            this.setState({
                fileErr:
                    "File too large, please select a file less than 2mb"
            })
        } else {

            this.setState({ [e.target.name]: e.target.files[0] });
        }
    };


    ValidationView = (errorname, color = "#F44336") => {
        return (
            <React.Fragment>
                <span style={{ color: color }}>{errorname}</span>
            </React.Fragment>
        );
    };


}
