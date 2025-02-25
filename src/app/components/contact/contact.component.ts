import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  ngOnInit() {
    emailjs.init('rCrnSRCh7_qYwHF7x');  // Reemplaza con tu Public Key
  }
  contactData = {
    name: '',
    email: '',
    message: ''
  };
  isLoading = false; // Estado para mostrar el loader

  sendEmail() {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de enviar el mensaje.',
      });
      return;
    }

    this.isLoading = true; // Activar loader

    const emailParams = {
      from_name: this.contactData.name,
      from_email: this.contactData.email,
      message: this.contactData.message + " " + this.contactData.email
    };

    emailjs.send('service_hku8lk9', 'template_j38y235', emailParams)
      .then(response => {
        this.isLoading = false; // Desactivar loader
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos. Te responderemos pronto.',
        });
        this.contactData = { name: '', email: '', message: '' }; // Reiniciar formulario
      })
      .catch(error => {
        this.isLoading = false; // Desactivar loader
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al enviar el mensaje. Inténtalo más tarde.',
        });
        console.error('Error al enviar el correo:', error);
      });
  }
}
