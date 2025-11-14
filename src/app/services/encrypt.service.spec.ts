import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(() => {
    service = new EncryptService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
