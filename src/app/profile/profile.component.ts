import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileImageSrc: any;
  constructor() { }

  ngOnInit() {
  }

  onSelectProfileImage(files: any) {
    let reader = new FileReader();
    // this.profileImageSrc = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profileImageSrc = reader.result;
    }
  }

}
