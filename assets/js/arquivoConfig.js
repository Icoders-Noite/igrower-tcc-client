let ssid
let senha
let minHumidity
let autoMode
let idArduino = -1

$("#btn-gerar-config").click(function () {


    ssid = $("#ssid").val()
    senha = $("#senhaWifi").val()
    minHumidity = $("#minHumidity").children("option:selected").val()
    autoMode = $("#autoMode").children("option:selected").val()
    idArduino = $("#idArduino").val()

    const config = {
        "id_user": localStorage.getItem("id"),
        "min_umidade": minHumidity,
        "automatico": autoMode,
        "id_arduino": idArduino
    }
    if (senha.length > 0 && ssid.length > 0 && minHumidity != "-1" && minHumidity != "0" && autoMode != "-1") {
        $.ajax({
            url: hostApi + "/inserir-config-arduino",
            data: config,
            error: function () {
                alert("Ocorreu um error ao se conectar com a API")
            },
            dataType: 'json',
            success: function (data) {
                console.log(data)
                ArquivoGerar(idArduino)
            },
            method: 'POST',
            type: 'POST'
        });
    } else {
        alert("Opções inválidas")
    }




})

function ArquivoGerar(id) {

    alert("Salve o arquivo de configurações dentro do cartão SD do Igrower e selecione para substituir arquivo")
    salvar(`${id}\n${ssid}\n${senha}\n`)

}



function salvar(config) {

    let blob = new Blob(Array.from(config), { type: "text/plain;charset=utf-8" });
    saveAs(blob, "CONFIG" + ".txt");
}




$("#minHumidity")
    .change(function () {
        let selecionado = $(this).children("option:selected").val()
        if (selecionado == "-1") {
            $("#minHumidityManual").fadeIn("slow")
        }
    })
    .trigger("change");


let adicionouItens = false
$("#minHumidityManual").change("mousestop", function () {


    if (adicionouItens) {
        $("#itemAdicionado").remove()
    }
    let value = $("#minHumidityManual").val()
    let valueText = `${value}%`
    $("#minHumidity").append(new Option(valueText, value))
    $("#minHumidity").children(":last-child").attr("id", "itemAdicionado").attr('selected', 'selected');
    adicionouItens = true
});

function salvarIdEmcache() {

}