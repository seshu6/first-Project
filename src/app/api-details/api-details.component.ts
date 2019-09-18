import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../common.service';
import { LoaderService } from '../loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css']
})
export class ApiDetailsComponent implements OnInit {
  showOrHidePython: boolean = true;
  showOrHideJava: boolean = false;
  showOrHideNet: boolean = false;
  showOrHideRuby: boolean = false;
  showOrHidePhp: boolean = false;
  showOrHideNode: boolean = false;
  contactUsForm: FormGroup;
  @ViewChild('contactUsModal') contactUsModal: ElementRef;
  constructor(private formBuilder:FormBuilder,private commonService: CommonService,private spinner: LoaderService) { }

  ngOnInit() {
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      url: ['', Validators.required],
      description: ['', Validators.required],
      termsAndConditions: ['', Validators.required]
    })

  }

  closeContactUsModal() {
    this.contactUsModal.nativeElement.click();
  }

  onSubmitContactUsDetails() {
    if (this.contactUsForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.showOrHide(true);
      this.commonService.postContactUsApi(this.contactUsForm.value).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.contactUsForm.reset();
          this.contactUsModal.nativeElement.click();
        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }

      }, error => {
        this.spinner.showOrHide(false);
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
        }
      })
    }
  }

  onTabChanged(data: string) {
    if (data == "python") {
      this.showOrHidePython = true;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "java") {
      this.showOrHidePython = false;
      this.showOrHideJava = true;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "net") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = true;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "ruby") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = true;
      this.showOrHidePhp = false;
      this.showOrHideNode = false;
    } else if (data == "php") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = true;
      this.showOrHideNode = false;
    } else if (data == "node") {
      this.showOrHidePython = false;
      this.showOrHideJava = false;
      this.showOrHideNet = false;
      this.showOrHideRuby = false;
      this.showOrHidePhp = false;
      this.showOrHideNode = true;
    }
  }

}
