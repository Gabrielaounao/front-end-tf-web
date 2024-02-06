function submitForm() {
    if (!verifyEmail(document.getElementById("email").value)) {
        alert("Insira um endereço de e-mail válido\nEXEMPLO: email@provedor.com");
        return;
    }

    document.getElementById("email").value = document.getElementById("email").value.toLowerCase();

    document.querySelector("form").submit();
}

function verifyEmail(email) {
    if (email.split("@").length == 1) return false;
    if (email.split("@")[0].length == 0) return false;
    if (email.split("@")[1].length == 0) return false;
    if (email.split("@")[1].split(".").length == 1) return false;
    if (email.split("@")[1].split(".")[0].length == 0) return false;
    if (email.split("@")[1].split(".")[1].length == 0) return false;
    if (email.split("@")[1].split(".")[1] != "com") return false;
    
    return true;
}