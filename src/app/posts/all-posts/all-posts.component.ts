import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  posts: Post[] = [];


  constructor( private postService: PostsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }


  loadPosts() {
    this.postService.loadPosts().subscribe((data: any) => {
      this.posts = data;
    });
  }


  // Delete the post image from Firebase Storage and the post from Firestore.
  onDelete(postImgPath: string, id: string) {
    this.postService.deleteImage(postImgPath, id);
  }

}
