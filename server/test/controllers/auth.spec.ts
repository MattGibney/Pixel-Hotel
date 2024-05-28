import { Context } from '../../src/app';
import AuthController from '../../src/controllers/auth';

describe('Controller: Auth', () => {
  describe('REGISTER', () => {
    it('should pull out the data from the args', () => {

      const mockCTX = {
        logger: {
          debug: jest.fn()
        }
      } as unknown as Context;
      const mockArgs = [
        'name=test\rpassword=test\remail=test@test.test\rfigure=sd=001/0&hr=001/255,255,255&hd=002/255,204,153&ey=001/0&fc=001/255,204,153&bd=001/255,204,153&lh=001/255,204,153&rh=001/255,204,153&ch=001/232,177,55&ls=001/232,177,55&rs=001/232,177,55&lg=001/119,159,187&sh=001/175,220,223\rdirectMail=1\rbirthday=02.10.1992\rphonenumber=+44\rcustomData=\rhas_read_agreement=1\rsex=Male\rcountry='
      ];

      AuthController.REGISTER(mockCTX, mockArgs);

      expect(mockCTX.logger.debug).toHaveBeenCalledWith([
        ['name', 'test'],
        ['password', 'test'],
        ['email', 'test@test.test'],
        ['figure', 'sd=001/0&hr=001/255,255,255&hd=002/255,204,153&ey=001/0&fc=001/255,204,153&bd=001/255,204,153&lh=001/255,204,153&rh=001/255,204,153&ch=001/232,177,55&ls=001/232,177,55&rs=001/232,177,55&lg=001/119,159,187&sh=001/175,220,223'],
        ['directMail', '1'],
        ['birthday', '02.10.1992'],
        ['phonenumber', '+44'],
        ['customData', ''],
        ['has_read_agreement', '1'],
        ['sex', 'Male'],
        ['country', ''],
      ], 'REGISTER DATA');
    });
  });
});
