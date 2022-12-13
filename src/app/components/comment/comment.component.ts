import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../models/comment.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  canDelete: boolean = false;
  @Input() comment!: Comment;
  @Input() replies: Comment[];
  @Input() activeComment!: Comment | null;
  @Input() parentId: number | null = null;
  author: User;
  user: User;
  @Output() setActiveComment = new EventEmitter<Comment | null>();
  @Output() addComment = new EventEmitter<{
    text:string;
    parentId: string | null;
  }>();
  @Output() deleteComment = new EventEmitter<Comment>;
  replyId: string | null = null;


  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.comment.id_user).subscribe((user) => {
      this.author = user;
    })
    this.userService.getUserLoggedIn().subscribe({
      next: (res) => {
        this.user = new User(res);
        this.canDelete = this.user.id_user == this.author.id_user && this.replies.length === 0;
      }
    })
    this.replyId = (this.parentId ? this.parentId : this.comment.id_comment).toString();
  }

  isReplying(): boolean {
    if(this.activeComment && this.activeComment.id_comment == this.comment.id_comment){
      return true;
    } else return false;
  }
}
