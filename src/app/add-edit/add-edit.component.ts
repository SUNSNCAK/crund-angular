import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  
  empForm: FormGroup;
  constructor(private _fb: FormBuilder , private _empService: EmployeeService, private _dialogref: MatDialogRef<AddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      date: '',
      gender: '',
      education:'',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  education: string[] = [
    'มัธยมศึกษา',
    'ปริญญาตรี',
    'ปริญญาโท',
    'ปริญญาเอก',
  ];

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id , this.empForm.value).subscribe({
          next: (val: any) => {
            alert('แก้ไขข้อมูลสำเร็จ');
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('เพิ่มสมาชิกสำเร็จ');
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }
}
