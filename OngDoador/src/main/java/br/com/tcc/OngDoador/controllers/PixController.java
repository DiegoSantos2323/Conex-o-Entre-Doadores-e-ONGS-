package br.com.tcc.OngDoador.controllers;

import java.io.ByteArrayOutputStream;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Base64;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

@RestController
@RequestMapping("/pix")
public class PixController {

	@GetMapping("/gerar")
	public Map<String, String> gerarPix(
	        @RequestParam String valor) throws Exception {

	  
	    DecimalFormatSymbols symbols =
	            new DecimalFormatSymbols(Locale.US);

	    DecimalFormat df =
	            new DecimalFormat("0.00", symbols);

	    String valorFormatado =
	            df.format(Double.parseDouble(valor));

	    String payload = br.com.tcc.OngDoador.utils.QrCodeUtils.gerarPayloadPix(
	            "diegos.a000@outlook.com",
	            "Diego dos Santos Alves",
	            "BELO HORIZONTE",
	            valorFormatado,
	            "1"
	    );

	    ByteArrayOutputStream baos =
	            new ByteArrayOutputStream();

	    BitMatrix matrix =
	            new QRCodeWriter().encode(
	                    payload,
	                    BarcodeFormat.QR_CODE,
	                    220,
	                    220
	            );

	    MatrixToImageWriter.writeToStream(
	            matrix,
	            "PNG",
	            baos
	    );

	    String base64 =
	            Base64.getEncoder()
	                    .encodeToString(baos.toByteArray());

	    Map<String, String> retorno =
	            new HashMap<String, String>();

	    retorno.put("payload", payload);
	    retorno.put("qrCodeBase64", base64);

	    return retorno;
	}
}
