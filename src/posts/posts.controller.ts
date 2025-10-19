import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { PostsService } from './posts.service';
import { CreateGroupPostDto } from './dtos/CreateGroupPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    return this.postService.createPost(userId, createPostData);
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(
    @Body() { userIds, ...createGroupPostData }: CreateGroupPostDto,
  ) {
    return this.postService.createGroupPost(userIds, createGroupPostData);
  }

  @Get('group')
  getGroupPost() {
    return this.postService.getGroupPost();
  }
}
