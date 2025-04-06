import { Command } from '../../commandFactory';

export default function USEROBJECT(props: Command) {
  const { client } = props;

  const data = {
    "name": "test",
    "email": "test@test.com",
    "figure": "sd=001/0&hr=001/255,255,255&hd=002/255,204,153&ey=001/0&fc=001/255,204,153&bd=001/255,204,153&lh=001/255,204,153&rh=001/255,204,153&ch=001/232,177,55&ls=001/232,177,55&rs=001/232,177,55&lg=001/119,159,187&sh=001/175,220,223",
    "birthday": "02.10.1992",
    "phonenumber": "+447730033662",
    "customData": "",
    "had_read_agreement": true ? '1' : '0',
    "sex": "M",
    "country": "UK",
    "has_special_rights": true ? '1' : '0',
    "badge_type": "",
  };

  let dataString = '';
  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data];
    dataString += `${key}=${value}\r`;
  });

  client.sendMessage(`# USEROBJECT\r${dataString} ##`);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending USEROBJECT message`);
}
