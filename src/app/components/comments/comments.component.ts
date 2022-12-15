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
  regex: RegExp = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+/;

  constructor(
    private post: PostService,
    private userService: UserService,
    private toast: NgToastService,
  ) {}

  ngOnInit(): void {
    this.post.getComments(Number(this.postId)).subscribe((comments) => {
      this.comments = comments;
      for(let comment of comments){
        this.comments.filter((c) => c.id_comment === comment.id_comment)[0].date_published.replace(this.regex, "$3-$2-$1 $4:$5");
      }
    });
  }

  addComment({text, parentId}: {text: string, parentId: null | string}): void {
    this.post.createComment(text, parentId, this.postId).subscribe({
      next: (createdComment) => {

        let match = this.regex.exec(createdComment.date_published);
        if (match) {
          // Construire la date formatée à partir des groupes capturés
          createdComment.date_published = `${match[3]}/${match[2]}/${match[1].slice(2)} ${match[4]}:${match[5]}:${match[6]}`;
        } else {
          createdComment.date_published = "Inconnue";
        }
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

  getRootComments(): Comment[] {
    return this.comments.filter((comment) => comment.id_comment_parent === null);
  }

  deleteComment(comment: Comment){
    this.post.deleteComment(comment).subscribe(() => {
      this.comments.filter((c) => c.id_comment === comment.id_comment)[0].text = "Commentaire supprimé";
      this.comments.filter((c) => c.id_comment === comment.id_comment)[0].state = "deleted";
    });
  }

}
