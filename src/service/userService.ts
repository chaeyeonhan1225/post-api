import { UserType } from '../common/types';
import { UserRepository, UserInput } from '../repository/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IdArgsType {
  id: number;
}

export class UserService {
  private userRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async findAll(): Promise<UserType[]> {
    return this.userRepository.findAll();
  }
  async findById(id: number): Promise<UserType> {
    const user = await this.userRepository.findById(id);
    // 만약 user가 없을시 404에러를 보내줘야함(작업중)
    return user;
  }
  async join(param: UserInput): Promise<UserType> {
    const { email } = param;
    console.log(param);
    const exUser = await this.userRepository.findByEmail(email);
    if (exUser) {
      throw new Error('이미 존재하는 회원입니다!');
    }
    // 유저를 만들어준다.
    const password = await bcrypt.hash(param.password, 'hash');
    const user = {
      email: param.email,
      password: password,
      nickname: param.nickname,
    };
    const result = await this.userRepository.create(user);
    console.log(result);
    const newUser = await this.userRepository.findById(result.insertId);
    return newUser;
  }
  // 회원가입 처리해야됨
  // async join(user) {
  //   // 이메일 유효 한지 검사
  // }
}
