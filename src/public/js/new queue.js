function submitForm() {
    const link = document.getElementById("link").value;
    try {
        new URL(link);
        document.querySelector("form").submit();
    } catch {
        alert("Insira um link válido");
    }
}