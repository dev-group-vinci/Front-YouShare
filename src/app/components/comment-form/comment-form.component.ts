import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit{
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initalText: string = '';
  commentForm!: FormGroup;

  @Output() handleSubmit = new EventEmitter<string>();
  @Output() handleCancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      text: [this.initalText, Validators.required]
    })
  }

  onSubmit(){
    this.handleSubmit.emit(this.commentForm.value.text);
    this.commentForm.reset();
  }

}
