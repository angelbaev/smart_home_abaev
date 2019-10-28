

# PHP Smart Home RESTful Web Service API

This API implement.

# Endpoints:
| Request method | URl | Params |
| ------ | ------ | ------ |
| Auth | ------ | ------ | 
| POST | http://localhost/index.php/sso/authenticate | {"username": "abaev", "password": "123"} | 
| POST | http://localhost/index.php/sso/verify | {"token": "23352febddc159db6365f262cf555053"} | 
| POST | http://localhost/index.php/sso/expire | {"token": "23352febddc159db6365f262cf555053"} | 
| Account | ------ | ------ | 
| GET | http://localhost/index.php/account | ------ |
| POST | http://localhost/index.php/account | {"username": "abaev", "password": "123", "isActive": true} |
| GET | http://localhost/index.php/account/5d7fd19e9659b011f0932cac | ------ |
| PUT | http://localhost/index.php/account/5d7fd19e9659b011f0932cac | {"username": "abaev", "password": "123", "isActive": true} |
| DELETE | http://localhost/index.php/account/5d7fd19e9659b011f0932cac | ------ |
| Device | ------ | ------ |
| GET | http://localhost/index.php/device | ------ |
| POST | http://localhost/index.php/device | {"account": "5d7fd1d09659b011f0932cae", "name": "abaev-home", "ip": "11.11.11.11", "port":"1111", "commands": [ {"name": "Relay 10A", "commands": [ {"activate": "relay10a_on", "deactivate": "relay10a_off"}]}, {"name": "Relay 30A", "commands": [ {"activate": "relay30a_on", "deactivate": "relay30a_off"}]}], "isActive": true} |
| GET | http://localhost/index.php/device/5d7fd19e9659b011f0932cac | ------ |
| PUT | http://localhost/index.php/device/5d7fd19e9659b011f0932cac | {"account": "5d7fd1d09659b011f0932cae", "name": "abaev-home", "ip": "11.11.11.11", "port":"1111", "commands": [ {"name": "Relay 10A", "commands": [ {"activate": "relay10a_on", "deactivate": "relay10a_off"}]}, {"name": "Relay 30A", "commands": [ {"activate": "relay30a_on", "deactivate": "relay30a_off"}]}], "isActive": true} |
| DELETE | http://localhost/index.php/device/5d7fd19e9659b011f0932cac | ------ |
| GET | http://localhost/index.php/device/5d82952ab44c231ad4800d57/control | ------ |
| Mobile Device | ------ | ------ | 
| GET | http://localhost/index.php/mobile | ------ | 
| POST | http://localhost/index.php/mobile | {"account": "5d7fd1d09659b011f0932cae", "model": "12312", "type": "123", "uuid":"123"} | 
| GET | http://localhost/index.php/mobile/5d7fd19e9659b011f0932cac | ------ | 
| PUT | http://localhost/index.php/mobile/5d7fd19e9659b011f0932cac | {"account": "5d7fd1d09659b011f0932cae", "model": "12312", "type": "123", "uuid":"123"} | 
| DELETE | http://localhost/index.php/mobile/5d7fd19e9659b011f0932cac | ------ | 
| GET | http://smart-home-abaev.000webhostapp.com/index.php/mobile/uuid/75c66c52220307a3 | ------ | 
| Control | ------ | ------ | 
| GET | http://localhost/index.php/control | ------ | 
| POST | http://localhost/index.php/control | {"device": "5d82952ab44c231ad4800d57", "name":"Relay 10A", "commandOn": "relay10a_on", "commandOff":"relay10a_off", "state":"off", "isActive": true} | 
| GET | http://localhost/index.php/control/5d83c071cada9018d0c59650 | ------ | 
| PUT | http://localhost/index.php/control/5d83c071cada9018d0c59650 | {"device": "5d82952ab44c231ad4800d57", "name":"Relay 10A", "commandOn": "relay10a_on", "commandOff":"relay10a_off", "state":"off", "isActive": true} | 
| DELETE | http://localhost/index.php/control/5d83c071cada9018d0c59650 | ------ | 
| Hisotry | ------ | ------ | 
| GET | http://localhost/index.php/history | ------ | 
| POST | http://localhost/index.php/history | {"account": "5d7fd1d09659b011f0932cae", "model": "12312", "type": "123", "uuid":"123"} | 
| GET | http://localhost/index.php/history/5d7fd19e9659b011f0932cac | ------ | 
| PUT | http://localhost/index.php/history/5d7fd19e9659b011f0932cac | {"account": "5d7fd1d09659b011f0932cae", "model": "12312", "type": "123", "uuid":"123"} | 
| DELETE | http://localhost/index.php/history/5d7fd19e9659b011f0932cac | ------ | 
