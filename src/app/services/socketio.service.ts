import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import { Config } from '../config/config';
// import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
//   socket: any;

//   constructor(auth: AuthService) {
//     this.socket = io(Config.endPointSocket, {
//       query: {
//         token: auth.getToken()
//       }
//     });
//   }
//   on(event: string): Observable<JSON> {
//     return new Observable((subcriber) => {
//       this.socket.on(event, (data) => {
//         subcriber.next(data);
//       });
//     });
//   }
//   emit(event: string, data: string): void {
//     this.socket.emit(event, data);
//   }
}
