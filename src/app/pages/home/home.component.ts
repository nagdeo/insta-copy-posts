import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AngularFireDatabase } from "@angular/fire/database";
import {UserComponent} from "../../components/user/user.component";
import {PostsComponent} from "../../components/posts/posts.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  users = [];
  posts = [];

  isLoading = false;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
  ) {
    this.isLoading = true;

    //get all users
    this.db.object("/users")
      .valueChanges()
      .subscribe((obj) => {
        if (obj) {
          this.users = Object.values(obj);
          this.isLoading = false;
        } else {
          this.toastr.error("NO user found");
          this.users = [];
          this.isLoading = false;
        }
      });

    //grab all posts from firebase

    this.db.object("/posts")
      .valueChanges()
      .subscribe((obj) => {
        if (obj) {
          this.posts = Object.values(obj).sort((a, b) => b.date - a.date);
          this.isLoading = false;
        } else {
          this.toastr.error("NO post to display");
          this.posts = [];
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {
  }
}
