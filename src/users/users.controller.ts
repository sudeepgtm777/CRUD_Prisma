import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UpdateUserSettingsDto } from './dtos/UpdateUserSettings.dto';

@ApiTags('Users') // Groups all endpoints under "Users" in Swagger UI
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // --------------------------
  // Create User
  // --------------------------
  @ApiOperation({
    summary: 'Create a new User',
    description: 'Registers a new user in the database.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Provide the user details to create a new user.',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    example: {
      id: 1,
      userName: 'Sudeep',
      displayName: 'Sudeep Gautam',
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // --------------------------
  // Get all users
  // --------------------------
  @ApiOperation({
    summary: 'Get all Users',
    description: 'Fetches all registered users from the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users.',
    example: [
      {
        id: 1,
        userName: 'Sudeep',
        displayName: 'Sudeep Gautam',
      },
      {
        id: 2,
        userName: 'sudeep_gautam',
        displayName: 'Sudeep Gautam',
      },
    ],
  })
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // --------------------------
  // Get single user by ID
  // --------------------------
  @ApiOperation({
    summary: 'Get a single User',
    description: 'Fetch a specific user using their ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique ID of the user to retrive',
    example: '',
  })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully.',
    example: {
      id: 1,
      userName: 'Sudeep',
      displayName: 'Sudeep Gautam',
      userSettings: {
        notificationsOn: true,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User Not Found', 404);
    return user;
  }

  // --------------------------
  // Update User
  // --------------------------
  @ApiOperation({
    summary: 'Update a User',
    description: 'Update existing user details using their ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique ID of the user to update',
    example: '',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User update payload',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    example: {
      id: 1,
      userName: 'Gautam_Sudeep',
      displayName: 'Gautam Sudeep',
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid update data' })
  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  // --------------------------
  // Delete User
  // --------------------------
  @ApiOperation({
    summary: 'Delete a User',
    description: 'Delete a user from the database by their ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique ID of the user to delete',
    example: '',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
    example: { message: 'User deleted successfully.' },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  // --------------------------
  // Update User Settings
  // --------------------------
  @ApiOperation({
    summary: 'Update User Settings',
    description: 'Update notification preferences or user-specific settings.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description:
      'The unique ID of the user to update UserSettings(notificationsOn)',
    example: '',
  })
  @ApiBody({
    type: UpdateUserSettingsDto,
    description: 'Settings update payload (e.g. notificationsOn: true)',
  })
  @ApiResponse({
    status: 200,
    description: 'User settings(notificationsOn) updated successfully.',
    example: {
      userId: 1,
      notificationsOn: false,
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @Patch(':id/settings')
  async updateUserSettingsByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSettingsDto: UpdateUserSettingsDto,
  ) {
    return this.userService.updateUserSettings(id, updateUserSettingsDto);
  }
}
