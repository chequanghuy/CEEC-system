#include <string.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <SocketIoClient.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <ArduinoJson.h>

const long utcOffsetInSeconds = 25200;
char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
int lastTime = 0;
volatile int controlValue = 0;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);
SocketIoClient webSocket;
SoftwareSerial stm2esp(4, 5);

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();


const char* getWeatherCondition(){
  // Initialise condition
  const char* condition;
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;  //Declare an object of class HTTPClient
    http.begin("http://api.openweathermap.org/data/2.5/weather?lat=10.8699184&lon=106.8016194&appid=824677c345dbef637f0be69c0555bc3a");
    int httpCode = http.GET();
  
    if (httpCode > 0) {
      // Get payload
      String payload = http.getString();
      // JSON buffer 
      const size_t bufferSize = JSON_ARRAY_SIZE(3) + 2*JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(2) + 3*JSON_OBJECT_SIZE(4) + JSON_OBJECT_SIZE(5) + JSON_OBJECT_SIZE(6) + JSON_OBJECT_SIZE(12) + 480;
      DynamicJsonBuffer jsonBuffer(bufferSize);
      // Parse JSON data
      const char* json = payload.c_str();
      JsonObject& root = jsonBuffer.parseObject(json);
      // Root object
      JsonArray& weather = root["weather"];
      JsonObject& weather0 = weather[0];
      // Get main report
      condition = weather0["main"];
    }
    http.end();   //Close connection
  }
  return condition;
}

void AddCard(const char* message, size_t length)
{
  controlValue = 1;
}

void CardError(const char* message, size_t length)
{
  stm2esp.print("{\"Type\": \"4\", \"Index\" : \"2\"}");
}

void OpenDoor(const char* message, size_t length)
{
  stm2esp.print("{\"Type\": \"4\", \"Index\" : \"1\"}");
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  stm2esp.begin(9600);
  WiFi.begin("UITCAR", "123456789");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(1000);
  }
  Serial.print("");
  Serial.println("WiFi connected");
  Serial.print("IP Address : ");
  Serial.println(WiFi.localIP());
  webSocket.begin("192.168.0.103", 8000);

  webSocket.on("allow-add-card", AddCard);
  webSocket.on("card-id-error", CardError);
  webSocket.on("open-door", OpenDoor);

  webSocket.emit("send-data", "\"hahaha\"");  
}

void loop() {
  // put your main code here, to run repeatedly:
  webSocket.loop();

  String storedData = "";
  String inChar;
 // if new data is coming from the HW Serial
  if (stm2esp.available() > 0)
  {
    while(stm2esp.available())          // reading data into char array
    {
      inChar = stm2esp.readString();
      storedData += inChar;
    }
    Serial.println(storedData);
    JsonObject& dataSTM = jsonBuffer.parseObject(storedData);
    jsonBuffer.clear();
    String cardID_STR = dataSTM["CardID"];
    cardID_STR = "\"" + cardID_STR + "\"";
    const char *cardID = cardID_STR.c_str();
    Serial.println(cardID);

    switch (controlValue)
    {
      case 1:
        webSocket.emit("new-card", cardID);
        controlValue = 0;
        break;
      default:
        webSocket.emit("swipe-card", cardID);
        controlValue = 0;
    }
  }

  // if (millis() - lastTime > 1000)
  // {
  //   timeClient.update();
  //   root["Type"] = "0";
  //   root["Hours"] = String(timeClient.getHours());
  //   root["Minutes"] = String(timeClient.getMinutes());
  //   root["Seconds"] = String(timeClient.getSeconds());
  //   root["Weather"] = getWeatherCondition();
  //   String output;
  //   root.printTo(output);
  //   stm2esp.print(output);
  //   lastTime = millis();
  // }
}