// main.js

// Funciones de cifrado y descifrado
function encrypt(plaintext, a, b) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const m = alphabet.length;
    let ciphertext = "";

    for (let char of plaintext) {
        if (char.toUpperCase() in alphabet) {
            const x = alphabet.indexOf(char.toUpperCase());
            const encryptedChar = (a * x + b) % m;
            ciphertext += alphabet.charAt(encryptedChar);
        } else {
            ciphertext += char;
        }
    }

    return ciphertext;
}

function decrypt(ciphertext, a, b) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const m = alphabet.length;
    const inv_a = modInverse(a, m);
    let plaintext = "";

    for (let char of ciphertext) {
        if (char.toUpperCase() in alphabet) {
            const y = alphabet.indexOf(char.toUpperCase());
            const decryptedChar = (inv_a * (y - b + m)) % m; // Sumar m para manejar números negativos
            plaintext += alphabet.charAt(decryptedChar);
        } else {
            plaintext += char;
        }
    }

    return plaintext;
}

// Función para calcular el inverso modular
function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    return 1;
}

// Función para aplicar el algoritmo de cifrado/descifrado
function aplicarAlgoritmo() {
    const mensaje = prompt("Ingrese el mensaje a cifrar/decifrar:");
    const a = parseInt(prompt("Ingrese el valor de a:"));
    const b = parseInt(prompt("Ingrese el valor de b:"));

    const ciphertext = encrypt(mensaje, a, b);
    console.log("Mensaje cifrado:", ciphertext);

    const plaintext = decrypt(ciphertext, a, b);
    console.log("Mensaje descifrado:", plaintext);
}

// Agregar un evento de click al botón
document.getElementById("botonAlgoritmo").addEventListener("click", aplicarAlgoritmo);
