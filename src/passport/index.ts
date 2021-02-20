import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user';

const userRepository = new UserRepository();

// 로그인 구현
// done(에러, 성공 결과, 메시지)
const userValidate = async (email: string, password: string, done: any) => {
  try {
    const exUser = await userRepository.findByEmail(email);
    if (!exUser) {
      return done(null, false, { message: '이메일 / 비밀번호가 일치하지 않습니다.' });
    }
    const compareResult = await bcrypt.compare(exUser.password, password);
    if (!compareResult) {
      return done(null, false, { message: '이메일 / 비밀번호가 일치하지 않습니다.' });
    }
    return done(null, exUser);
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

export const passportConfig = (): void => {
  passport.use('local', new Strategy({ usernameField: 'email', passwordField: 'password' }, userValidate));
};
