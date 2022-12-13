import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import { Comment } from "../../models/comment.model";

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
  ) {
  }

  ngOnInit(): void {
    this.post.getComments(Number(this.postId)).subscribe((comments) => {
      this.comments = comments;
    })
  }

  addComment({text, parentId}: {text: string, parentId: null | string}): void {
    this.post.createComment(text, parentId, this.postId).subscribe((createdComment) => {
      this.comments = [...this.comments, createdComment];
      this.activeComment = null;
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
