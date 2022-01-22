import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users, UsersRepository } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          },
        },
        UsersRepository
      ]
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
    usersRepository = app.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      usersService.findAll = jest.fn();
      const data = usersController.findAll();
      expect(usersController.findAll()).toBe(data);
    });
  });

  describe('Find User by Id', () => {
    it('should return a user', async () => {
      usersService.findOne = jest.fn();
      const id = 1;
      const data = usersController.findOne(id);
      expect(usersController.findOne(id)).toBe(data);
    });
  });

  describe('Create User', () => {
    it('should create a user', async () => {
      const mockRequest: any = {
        body: {
          firstname: 'IOQSfheufp?DFif',
          lastname: 'QfihuaakfqsYY',
        },
      };
      
      usersService.createUser = jest.fn();
      usersService.createUser(mockRequest);
  
      // expect(mockNext).toHaveBeenCalledTimes(1);

    });
  });
  

});