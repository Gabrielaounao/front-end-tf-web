function openVinculoModal() {
    document.getElementById('vinculo-modal-background').style.display = "block";
    document.getElementById('vinculo-modal').style.display = "block";
}

function closeVinculoModal() {
    document.getElementById('vinculo-modal-background').style.display = "none";
    document.getElementById('vinculo-modal').style.display = "none";
}

function openContatoModal() {
    document.getElementById('contato-modal-background').style.display = "block";
    document.getElementById('contato-modal').style.display = "block";
}

function closeContatoModal() {
    document.getElementById('contato-modal-background').style.display = "none";
    document.getElementById('contato-modal').style.display = "none";
}

function setVinculo(option) {
    const input = document.getElementById("vinculo");

    switch (option) {
        case "interno":
            input.value = 0;
            break;

        case "superior":
            input.value = 1;
            break;

        case "medio":
            input.value = 2;
            break;

        case "funcionario":
            input.value = 3;
            break;

        default:
            input.value = "";
            break;
    }

    closeVinculoModal();
}

function setContato(value) {
    const input = document.getElementById("contato");
    input.value = value;
    closeContatoModal();
}

function submitForm() {
    if (document.getElementById("nome").value.length == 0) {
        alert("Preencha o campo de nome");
        return;
    }

    if (document.getElementById("email").value.length == 0) {
        alert("Preencha o campo de e-mail");
        return;
    }
    
    if (!verifyEmail(document.getElementById("email").value)) {
        alert("Insira um endereço de e-mail válido\nEXEMPLO: email@provedor.com");
        return;
    }
    
    if (document.getElementById("senha").value.length == 0) {
        alert("Preencha o campo de senha");
        return;
    }

    if (document.getElementById("senha").value !== document.getElementById("confirm-senha").value) {
        alert("A confirmação de senha difere da senha original");
        return;
    }

    if (document.getElementById("vinculo").value.length == 0) {
        alert("Selecione seu vínculo escolar");
        return;
    }

    if (document.getElementById("contato").value.length == 0) {
        alert("Selecione uma forma de contato");
        return;
    }

    document.getElementById("form").submit();
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