import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post/post.service";
import { Comment } from "../../models/comment.model";
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId!: string;
  comments: Comment[] = [];
  activeComment: Comment|null = null;

  constructor(
    private post: PostService,
    private userService: UserService,
    private toast: NgToastService,
  ) {}

  ngOnInit(): void {
    this.post.getComments(Number(this.postId)).subscribe((comments) => {
      this.comments = comments;
    });
  }

  addComment({text, parentId}: {text: string, parentId: null | string}): void {
    this.post.createComment(text, parentId, this.postId).subscribe({
      next: (createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      },
      error: (err) => {
        if (err.status === 403) this.toast.error({
          detail: "ERROR",
          summary: "Les messages haineux ne sont pas acceptés !",
          duration: 5000
        });
        else this.toast.error({
          detail: "ERROR",
          summary: "Il y a eu un problème !",
          duration: 5000
        });
      }
    });
  }

  getReplies(comment: Comment): Comment[]{
    return this.comments.
    filter(c => c.id_comment_parent === comment.id_comment).
    sort((a,b) => new Date(a.date_published).getMilliseconds() - new Date(b.date_published).getMilliseconds());
  }

  setActiveComment(activeComment: Comment | null): void {
    this.activeComment = activeComment;
  }

  deleteComment(comment: Comment){
    this.post.deleteComment(comment).subscribe(() => {
      this.comments.filter((c) => c.id_comment === comment.id_comment)[0].text = "Commentaire supprimé";
      this.comments.filter((c) => c.id_comment === comment.id_comment)[0].state = "deleted";
    });
  }

}
