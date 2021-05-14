package com.dravicenne.backend.services;

import com.dravicenne.backend.models.Mail;
import com.dravicenne.backend.models.dto.MailDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
public class MailService {

    private final JavaMailSender javaMailSender;

    public void sendMail(Mail mail){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom(mail.getFrom());
        simpleMailMessage.setText(mail.getBody());
        simpleMailMessage.setTo(mail.getDest());
        simpleMailMessage.setSubject(mail.getTopic());

        this.javaMailSender.send(simpleMailMessage);

    }

    public void medecinReset(MailDto mailDto){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setText(mailDto.getBody());
        simpleMailMessage.setTo(mailDto.getDest());
        simpleMailMessage.setSubject(mailDto.getSubject());
        javaMailSender.send(simpleMailMessage);
    }

    public void patientReset(MailDto mailDto){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setText(mailDto.getBody());
        simpleMailMessage.setTo(mailDto.getDest());
        simpleMailMessage.setSubject(mailDto.getSubject());
        javaMailSender.send(simpleMailMessage);
    }
}
