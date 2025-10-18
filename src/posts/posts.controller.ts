import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postService.createPost(userId, createPostData);
  }
}
