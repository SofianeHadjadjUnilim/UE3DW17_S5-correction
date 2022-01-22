import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
      controllers: [UsersController],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('UserService.findAll ', () => {
    it('should return an array of users', async () => {
      usersService.findAll  = jest.fn();
      expect(usersService.findAll);
    });
  });

  describe('UserService.findOne', () => {
    it('should return a user', async () => {
      usersService.findOne = jest.fn();
      const id = 1;
      expect(usersController.findOne(id));
    });
  });

});