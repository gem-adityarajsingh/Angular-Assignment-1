import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { userDetails } from '../userDetails';
import { DataService } from 'src/app/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  base64: string = '';
  fileSelected?: Blob;
  imageUrl?: string;

  constructor(private dataService: DataService, private sant: DomSanitizer) {
    this.users = {
      name: '',
      gender: '',
      email: '',
      mobileNumber: 1,
      category: '',
      technology: [],
      profilePicture: '',
    };
  }
  createUserForm!: FormGroup;
  users: userDetails;

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      gender: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^(.+)@(.+)$'),
      ]),
      mobileNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('(0/91)?[6-9][0-9]{9}'),
        Validators.minLength(10),
      ]),
      category: new FormControl(null, [Validators.required]),
      C: new FormControl(false),
      Cpp: new FormControl(false),
      Java: new FormControl(false),
      Python: new FormControl(false),
      JavaScript: new FormControl(false),
      profilePicture: new FormControl(null, [
        Validators.pattern('[^\\s]+(.*?)\\.(jpg|jpeg|png|JPG|JPEG|PNG)$'),
      ]),
    });
  }
  displayStyle = 'none';

  onSelectNewFile(files: FileList): void {
    this.fileSelected = files[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.fileSelected)
    ) as string;
    this.base64 = '';
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.base64 = reader.result as string;
    };
  }

  submit(): void {
    this.users.technology = [];
    if (this.createUserForm.value.C) {
      this.users.technology.push('C');
    }
    if (this.createUserForm.value.Cpp) {
      this.users.technology.push('C++');
    }
    if (this.createUserForm.value.Java) {
      this.users.technology.push('Java');
    }
    if (this.createUserForm.value.Python) {
      this.users.technology.push('Python');
    }
    if (this.createUserForm.value.JavaScript) {
      this.users.technology.push('JavaScript');
    }

    console.log(this.createUserForm.value);
    this.users.name = this.createUserForm.value.name;
    this.users.gender = this.createUserForm.value.gender;
    this.users.email = this.createUserForm.value.email;
    this.users.mobileNumber = this.createUserForm.value.mobileNumber;
    this.users.category = this.createUserForm.value.category;
    this.users.profilePicture = this.base64;
    console.log(this.users);
  }

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
    this.users;
  }
  saveData() {
    this.dataService.addData(this.users);
    console.log(this.users);
    alert('Details Saved');
    this.displayStyle = 'none';
  }
}
