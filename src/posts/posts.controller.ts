import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreatePostDto } from './dtos/CreatePost.dto';
import { CreateGroupPostDto } from './dtos/CreateGroupPost.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // --------------------------
  // Create a single post
  // --------------------------
  @ApiOperation({
    summary: 'Create a Post',
    description: 'Create a single post associated with a user.',
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Provide post details and user ID.',
  })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    example: {
      id: 12,
      title: 'Post about a topic',
      description: 'This post was created successfully!',
      userId: 5,
    },
  })
  @ApiBadRequestResponse({ description: 'Validation failed or bad request' })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
    try {
      return await this.postService.createPost(userId, createPostData);
    } catch (error) {
      throw new HttpException(
        'Failed to create post Use essential credentials.',
        400,
      );
    }
  }

  // --------------------------
  //  Create a group post
  // --------------------------
  @ApiOperation({
    summary: 'Create a Group Post',
    description: 'Create a post that is shared among multiple users.',
  })
  @ApiBody({
    type: CreateGroupPostDto,
    description: 'Provide title, description, and an array of user IDs.',
  })
  @ApiResponse({
    status: 201,
    description: 'Group post created successfully',
    example: {
      id: 21,
      title: 'Team Project Discussion',
      description: 'This post is shared among selected users.',
      users: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid data or validation failed' })
  @Post('group')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createGroupPost(
    @Body() { userIds, ...createGroupPostData }: CreateGroupPostDto,
  ) {
    try {
      return await this.postService.createGroupPost(
        userIds,
        createGroupPostData,
      );
    } catch (error) {
      throw new HttpException('Failed to create group post', 400);
    }
  }

  // --------------------------
  // Get all group posts
  // --------------------------
  @ApiOperation({
    summary: 'Get all Group Posts',
    description: 'Retrieve all group posts with their associated users.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all group posts',
    example: [
      {
        id: 1,
        title: 'Mustang',
        description: 'The heaven desert of Nepal.',
        users: [{ userId: 16 }, { userId: 17 }],
      },
    ],
  })
  @Get('group')
  async getGroupPost() {
    try {
      return await this.postService.getGroupPost();
    } catch (error) {
      throw new HttpException('Failed to fetch group posts', 400);
    }
  }
}
