import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery'
import {PatientService} from 'src/app/Services/patient.service';
import {UserService} from 'src/app/Services/user.service';

@Component({
  selector: 'app-pat-dashboard',
  templateUrl: './pat-dashboard.component.html',
  styleUrls: ['./pat-dashboard.component.css']
})
export class PatDashboardComponent implements OnInit {

  dropdown = document.getElementsByClassName("dropdown-btn");

  constructor(public _service: UserService, public patientService: PatientService) {
  }

  ngOnInit(): void {

    // Toggle Click Function
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });

    // side menu
    for (let i = 0; i < this.dropdown.length; i++) {
      (this.dropdown)[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

  setDossierValue(): void {
    if (this.patientService.showDossier === true) {
      this.patientService.showDossier = false;
      this.patientService.showMed = true;
    } else {
      this.patientService.showDossier = true;
      this.patientService.showMed = false;
    }
  }

  setShowMedValue(): void {
    if (this.patientService.showMed === true) {
      this.patientService.showMed = false;
    } else {
      this.patientService.showMed = true;
    }
  }


}
