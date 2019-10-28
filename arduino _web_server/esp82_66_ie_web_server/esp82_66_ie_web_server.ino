#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// define relay statuses 
#define RELAY_ON LOW
#define RELAY_OFF HIGH

// define device ID
#define DEVICE_ID "3c:71:bf:32:ca:4f"

// define server routes
#define ROUTE_HOME "/"
#define ROUTE_RELAY_10A_ON "/relay10a_on"
#define ROUTE_RELAY_10A_OFF "/relay10a_off"
#define ROUTE_RELAY_30A_ON "/relay30a_on"
#define ROUTE_RELAY_30A_OFF "/relay30a_off"

#define ACCESS_CONTROL_ALLOW_ORIGIN "*"

/*Put your SSID & Password*/
const char* ssid = "";  // Enter SSID here
const char* password = "";  //Enter Password here

// Static IP Address http://192.168.100.105/ | http://192.168.100.105:3355/
IPAddress ip(192, 168, 100, 105);
IPAddress subnet(255, 255, 255, 0);
IPAddress gateway(192, 168, 100, 1);

ESP8266WebServer server(3355); // 3355|80

uint8_t relayPinTenAmperes = D7; // 30A
bool relayPinTenAmperesStatus = false;

uint8_t relayPinThirtyAmperes = D6; // 30A
bool relayPinThirtyAmperesStatus = false;

void setup() {
  Serial.begin(115200);
  delay(100);
  pinMode(relayPinTenAmperes, OUTPUT);
  pinMode(relayPinThirtyAmperes, OUTPUT);

  // Change relay mode to OFF after restart
  digitalWrite(relayPinTenAmperes, RELAY_OFF);
  digitalWrite(relayPinThirtyAmperes, RELAY_OFF);
  

  Serial.println("Connecting to ");
  Serial.println(ssid);

  //connect to your local wi-fi network
  WiFi.begin(ssid, password);

  // Before connecting configure the static IP
  if(! WiFi.config(ip, gateway, subnet)) {
    Serial.println("Cannot set static IP"); 
  }

  //check wi-fi is connected to wi-fi network
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");  Serial.println(WiFi.localIP());

  server.on(ROUTE_HOME, handle_OnConnect);
  server.on(ROUTE_RELAY_10A_ON, handle_relayPinTenAmperesOn);
  server.on(ROUTE_RELAY_10A_OFF, handle_relayPinTenAmperesOff);
  server.on(ROUTE_RELAY_30A_ON, handle_relayPinThirtyAmperesOn);
  server.on(ROUTE_RELAY_30A_OFF, handle_relayPinThirtyAmperesOff);
  server.onNotFound(handle_NotFound);
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}

bool getRelayStatus(uint8_t relayPinName) {
  return (digitalRead(relayPinName) == RELAY_ON);
}

void handle_OnConnect() {
  relayPinTenAmperesStatus = getRelayStatus(relayPinTenAmperes);
  relayPinThirtyAmperesStatus = getRelayStatus(relayPinThirtyAmperes);
  
  String relayPinTenAmperesStatusText = "";
  String relayPinThirtyAmperesStatusText = "";
  if (relayPinTenAmperesStatus) {
      relayPinTenAmperesStatusText = "ON";
  } else {
      relayPinTenAmperesStatusText = "OFF";
  }
  
  if (relayPinThirtyAmperesStatus) {
      relayPinThirtyAmperesStatusText = "ON";
  } else {
      relayPinThirtyAmperesStatusText = "OFF";
  }

  Serial.println("GPIO7 Status: " + relayPinTenAmperesStatusText + " | GPIO6 Status: " + relayPinThirtyAmperesStatusText);
  server.send(200, "text/html", SendHTML(relayPinTenAmperesStatus,relayPinThirtyAmperesStatus)); 
  /*
  createHeaders();
  String out = "{";
   out += "\"message\":\"\",";
   out += "\"data\":[";
   out += "{\"name\": \"Relay 10A\", \"state\":\"" + relayPinTenAmperesStatusText + "\", \"activate\":\"" + ROUTE_RELAY_10A_ON + "\", \"deactivate\":\"" + ROUTE_RELAY_10A_OFF + "\"}";
   out += "{\"name\": \"Relay 30A\", \"state\":\"" + relayPinThirtyAmperesStatusText + "\", \"activate\":\"" + ROUTE_RELAY_30A_ON + "\", \"deactivate\":\"" + ROUTE_RELAY_30A_OFF + "\"}";
   out += "]";
   out += "}";
  server.send(200, "application/json", out); 
  */
}

void handle_relayPinTenAmperesOn() {
  relayPinTenAmperesStatus = true;
  digitalWrite(relayPinTenAmperes, RELAY_ON);
  
  Serial.println("GPIO7 Status: ON");
  server.send(200, "text/html", SendHTML(relayPinTenAmperesStatus, relayPinThirtyAmperesStatus)); 
  // server.send(200, "application/json", "{\"message\":\"Relay 10A was successfully activated!\", \"data\":{\"name\": \"Relay 10A\", \"state\": \"ON\"}}"); 
}

void handle_relayPinTenAmperesOff() {
  relayPinTenAmperesStatus = false;
  digitalWrite(relayPinTenAmperes, RELAY_OFF);
  
  Serial.println("GPIO7 Status: OFF");
  server.send(200, "text/html", SendHTML(relayPinTenAmperesStatus, relayPinThirtyAmperesStatus)); 
  // server.send(200, "application/json", "{\"message\":\"Relay 10A was successfully deactivated!\", \"data\":{\"name\": \"Relay 10A\", \"state\": \"OFF\"}}");   
}

void handle_relayPinThirtyAmperesOn() {
  relayPinThirtyAmperesStatus = true;
  digitalWrite(relayPinThirtyAmperes, RELAY_ON);
  
  Serial.println("GPIO6 Status: ON");
  server.send(200, "text/html", SendHTML(relayPinTenAmperesStatus, relayPinThirtyAmperesStatus)); 
  // server.send(200, "application/json", "{\"message\":\"Relay 30A was successfully activated!\", \"data\":{\"name\": \"Relay 30A\", \"state\": \"ON\"}}"); 
}

void handle_relayPinThirtyAmperesOff() {
  relayPinThirtyAmperesStatus = false;
  digitalWrite(relayPinThirtyAmperes, RELAY_OFF);
  
  Serial.println("GPIO6 Status: OFF");
  server.send(200, "text/html", SendHTML(relayPinTenAmperesStatus, relayPinThirtyAmperesStatus)); 
  // server.send(200, "application/json", "{\"message\":\"Relay 30A was successfully deactivated!\", \"data\":{\"name\": \"Relay 30A\", \"state\": \"OFF\"}}");   
}

void handle_NotFound(){
  server.send(404, "text/plain", "Not found");
}
void createHeaders() {
  server.sendHeader("Access-Control-Allow-Origin", ACCESS_CONTROL_ALLOW_ORIGIN);
  server.sendHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}


String SendHTML(uint8_t relayPinTenAmperesStatus,uint8_t relayPinThirtyAmperesStatus){
  String out = "<!DOCTYPE html> <html>\n";
  out +="<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n";
  out +="<title>LED Control</title>\n";
  out +="<link rel=\"stylesheet\" href=\"//www.w3schools.com/w3css/4/w3.css\">\n";
  out +="</head>\n";
  out +="<body>\n";
  out +=" <div class=\"w3-container w3-blue\">\n";
  out +="   <h1>Smart Home</h1>\n";
  out +=" </div>\n";

  out +=" <div class=\"w3-container\">\n";
  out +="   <p>\n";

  
  if(relayPinTenAmperesStatus) {
    out +="<p>Relay 10A Status: <span class=\"w3-badge w3-green\">ON</span></p><a class=\"w3-button w3-block w3-red\" href=\"/relay10a_off\">OFF</a>\n";
  } else
  {
    out +="<p>Relay 10A Status: <span class=\"w3-badge w3-red\">OFF</span></p><a class=\"w3-button w3-block w3-teal\" href=\"/relay10a_on\">ON</a>\n";
  }

  if(relayPinThirtyAmperesStatus) {
    out +="<p>Relay 30A Status: <span class=\"w3-badge w3-green\">ON</span></p><a class=\"w3-button w3-block w3-red\" href=\"/relay30a_off\">OFF</a>\n";
  } else {
    out +="<p>Relay 30A Status: <span class=\"w3-badge w3-red\">OFF</span></p><a class=\"w3-button w3-block w3-teal\" href=\"/relay30a_on\">ON</a>\n";
  }

  out +="   </p>\n";


  out +=" </div>\n";
  out +=" <footer class=\"w3-container w3-blue\">\n";
  out +="   <h5>AB-labs Ltd.</h5>\n";
  out +=" </footer>\n";
  out +="</body>\n";
  out +="</html>\n";

  return out;
}
