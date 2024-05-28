import { Context } from '../../src/app';
import { UserRow } from '../../src/daos/user';
import UserModel from '../../src/models/user';

/**
 * The \r is causing issues with the tests, so we normalise the result to use \n
 * as long as both sides of the comparison are passed in, it shouldn't affect
 * the integrity of the test.
 */
const normalise = (result: string) => result.replace(/\r/g, '\n');

const mockUserRow = {
  id: 'ID',
  username: 'USERNAME',
  password_hash: 'PASSWORD',
  email: 'EMAIL',
  figure: 'FIGURE',
  birthday: 'BIRTHDAY',
  phone_number: 'PHONE',
  custom_data: 'CUSTOMDATA',
  has_read_agreement: true,
  gender: 'GENDER',
  country: 'COUNTRY',
  has_special_rights: true,
  badge_type: 'BADGE',
  gold: 0,
} as UserRow;

describe('Model: User', () => {
  describe('serialise', () => {
    it('should return an INFORETRIEVE string', () => {
      const mockCTX = {} as Context;
      const user = new UserModel(mockCTX, mockUserRow);

      const result = user.serialise('INFORETRIEVE');

      expect(normalise(result)).toEqual(normalise(`name=USERNAME\remail=EMAIL\rfigure=FIGURE\rbirthday=BIRTHDAY\rphonenumber=PHONE\rcustomData=CUSTOMDATA\rhad_read_agreement=1\rsex=GENDER\rcountry=COUNTRY\rhas_special_rights=1\rbadge_type=BADGE\r`));
    });

    it('should return a STATUS string', () => {
      const mockCTX = {} as Context;
      const user = new UserModel(mockCTX, mockUserRow);

      const result = user.serialise('STATUS');

      expect(normalise(result)).toEqual(normalise(`USERNAME 0,0,0,0,0/`));
    });
  });
});
