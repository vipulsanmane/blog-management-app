import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
	providedIn: 'root'
})
export class BlogService {
	private apiUrl = 'http://localhost:5181/Blog';

	http = inject(HttpClient);

	constructor() { }

	getBlogs(): Observable<Blog[]> {
		return this.http.get<Blog[]>(this.apiUrl);
	}

	createBlog(blogPost: Blog): Observable<Blog> {
		return this.http.post<Blog>(this.apiUrl, blogPost);
	}

	updateBlog(id: number, blogPost: Blog): Observable<Blog> {
		return this.http.put<Blog>(this.apiUrl+ '/' + id, blogPost);
	}

	getBlogById(id: number): Observable<Blog> {
		return this.http.get<Blog>(`${this.apiUrl}/${id}`);
	}

	deleteBlog(id: number): Observable<any> {
		return this.http.delete(this.apiUrl + '/' + id);
	}
}