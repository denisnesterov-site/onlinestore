<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user-name'];
$phone = $_POST['Tel'];
$email = $_POST['E-mail'];
$comm = $_POST['comm'];

$jsonText = $_POST['Товары'];
$myArray = json_decode($jsonText, true);

$prod = '';

foreach ($myArray as $key => $value) {
    $cat = $value["category"];
    $title = $value["title"];
    $price = $value["price"];
	$number = $value["number"];
    $prod .= "
        <tr>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$title</td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$price</td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$number</td>
        </tr>
        ";
}

$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject"  && $key != "Товары") {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";
	}
}

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'otpravki03@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'sJcRPFEzrzBHgGRqWA1B'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('otpravki03@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('ol27281480@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = ''.$name. ' оставил заявку, его телефон - ' .$phone. ' ,его E-mail - ' .$email. ' Товары:' .$prod. ' Комментарий: ' .$comm;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} 
?>