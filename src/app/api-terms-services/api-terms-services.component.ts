import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-api-terms-services',
  templateUrl: './api-terms-services.component.html',
  styleUrls: ['./api-terms-services.component.css']
})
export class ApiTermsServicesComponent implements OnInit {

  contactUsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      url: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSubmitContactUsDetails(){

  }

  closeContactUsModal(){
    
  }

}
