$(document).ready(function () {
	Webcam.attach('#example');

	$('#button').click(function () {
		take_snapshot();
	});

	qrcode.callback = showInfo;
});

function take_snapshot() {
	Webcam.snap(function (dataUrl) {
		qrCodeDecoder(dataUrl);
	});
}

// decode the img
function qrCodeDecoder(dataUrl) {
	qrcode.decode(dataUrl);
}

// show info from qr code
function showInfo(data) {
	// Verifica se ocorreu um erro na decodificação do QR code
	if (qrcode.result === "error decoding QR Code") {
		$("#qrContent p").text("Erro na leitura.");
		setTimeout(function() {
			$("#qrContent p").text("");
		}, 4000);
		return;
	} else {
		$.ajax({
			type: "POST",
			url: "https://encontro-dos-tributos-default-rtdb.firebaseio.com/user.json",
			data: JSON.stringify({ qrData: data }),
			success: function (response) {
				$("#qrContent p").text("Presença confirmada.");
				setTimeout(function() {
					$("#qrContent p").text("");
				}, 4000);
			},
			error: function () {
				// Se houver um erro na requisição
				$("#qrContent p").text("Erro ao enviar dados.");
				setTimeout(function() {
					$("#qrContent p").text("");
				}, 4000);
			}
		});
		
	}
}
